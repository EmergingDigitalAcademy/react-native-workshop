import React, { useState } from "react";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import SERVER_ADDRESS from "../../../constants/serverAddress";

import { View, Pressable, StyleSheet } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function PostComponent({ post, userObject }) {
  const postAuthor = post.userId;
  const myTheme = useTheme();
  const navigation = useNavigation();
  // grabbing strict window dimensions becuase elements were ignoring padding
  // using the regular '%' padding (padding: "20%")
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [amountOfLikes, setAmountOfLikes] = useState(post.userLikes.length);
  // check the post that we are rending to see if the current user already liked it
  const [didUserLike, setDidUserLike] = useState(
    post.userLikes.find((likedId) => likedId === Number(userObject.id))
      ? true
      : false
  );

  // Set didUserLike to the opposite of its current state to update the icon on the client
  // check if the user like is true or false and add or subtract a like depending on if the
  // post was already liked or not
  // send a request to the server to update the data

  const handleLikePost = async () => {
    setDidUserLike(!didUserLike);

    !didUserLike
      ? setAmountOfLikes(amountOfLikes + 1)
      : setAmountOfLikes(amountOfLikes - 1);

    try {
      const response = await axios.put(
        `${SERVER_ADDRESS}/post/like-post/${post.id}`,
        { userId: userObject.id }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    postWrapper: {
      borderBottomWidth: 0.25,
      borderBottomColor: myTheme.colors.disabled,
      paddingVertical: windowHeight * 0.01,
      paddingHorizontal: windowWidth * 0.05,
      flexDirection: "row",
    },
    avatarWrapper: {
      borderColor: "#121212",
      borderWidth: 7.5,
      borderRadius: 100,
      alignSelf: "flex-start",
    },
    postContentWrapper: {
      marginLeft: "2.5%",
      maxWidth: "80%",
    },
    postAuthorWrapper: {
      flexDirection: "row",
      overflow: "hidden",
      marginTop: "1%",
    },
    postAuthorText: {
      fontFamily: "Montserrat-Medium",
      marginBottom: "1%",
      fontSize: 17,
    },
    postAuthorUsername: {
      fontFamily: "Montserrat-Regular",
      marginLeft: "2.5%",
      color: myTheme.colors.disabled,
    },
    postText: {
      fontSize: 15,
      marginBottom: "2.5%",
    },
    likeButtonWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    amountOfLikesText: {
      marginLeft: "2.5%",
      fontSize: 12,
      color: didUserLike ? "red" : myTheme.colors.disabled,
      fontFamily: "Montserrat-Medium",
    },
  });

  return (
    <View style={styles.postWrapper}>
      <Pressable onPress={() => navigation.navigate("Account", postAuthor)}>
        <View style={styles.avatarWrapper}>
          {/* check if the post is a user created post or an already stored server post
      (users dont have profile images) and render an image avatar for predefined data 
      and a text avatar for the user */}
          {postAuthor.profileImage ? (
            <Avatar.Image source={{ uri: postAuthor.profileImage }} />
          ) : (
            <Avatar.Text
              style={{ backgroundColor: myTheme.colors.accent }}
              label={postAuthor.username[0]}
            />
          )}
        </View>
      </Pressable>
      <View style={styles.postContentWrapper}>
        <View style={styles.postAuthorWrapper}>
          <Text style={styles.postAuthorText}>{postAuthor.name}</Text>
          <Text style={[styles.postAuthorText, styles.postAuthorUsername]}>
            @{postAuthor.username}
          </Text>
        </View>
        <Text style={styles.postText}>{post.text}</Text>
        <Pressable onPress={handleLikePost}>
          <View style={styles.likeButtonWrapper}>
            {/* change the icon and the color depending on if the post was liked */}
            <MaterialCommunityIcons
              name={didUserLike ? "heart" : "heart-outline"}
              size={18}
              color={didUserLike ? "red" : myTheme.colors.disabled}
            />
            <Text style={styles.amountOfLikesText}>{amountOfLikes}</Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

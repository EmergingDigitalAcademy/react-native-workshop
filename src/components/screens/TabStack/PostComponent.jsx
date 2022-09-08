import React, { useState } from "react";
import { Dimensions } from "react-native";

import axios from "axios";
import SERVER_ADDRESS from "../../../constants/serverAddress";

import { View, Pressable } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

export default function PostComponent({ post, userObject }) {
  const postAuthor = post.userId;
  const myTheme = useTheme();
  // grabbing strict window dimensions becuase elements were ignoring padding
  // using the regular '%' padding (padding: "20%")
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;
  const [didUserLike, setDidUserLike] = useState(
    post.userLikes.find((likedId) => likedId === Number(userObject.id))
      ? true
      : false
  );

  const [amountOfLikes, setAmountOfLikes] = useState(post.userLikes.length);

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

  return (
    <View
      style={{
        borderBottomWidth: 0.25,
        borderBottomColor: myTheme.colors.disabled,
        paddingVertical: windowHeight * 0.015,
        paddingHorizontal: windowWidth * 0.05,
        flexDirection: "row",
      }}
    >
      {postAuthor.profileImage ? (
        <Avatar.Image source={{ uri: postAuthor.profileImage }} />
      ) : (
        <Avatar.Text
          style={{ backgroundColor: myTheme.colors.accent }}
          label={postAuthor.username[0]}
        />
      )}
      <View
        style={{
          marginLeft: "2.5%",
          maxWidth: "80%",
        }}
      >
        <Text
          style={{
            fontFamily: "Montserrat-Medium",
            marginBottom: "2.5%",
            fontSize: 18,
          }}
        >
          {postAuthor.username}
        </Text>
        <Text style={{ fontSize: 16, marginBottom: "2.5%" }}>{post.text}</Text>
        <Pressable onPress={handleLikePost}>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <MaterialCommunityIcons
              name={didUserLike ? "heart" : "heart-outline"}
              size={18}
              color={didUserLike ? "red" : myTheme.colors.disabled}
            />
            <Text
              style={{
                marginLeft: "2.5%",
                fontSize: 12,
                color: didUserLike ? "red" : myTheme.colors.disabled,
                fontFamily: "Montserrat-Medium",
              }}
            >
              {amountOfLikes}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}

import React, { useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";
import { Dimensions } from "react-native";
import { useNavigation } from "@react-navigation/native";

import axios from "axios";
import SERVER_ADDRESS from "../../../constants/serverAddress";

import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Text, Avatar, useTheme, Button } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";
import PostComponent from "./PostComponent";

export default function Account({ currentUserObject }) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const myTheme = useTheme();
  const navigation = useNavigation();
  const windowWidth = Dimensions.get("window").width;
  const [targetUserObject, setTargetUserObject] = useState({});
  const [posts, setPosts] = useState([]);
  const [isTargetUserCurrentUser, setIsTargetUserCurrentUser] = useState(null);
  const [amountOfFollowers, setAmmountOfFollowers] = useState(0);
  const [didCurrentUserFollowTargetUser, setDidCurrentUserFollowTargetUser] =
    useState(
      currentUserObject.following.find(
        (followingId) => followingId === Number(targetUserObject.id)
      )
        ? true
        : false
    );

  useEffect(() => {
    setTargetUserObject(route.params);
  }, [route.params]);

  useEffect(() => {
    targetUserObject.id !== undefined && retrieveTargetUserPosts();

    setIsTargetUserCurrentUser(
      currentUserObject.id === targetUserObject.id ? true : false
    );

    targetUserObject.followers !== undefined &&
      setAmmountOfFollowers(targetUserObject.followers.length);
  }, [targetUserObject, currentUserObject]);

  const retrieveTargetUserPosts = async () => {
    const response = await axios.get(
      `${SERVER_ADDRESS}/post/fetch/${targetUserObject.id}`
    );

    setPosts(response.data.reverse());
  };

  const handleFollowUser = async () => {
    setDidCurrentUserFollowTargetUser(!didCurrentUserFollowTargetUser);

    !didCurrentUserFollowTargetUser
      ? setAmmountOfFollowers(amountOfFollowers + 1)
      : setAmmountOfFollowers(amountOfFollowers - 1);

    try {
      const response = await axios.put(
        `${SERVER_ADDRESS}/user/follow-user/${targetUserObject.id}`,
        { userId: currentUserObject.id }
      );
    } catch (error) {
      console.log(error);
    }
  };

  const styles = StyleSheet.create({
    scrollViewContentContainer: {
      flex: 1,
    },
    profileSplash: {
      height: "17.5%",
      width: "100%",
    },
    avatarButtonWrapper: {
      flexDirection: "row",
      justifyContent: "space-between",
    },
    avatarWrapper: {
      borderColor: "#121212",
      borderWidth: 7.5,
      borderRadius: 100,
      top: "-10%",
      alignSelf: "flex-start",
      marginLeft: windowWidth * 0.05,
    },
    buttonWrapper: {
      marginTop: "2.5%",
      marginRight: windowWidth * 0.05,
    },
    buttonLabelStyle: {
      fontFamily:
        isTargetUserCurrentUser || didCurrentUserFollowTargetUser
          ? "Montserrat-Bold"
          : "Montserrat-Medium",
      fontSize: 12,
    },
    targetUserNameWrapper: {
      top: "-5%",
      marginLeft: windowWidth * 0.05,
    },
    targetUserName: {
      fontFamily: "Montserrat-Bold",
      fontSize: 26,
      marginBottom: "1%",
    },
    targetUserUsername: {
      fontFamily: "Montserrat-Medium",
      color: myTheme.colors.disabled,
      fontSize: 16,
    },
    targetUserBio: {
      fontFamily: "Montserrat-Medium",
      top: "-2.5%",
      fontSize: 16,
      textAlign: targetUserObject.bio ? "left" : "center",
      marginLeft: windowWidth * 0.05,
    },
    followersWrapper: {
      flexDirection: "row",
      marginLeft: windowWidth * 0.05,
    },
    followersFollowingText: {
      color: myTheme.colors.disabled,
    },
    followersFollowingNumber: {
      color: myTheme.colors.text,
      fontFamily: "Montserrat-Bold",
    },
  });

  // renders EmptyStateView if the screen is not in focuse to save resources
  // setTimeout to preserve the screen as navigation is happening so the data doesn't disappear

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContentContainer}>
      <Image
        source={{ uri: targetUserObject.profileSplash }}
        style={styles.profileSplash}
      />
      <View style={styles.avatarButtonWrapper}>
        <View style={styles.avatarWrapper}>
          {/* check if the post is a user created post or an already stored server post
            (users dont have profile images) and render an image avatar for predefined data 
            and a text avatar for the user 
          */}
          {targetUserObject.profileImage ? (
            <Avatar.Image source={{ uri: targetUserObject.profileImage }} />
          ) : (
            targetUserObject.username && (
              <Avatar.Text
                style={{ backgroundColor: myTheme.colors.accent }}
                label={targetUserObject.username[0]}
              />
            )
          )}
        </View>
        <View style={styles.buttonWrapper}>
          <Button
            onPress={() =>
              isTargetUserCurrentUser
                ? navigation.navigate("EditProfile")
                : handleFollowUser()
            }
            mode={
              isTargetUserCurrentUser || didCurrentUserFollowTargetUser
                ? "outlined"
                : "contained"
            }
            color={
              isTargetUserCurrentUser || didCurrentUserFollowTargetUser
                ? "#ffffff"
                : myTheme.colors.secondary
            }
            labelStyle={styles.buttonLabelStyle}
          >
            {isTargetUserCurrentUser
              ? "Edit Profile"
              : didCurrentUserFollowTargetUser
              ? "Following"
              : "Follow"}
          </Button>
        </View>
      </View>
      <View style={styles.targetUserNameWrapper}>
        <Text style={styles.targetUserName}>{targetUserObject.name}</Text>
        <Text style={styles.targetUserUsername}>
          @{targetUserObject.username}
        </Text>
      </View>
      <Text style={styles.targetUserBio}>
        {targetUserObject.bio
          ? targetUserObject.bio
          : "This user has no bio yet."}
      </Text>
      <View style={styles.followersWrapper}>
        {targetUserObject.following !== undefined && (
          <Text style={styles.followersFollowingText}>
            <Text style={styles.followersFollowingNumber}>
              {targetUserObject.following.length}
            </Text>{" "}
            Following
          </Text>
        )}
        {targetUserObject.followers !== undefined && (
          <Text
            style={{ marginLeft: "2.5%", ...styles.followersFollowingText }}
          >
            <Text style={styles.followersFollowingNumber}>
              {amountOfFollowers}
            </Text>{" "}
            Followers
          </Text>
        )}
      </View>
      <View
        style={{
          borderTopColor: myTheme.colors.disabled,
          borderTopWidth: 0.25,
          marginTop: "2.5%",
          flex: 1,
        }}
      >
        {posts.length !== 0 &&
          posts.map((post) => (
            <PostComponent
              key={post.id}
              post={post}
              userObject={currentUserObject}
            />
          ))}
      </View>
    </ScrollView>
  );
}

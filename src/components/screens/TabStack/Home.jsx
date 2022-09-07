import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { Dimensions } from "react-native";

import { ScrollView, View, Pressable } from "react-native";
import { Avatar, Text, useTheme } from "react-native-paper";
import { MaterialCommunityIcons } from "react-native-vector-icons";

import EmptyStateView from "../../../reused-components/EmptyStateView";

export default function Home({ posts }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const PostComponent = ({ post }) => {
    const userObject = post.userId;
    const [didUserLike, setDidUserLike] = useState(false);

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
        {userObject.profileImage ? (
          <Avatar.Image source={{ uri: userObject.profileImage }} />
        ) : (
          <Avatar.Text
            style={{ backgroundColor: myTheme.colors.accent }}
            label={userObject.username[0]}
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
            {userObject.username}
          </Text>
          <Text style={{ fontSize: 16, marginBottom: "2.5%" }}>
            {post.text}
          </Text>
          <Pressable
            onPress={() => {
              setDidUserLike(!didUserLike);
            }}
          >
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
                123
              </Text>
            </View>
          </Pressable>
        </View>
      </View>
    );
  };

  // renders EmptyStateView if the screen is not in focuse to save resources
  // setTimeout to preserve the screen as navigation is happening so the data doesn't disappear

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  return (
    <ScrollView>
      {posts.length !== 0 &&
        posts.map((post) => <PostComponent key={post.id} post={post} />)}
    </ScrollView>
  );
}

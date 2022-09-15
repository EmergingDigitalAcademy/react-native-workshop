import React, { useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";

import { ScrollView, Image, StyleSheet, View } from "react-native";
import { Text, Avatar, useTheme, Button } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";

export default function Account({ currentUserObject }) {
  const isFocused = useIsFocused();
  const route = useRoute();
  const myTheme = useTheme();
  const [targetUserObject, setTargetUserObject] = useState({});
  const [isTargetUserCurrentUser, setIsTargetUserCurrentUser] = useState(null);

  useEffect(() => {
    setTargetUserObject(route.params);
  }, [route.params]);

  useEffect(() => {
    setIsTargetUserCurrentUser(
      currentUserObject.id === targetUserObject.id ? true : false
    );
  }, [targetUserObject]);

  const styles = StyleSheet.create({
    avatarWrapper: {
      borderColor: "#121212",
      borderWidth: 7.5,
      borderRadius: 100,
      top: "-10%",
      alignSelf: "flex-start",
    },

    buttonLabelStyle: {
      fontFamily: isTargetUserCurrentUser
        ? "Montserrat-Bold"
        : "Montserrat-Medium",
      fontSize: 12,
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
    <ScrollView contentContainerStyle={{ flex: 1 }}>
      <Image
        source={{ uri: targetUserObject.profileSplash }}
        style={{ height: "25%", width: "100%" }}
      />
      {/* check if the post is a user created post or an already stored server post
      (users dont have profile images) and render an image avatar for predefined data 
      and a text avatar for the user */}
      <View style={{ flex: 1, paddingHorizontal: "5%" }}>
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <View style={styles.avatarWrapper}>
            {targetUserObject.profileImage ? (
              <Avatar.Image
                size={80}
                source={{ uri: targetUserObject.profileImage }}
              />
            ) : (
              Object.keys(targetUserObject).length !== 0 && (
                <Avatar.Text
                  size={80}
                  style={{ backgroundColor: myTheme.colors.accent }}
                  label={targetUserObject.username[0]}
                />
              )
            )}
          </View>
          <View style={{ marginTop: "2.5%" }}>
            <Button
              mode={isTargetUserCurrentUser ? "outlined" : "contained"}
              color={
                isTargetUserCurrentUser ? "#ffffff" : myTheme.colors.secondary
              }
              labelStyle={styles.buttonLabelStyle}
            >
              {isTargetUserCurrentUser ? "Edit Profile" : "Follow"}
            </Button>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

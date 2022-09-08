import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, TextInput, useTheme, Avatar } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";
import LoadingModal from "../../../reused-components/LoadingModal";

export default function NewPost({ newPostText, setNewPostText, visible, userObject }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      marginHorizontal: "5%",
    },
  });

  // Shared theming for text inputs, changing the roundness so inputs appear as a rectangle

  const textInputTheme = {
    ...myTheme,
    roundness: 4,
  };

  // renders EmptyStateView if the screen is not in focuse to save resources
  // setTimeout to preserve the screen as navigation is happening so the data doesn't disappear

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      edges={["bottom", "left", "right"]}
    >
      {visible && <LoadingModal visible={visible} />}
      
      <View style={{ flexDirection: "row", alignItems: "center", marginVertical: "2.5%" }}>
      <Avatar.Text
            style={{ backgroundColor: myTheme.colors.accent }}
            label={userObject.username[0]}
            size={32}
          />
      <Text style={{ marginLeft: "2%", fontFamily: "Montserrat-Medium", fontSize: 16 }}>{userObject.username}</Text>
      </View>
      <TextInput
        multiline
        autoFocus
        scrollEnabled={false}
        style={{  marginLeft: "10%", minHeight: "25%"}}
        theme={textInputTheme}
        value={newPostText}
        onChangeText={(text) => setNewPostText(text)}
      />
    </SafeAreaView>
  );
}

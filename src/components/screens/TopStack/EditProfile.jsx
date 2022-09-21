import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { Text, TextInput, useTheme } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";
import LoadingModal from "../../../reused-components/LoadingModal";

export default function EditProfile({ visible, editedUser, setEditedUser }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      marginHorizontal: "10%",
    },
    text: {
      fontFamily: "Montserrat-Bold",
      fontSize: 28,
      marginVertical: "5%",
    },
    textInput: {
      backgroundColor: "transparent",
      marginTop: "5%",
    },
    textInputMultiLine: {
      backgroundColor: "transparent",
      marginTop: "5%",
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

      {/* keyboard aware scroll view is a special component that automatically
        scrolls your screen if your keyboard is covering the inputs */}
      <KeyboardAwareScrollView style={{ flex: 1 }}>
        <Text style={styles.text}>Edit your account</Text>
        <TextInput
          label="Email"
          autoCapitalize="words"
          value={editedUser.name}
          theme={textInputTheme}
          style={styles.textInput}
          onChangeText={(text) => setEditedUser({ ...editedUser, name: text })}
        />
        <TextInput
          label="Username"
          autoCapitalize="none"
          value={editedUser.username}
          theme={textInputTheme}
          style={styles.textInput}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, username: text })
          }
        />
        <TextInput
          label="Profile Image Link"
          autoCapitalize="none"
          value={editedUser.profileImage}
          theme={textInputTheme}
          style={styles.textInput}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, profileImage: text })
          }
        />
        <TextInput
          label="Profile Splash Link"
          autoCapitalize="none"
          value={editedUser.profileSplash}
          theme={textInputTheme}
          style={styles.textInput}
          onChangeText={(text) =>
            setEditedUser({ ...editedUser, profileSplash: text })
          }
        />
        <TextInput
          label="Bio"
          multiline
          scrollEnabled={false}
          style={styles.textInputMultiLine}
          theme={textInputTheme}
          value={editedUser.bio}
          textAlignVertical="bottom"
          onChangeText={(text) => setEditedUser({ ...editedUser, bio: text })}
        />
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

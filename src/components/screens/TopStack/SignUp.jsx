import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";

export default function SignUp() {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
  });

  const submit = () => {}

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
    buttonLabelStyle: {
      fontFamily: "Montserrat-Bold",
      fontSize: 16,
      marginVertical: "5%",
    },
  });

  // Shared theming for text inputs, changing the roundness so inputs appear as a rectangle

  const textInputTheme = {
    ...myTheme,
    roundness: 4,
  };

  // renders EmptyStateView if the screen is not in focuse to save resources

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={styles.safeAreaView}
    >
      <KeyboardAwareScrollView>
        <View>
          <Text style={styles.text}>Create your account</Text>
          <TextInput
            label="Name"
            value={newUser.username}
            theme={textInputTheme}
            style={styles.textInput}
            onChangeText={(text) => setNewUser({ ...newUser, username: text })}
            on
          />
          <TextInput
            label="Email"
            autoCapitalize="none"
            value={newUser.email}
            theme={textInputTheme}
            style={styles.textInput}
            onChangeText={(text) => setNewUser({ ...newUser, email: text })}
          />
        </View>
        <View
          style={{
            borderTopColor: myTheme.colors.disabled,
            borderTopWidth: 1,
            margin: "10%",
          }}
        />
        <Button
          color="white"
          mode="contained"
          labelStyle={styles.buttonLabelStyle}
          onPress={() => {}}
        >
          Submit
        </Button>
      </KeyboardAwareScrollView>
    </SafeAreaView>
  );
}

import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { useDispatch } from "react-redux";
import * as SecureStore from "expo-secure-store";

import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, View } from "react-native";
import { Text, TextInput, useTheme, Button } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";
import LoadingModal from "../../../reused-components/LoadingModal";

import axios from "axios";
import SERVER_ADDRESS from "../../../constants/serverAddress";

export default function SignUp({ navigation }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const dispatch = useDispatch();
  const [visible, setVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
  });

  const submit = async () => {
    try {
      setVisible(true);

      const response = await axios.post(
        `${SERVER_ADDRESS}/user/add-user`,
        newUser
      );

      dispatch({ type: "SET_USER_DETAILS", payload: response.data });

      await SecureStore.setItemAsync("username", newUser.username);
      await SecureStore.setItemAsync("email", newUser.email);

      setNewUser({
        username: "",
        email: "",
      });

      // modal won't unmount if the response happens too fast
      setTimeout(() => {
        setVisible(false);

        navigation.navigate("Tabs");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

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
  // setTimeout to preserve the screen as navigation is happening so the data doesn't disappear

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  return (
    <>
      {visible && <LoadingModal visible={visible} />}

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
              onChangeText={(text) =>
                setNewUser({ ...newUser, username: text })
              }
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
              borderTopWidth: 0.25,
              margin: "10%",
            }}
          />
          <Button
            color="white"
            mode="contained"
            labelStyle={styles.buttonLabelStyle}
            onPress={submit}
          >
            Submit
          </Button>
        </KeyboardAwareScrollView>
      </SafeAreaView>
    </>
  );
}

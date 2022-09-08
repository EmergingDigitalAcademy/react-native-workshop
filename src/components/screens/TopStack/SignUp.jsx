import React, { useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

import { SafeAreaView } from "react-native-safe-area-context";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { StyleSheet, View, ActivityIndicator } from "react-native";
import {
  Text,
  TextInput,
  useTheme,
  Button,
  Modal,
  Portal,
} from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";

import axios from "axios";
import SERVER_ADDRESS from "../../../constants/serverAddress";

export default function SignUp({ navigation, getSecureStoreDetails }) {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const [visible, setVisible] = useState(false);
  const [newUser, setNewUser] = useState({
    username: "",
    email: "",
  });

  const LoadingModal = () => {
    const containerStyle = {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    };

    return (
      <Portal>
        <Modal
          visible={visible}
          onDismiss={() => {}}
          contentContainerStyle={containerStyle}
        >
          <ActivityIndicator />
        </Modal>
      </Portal>
    );
  };

  const submit = async () => {
    try {
      setVisible(true);

      const response = await axios.post(
        `${SERVER_ADDRESS}/user/add-user`,
        newUser
      );

      await SecureStore.setItemAsync("username", newUser.username);
      await SecureStore.setItemAsync("email", newUser.email);

      getSecureStoreDetails();

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

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <>
      {visible && <LoadingModal />}

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
              borderTopWidth: 1,
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

import React from "react";
import { useIsFocused, useNavigation } from "@react-navigation/native";

import { Pressable, ScrollView } from "react-native";
import { Text, useTheme } from "react-native-paper";

import * as SecureStore from "expo-secure-store";

import EmptyStateView from "../../../reused-components/EmptyStateView";

export default function Settings() {
  const isFocused = useIsFocused();
  const myTheme = useTheme();
  const navigation = useNavigation();

  const handleLogout = () => {
    navigation.reset({ index: 0, routes: [{ name: "Landing" }] });
    // SecureStore.deleteItemAsync("email");
    // commented out for development
    // If the above line was not commented, upon app reload, you would have to log in again
  };

  // renders EmptyStateView if the screen is not in focuse to save resources
  // setTimeout to preserve the screen as navigation is happening so the data doesn't disappear

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <Pressable
        style={{
          paddingHorizontal: "10%",
          paddingVertical: "5%",
          borderBottomWidth: 0.25,
          borderBottomColor: myTheme.colors.disabled,
        }}
        onPress={handleLogout}
      >
        <Text style={{ fontFamily: "Montserrat-Medium", fontSize: 18 }}>
          Logout
        </Text>
      </Pressable>
    </ScrollView>
  );
}

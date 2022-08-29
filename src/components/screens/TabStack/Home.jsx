import React, { useEffect } from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";

import axios from "axios";
import SERVER_ADDRESS from "../../../constants/serverAddress";

export default function Home() {
  const isFocused = useIsFocused();

  const retrievePosts = async () => {
    const response = await axios.get(`${SERVER_ADDRESS}/post/fetch`)

    console.log(response.data)
  }

  useEffect(() => {
    retrievePosts();
  }, [])

  // renders EmptyStateView if the screen is not in focuse to save resources

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

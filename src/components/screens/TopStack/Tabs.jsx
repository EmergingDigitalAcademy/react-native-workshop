import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { Text } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";

export default function Tabs() {
  const isFocused = useIsFocused();

  // renders EmptyStateView if the screen is not in focuse to save resources
  // setTimeout is so the screen moving away doesnt disappear right away

  if (!isFocused) {
    setTimeout(() => {
      return <EmptyStateView />;
    }, 100);
  }

  return (
    <SafeAreaView edges={["bottom", "left", "right"]}>
      <Text>Home Screen</Text>
    </SafeAreaView>
  );
}

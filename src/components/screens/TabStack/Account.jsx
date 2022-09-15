import React, { useState, useEffect } from "react";
import { useIsFocused, useRoute } from "@react-navigation/native";

import { ScrollView, Image } from "react-native";
import { Text } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";

export default function Account() {
  const isFocused = useIsFocused();
  const route = useRoute();
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    setUserObject(route.params);
  }, [route.params]);

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
        source={{ uri: userObject.profileSplash }}
        style={{ height: "25%", width: "100%" }}
      />
      <Text>{userObject.email}</Text>
    </ScrollView>
  );
}

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Image } from "react-native";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

import SignUp from "../screens/TopStack/SignUp";

export default function TopStack() {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      screenOptions={{
        headerTitle: () => (
          <Image
          resizeMode="cover"
            source={edaLogoPurple}
            style={{
              height: 40,
              width: 40,
              overflow: "visible",
            }}
          />
        ),
      }}
    >
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  );
}

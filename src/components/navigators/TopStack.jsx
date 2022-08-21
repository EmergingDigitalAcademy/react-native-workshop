import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import SignUp from "../screens/TopStack/SignUp";

export default function TopStack () {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Sign Up" component={SignUp} />
    </Stack.Navigator>
  )
} 
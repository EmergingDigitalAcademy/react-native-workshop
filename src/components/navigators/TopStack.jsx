import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Image } from "react-native";
import { Button } from "react-native-paper";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

import Landing from "../screens/TopStack/Landing";
import SignUp from "../screens/TopStack/SignUp";
import Tabs from "../screens/TopStack/Tabs";

export default function TopStack() {
  const Stack = createNativeStackNavigator();

  const renderSwitch = () => {
    setTimeout(() => {
      if (storedUsername && storedEmail) {
        return <Stack.Screen name="Tabs" component={Tabs} />;
      } else {
        return <Stack.Screen name="Landing" component={Landing} />;
      }
    }, 1000);
  };

  return (
    <Stack.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: ({ ...props }) =>
          props.canGoBack && (
            <Button onPress={() => navigation.goBack()}>Cancel</Button>
          ),
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
      })}
    >
      {/*
        if both of the values are present and not null, navigate to tabs, instead
        navigate to landing (set timeout to prevent "flash" of information, landing will
        still show, giving time for data to update )
      */}
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="Tabs" component={Tabs} />
      <Stack.Screen name="SignUp" component={SignUp} />
    </Stack.Navigator>
  );
}

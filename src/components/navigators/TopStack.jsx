import React, { useEffect } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { Image } from "react-native";
import { Button } from "react-native-paper";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

import Landing from "../screens/TopStack/Landing";
import SignUp from "../screens/TopStack/SignUp";
import TabStack from "./TabStack";

export default function TopStack({ userObject, storedEmail, storedUsername }) {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();

  // check if the user object is empty, if it isn't then dispatch
  // the user object to redux

  Object.keys(userObject).length !== 0 &&
    dispatch({ type: "SET_USER_DETAILS", payload: userObject });
  //

  // if either the stored username or email are null (no stored data)
  // send the user to the Landing screen, else send them to the app

  const routeSwitch = () => {
    if (storedUsername === null || storedEmail === null) {
      return "Landing";
    } else {
      return "Tabs";
    }
  };

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
      initialRouteName={routeSwitch()}
      screenOptions={({ navigation, route }) => ({
        headerLeft: ({ ...props }) =>
          props.canGoBack &&
          route.name !== "Tabs" && (
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
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Tabs" component={TabStack} />
    </Stack.Navigator>
  );
}

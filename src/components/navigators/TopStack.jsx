import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { Image } from "react-native";
import { Button } from "react-native-paper";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

import Landing from "../screens/TopStack/Landing";
import SignUp from "../screens/TopStack/SignUp";
import Tabs from "../screens/TopStack/Tabs";

export default function TopStack({
  userObject,
  storedEmail,
  storedUsername,
  getSecureStoreDetails,
}) {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const navigation = useNavigation();

  // check if the user object is empty, if it isn't then dispatch
  // the user object to redux

  Object.keys(userObject).length !== 0 &&
    dispatch({ type: "SET_USER_DETAILS", payload: userObject });
  //

  // if either the stored username or email are null (no stored data)
  // send the user to the Landing screen, else send them to the app

  const routeSwitch = () => {
    if (
      storedUsername === null ||
      storedEmail === null ||
      Object.keys(userObject).length === 0
    ) {
      return "Landing";
    } else {
      return "Tabs";
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={routeSwitch()}
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
      <Stack.Screen name="Landing" component={Landing} />
      <Stack.Screen name="SignUp">
        {() => (
          <SignUp
            getSecureStoreDetails={getSecureStoreDetails}
            navigation={navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Tabs" component={Tabs} />
    </Stack.Navigator>
  );
}

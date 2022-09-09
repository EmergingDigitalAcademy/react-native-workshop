import React from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

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
  const Stack = createNativeStackNavigator(); // Initialize react navigation top tavigator
  const navigation = useNavigation(); // initialize the useNavigation hook to navigate between screens

  // if either the stored username or email are null (no stored data)
  // send the user to the Landing screen, else send them to the app

  const routeSwitch = () => {
    if (storedUsername === null || storedEmail === null) {
      return "Landing";
    } else {
      return "Tabs";
    }
  };

  return (
    <Stack.Navigator
      initialRouteName={routeSwitch()} // screen to show when navigator loads
      // screen options are options that affect every screen within the navigator
      screenOptions={({ navigation }) => ({
        // headerLeft defines an element to display in the left side of the header
        // props.canGoBack determines if you're allowed to navigate backwards
        headerLeft: ({ ...props }) =>
          props.canGoBack && (
            <Button onPress={() => navigation.goBack()}>Cancel</Button>
          ),
          // headerTitle is being set tot he EDA logo
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
      {/* initialize a screen within our navigator, it has the route name of Landing
      and is using the Landing component */}
      <Stack.Screen name="Landing" component={Landing} />
      {/* Same thing is happening in signup as it is in Landing, except rather than
      defining a component to call like in Landing, I am manually calling my component as 
      a child of <Stack.Screen> component so I can pass props down */}
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

import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { FAB, useTheme } from "react-native-paper";

import Home from "../screens/TabStack/Home";
import Account from "../screens/TabStack/Account";
import Settings from "../screens/TabStack/Settings";

export default function TabStack({ posts, userObject }) {
  const Stack = createBottomTabNavigator();
  const myTheme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false, // hide the header from the tab navigator as we have the header from the topstack still showing
          tabBarShowLabel: false, // hide the label on tab bar so we just see icons
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            // defining the icon for the screen in tabBarIcon
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-variant"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {() => <Home posts={posts} userObject={userObject} />}
        </Stack.Screen>
        <Stack.Screen
          name="Account"
          component={Account}
          listeners={({ navigation }) => ({
            tabPress: (e) => {
              // Prevent default action (always override initial params with passed in params)
              e.preventDefault();
              
              // When tabIcon is pressed, I want the userObject to always be sent to Account
              // as a param
              navigation.navigate('Account', userObject);
            },
          })}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            )
          }}
        />
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="cog" color={color} size={size} />
            ),
          }}
        />
      </Stack.Navigator>

      {/* Loading Floating Action Button in the navigator (outside of the navigator component)
        so it loads on every screen in the tab stack*/}

      <FAB
        icon="plus"
        style={{
          backgroundColor: myTheme.colors.secondary,
          position: "absolute",
          right: "5%",
          bottom: "12%",
        }}
        onPress={() => navigation.navigate("NewPost")}
      />
    </>
  );
}

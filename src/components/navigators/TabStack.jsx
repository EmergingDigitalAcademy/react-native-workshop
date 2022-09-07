import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "react-native-vector-icons";
import { FAB, useTheme } from "react-native-paper";

import Home from "../screens/TabStack/Home";
import Account from "../screens/TabStack/Account";
import Settings from "../screens/TabStack/Settings";

export default function TabStack({ posts }) {
  const Stack = createBottomTabNavigator();
  const myTheme = useTheme();
  const navigation = useNavigation();

  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
          tabBarShowLabel: false,
        }}
      >
        <Stack.Screen
          name="Home"
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="home-variant"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {() => <Home posts={posts} />}
        </Stack.Screen>
        <Stack.Screen
          name="Account"
          component={Account}
          options={{
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="account"
                color={color}
                size={size}
              />
            ),
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

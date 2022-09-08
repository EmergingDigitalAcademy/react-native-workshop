import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import axios from "axios";
import SERVER_ADDRESS from "../../constants/serverAddress";

import { Image } from "react-native";
import { Button, useTheme } from "react-native-paper";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

import Landing from "../screens/TopStack/Landing";
import SignUp from "../screens/TopStack/SignUp";
import TabStack from "./TabStack";
import NewPost from "../screens/TopStack/NewPost";

export default function TopStack({
  userObject,
  storedEmail,
  storedUsername,
  getSecureStoreDetails,
}) {
  const Stack = createNativeStackNavigator();
  const myTheme = useTheme();
  const navigation = useNavigation();
  const [newPostText, setNewPostText] = useState("");
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  // Sends a call to the API to fetch all posts and sets the posts state
  // to the returned data, but in reverse order so most recent shows first

  const retrievePosts = async () => {
    const response = await axios.get(`${SERVER_ADDRESS}/post/fetch`);

    setPosts(response.data.reverse());
  };

  // on page load, if the user object is not empty, retrieve all posts

  useEffect(() => {
    Object.keys(userObject).length !== 0 && retrievePosts();
  }, [userObject]);

  // set the loading modal visibility to true and make an api call to add a post
  // reset post text input and call the api to retrieve posts again.
  // After 1 second, unmount the modal and navigate back to tabs,

  const handlePostSubmit = async () => {
    try {
      setVisible(true);

      const response = await axios.post(`${SERVER_ADDRESS}/post/add-post`, {
        userId: userObject.id,
        text: newPostText,
      });

      setNewPostText("");

      retrievePosts();

      // modal won't unmount if the response happens too fast
      setTimeout(() => {
        setVisible(false);

        navigation.navigate("Tabs");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  // if either the stored username or email (data from the device) are null (no stored data),
  // or if the userObject returned from the server is empty (no stored data on the server
  // associated to the stored credentials) send the user to the Landing screen
  // else send them to the app

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
      // screen options are options that affect every screen
      // setting the left side of our header to show a cancel button
      // if the screen is one that can navigate backwards
      // set the title of the header to the EDA logo
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
      <Stack.Screen name="Landing" component={Landing} />
      {/* Declare a screen and call the component, need to do it this way
      vs using the component attribute because I need to pass props down to
      signup screen (and any other screen that follow this format) */}
      <Stack.Screen name="SignUp">
        {() => (
          <SignUp
            getSecureStoreDetails={getSecureStoreDetails}
            navigation={navigation}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="Tabs">
        {() => <TabStack posts={posts} userObject={userObject} />}
      </Stack.Screen>
      <Stack.Screen
        name="NewPost"
        // options only for this screen, show no eda symbol in title
        // and add a button to submit post in header
        options={{
          headerTitle: () => <></>,
          headerRight: () => (
            <Button
              mode="contained"
              color={myTheme.colors.secondary}
              labelStyle={{
                fontSize: 16,
                marginVertical: "10%",
              }}
              onPress={handlePostSubmit}
              disabled={newPostText ? false : true}
            >
              Post
            </Button>
          ),
        }}
      >
        {() => (
          <NewPost
            newPostText={newPostText}
            setNewPostText={setNewPostText}
            visible={visible}
            userObject={userObject}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useDispatch } from "react-redux";

import { Image } from "react-native";
import { Button, useTheme } from "react-native-paper";

import axios from "axios";
import SERVER_ADDRESS from "../../constants/serverAddress";

import edaLogoPurple from "../../../assets/eda-icon-purple.png";

import Landing from "../screens/TopStack/Landing";
import SignUp from "../screens/TopStack/SignUp";
import TabStack from "./TabStack";
import NewPost from "../screens/TopStack/NewPost";

export default function TopStack({ userObject, storedEmail, storedUsername }) {
  const Stack = createNativeStackNavigator();
  const dispatch = useDispatch();
  const myTheme = useTheme();
  const navigation = useNavigation();
  const [newPostText, setNewPostText] = useState("");
  const [visible, setVisible] = useState(false);
  const [posts, setPosts] = useState([]);

  // check if the user object is empty, if it isn't then dispatch
  // the user object to redux

  Object.keys(userObject).length !== 0 &&
    dispatch({ type: "SET_USER_DETAILS", payload: userObject });
  //

  const retrievePosts = async () => {
    const response = await axios.get(`${SERVER_ADDRESS}/post/fetch`);

    setPosts(response.data.reverse());
  };

  useEffect(() => {
    retrievePosts();
  }, []);

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
      <Stack.Screen name="SignUp" component={SignUp} />
      <Stack.Screen name="Tabs">
        {() => <TabStack posts={posts} />}
      </Stack.Screen>
      <Stack.Screen
        name="NewPost"
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
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

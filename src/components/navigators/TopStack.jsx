import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import axios from "axios";
import SERVER_ADDRESS from "../../constants/serverAddress";

import { Button, useTheme } from "react-native-paper";

import EdaLogoHeader from "./EdaLogoHeader";

import Landing from "../screens/TopStack/Landing";
import SignUp from "../screens/TopStack/SignUp";
import TabStack from "./TabStack";
import NewPost from "../screens/TopStack/NewPost";
import EditProfile from "../screens/TopStack/EditProfile";

export default function TopStack({
  userObject,
  setUserObject,
  storedEmail,
  getSecureStoreDetails,
}) {
  const Stack = createNativeStackNavigator(); // Initialize react navigation top tavigator
  const navigation = useNavigation(); // initialize the useNavigation hook to navigate between screens
  const myTheme = useTheme();
  const [newPostText, setNewPostText] = useState("");
  const [postModalVisible, setPostModalVisible] = useState(false);
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [posts, setPosts] = useState([]);
  const [editedUser, setEditedUser] = useState({
    name: userObject.name,
    username: userObject.username,
    profileImage: userObject.profileImage,
    profileSplash: userObject.profileSplash,
    bio: userObject.bio,
  });

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

  // if the stored email is null (no stored data)
  // send the user to the Landing screen, else send them to the app

  const routeSwitch = () => {
    if (storedEmail === null || Object.keys(userObject).length === 0) {
      return "Landing";
    } else {
      return "Tabs";
    }
  };

  // set the loading modal visibility to true and make an api call to add a post
  // reset post text input and call the api to retrieve posts again.
  // After 1 second, unmount the modal and navigate back to tabs,

  const handlePostSubmit = async () => {
    try {
      setPostModalVisible(true);

      const response = await axios.post(`${SERVER_ADDRESS}/post/add-post`, {
        userId: userObject.id,
        text: newPostText,
      });

      setNewPostText("");

      retrievePosts();

      // modal won't unmount if the response happens too fast
      setTimeout(() => {
        setPostModalVisible(false);

        navigation.navigate("Tabs");
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditSubmit = async () => {
    try {
      setEditModalVisible(true);

      const response = await axios.put(
        `${SERVER_ADDRESS}/user/update-user/${userObject.id}`,
        editedUser
      );

      setUserObject(response.data);

      retrievePosts();

      // modal won't unmount if the response happens too fast
      setTimeout(() => {
        setEditModalVisible(false);

        navigation.navigate("Tabs", {
          screen: "Account",
          params: response.data,
        });
      }, 1000);
    } catch (error) {
      console.log(error);
    }
  };

  const HeaderContinueButton = ({ route }) => (
    <Button
      mode="contained"
      color={myTheme.colors.secondary}
      onPress={
        (route.name === "NewPost" && handlePostSubmit) ||
        (route.name === "EditProfile" && handleEditSubmit)
      }
    >
      {(route.name === "NewPost" && "Post") ||
        (route.name === "EditProfile" && "Confirm")}
    </Button>
  );

  console.log(userObject);

  return (
    <Stack.Navigator
      initialRouteName={routeSwitch()} // screen to show when navigator loads
      // screen options are options that affect every screen within the navigator
      // importing the navigation and route objects to navigate and check route
      // config for our button
      screenOptions={({ navigation, route }) => ({
        // headerLeft defines an element to display in the left side of the header
        // props.canGoBack determines if you're allowed to navigate backwards
        headerLeft: ({ ...props }) =>
          props.canGoBack &&
          route.name !== "Tabs" && (
            <Button onPress={() => navigation.goBack()}>Cancel</Button>
          ),
        // headerTitle is checking if the current route is NewPost or Edit Profile and
        // will render a fragment, or will render the eda header logo if on any other screen
        headerTitle: () =>
          route.name === "NewPost" || route.name === "EditProfile" ? (
            <></>
          ) : (
            <EdaLogoHeader />
          ),
        headerRight: () =>
          route.name === "NewPost" || route.name === "EditProfile" ? (
            <HeaderContinueButton route={route} />
          ) : (
            <></>
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
      <Stack.Screen name="Tabs" options={{ headerShown: false }}>
        {() => <TabStack posts={posts} userObject={userObject} />}
      </Stack.Screen>
      <Stack.Screen name="NewPost">
        {() => (
          <NewPost
            newPostText={newPostText}
            setNewPostText={setNewPostText}
            visible={postModalVisible}
            userObject={userObject}
          />
        )}
      </Stack.Screen>
      <Stack.Screen name="EditProfile">
        {() => (
          <EditProfile
            visible={editModalVisible}
            userObject={userObject}
            editedUser={editedUser}
            setEditedUser={setEditedUser}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}

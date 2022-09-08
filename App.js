import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider } from "react-native-paper";
import * as Font from "expo-font";
import * as SecureStore from "expo-secure-store";

import axios from "axios";
import SERVER_ADDRESS from "./src/constants/serverAddress";

import { ImageBackground, View } from "react-native";
import SplashImage from "./assets/app-splash.png";

import TopStack from "./src/components/navigators/TopStack";

// myFonts is loading collected font .ttf files from assets folder

import myFonts from "./src/constants/myFonts";

// myTheme is the shared themimg used throughout the application

import myTheme from "./src/constants/myTheme";

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [credentialsLoaded, setCredentialsLoaded] = useState(false);
  const [storedUsername, setStoredUsername] = useState(null);
  const [storedEmail, setStoredEmail] = useState(null);
  const [userObject, setUserObject] = useState({});

  useEffect(() => {
    getSecureStoreDetails();
    loadFonstAsync();
  }, []);

  // config to enable fonts within the application

  const loadFonstAsync = async () => {
    await Font.loadAsync(myFonts);
    setFontsLoaded(true);
  };

  // Grab the stored user credentials from the device securely stored data
  // set the set stored username and email state to the response of the async functions
  // if all credentials come back (user has been created or has logged in)
  // grab the user data from the server and store user object in redux
  // (set timeout to prevent "flash" of information, I want to give data time to update

  const getSecureStoreDetails = async () => {
    try {
      // SecureStore.deleteItemAsync("username")
      // SecureStore.deleteItemAsync("email")

      const usernameResponse = await SecureStore.getItemAsync("username");
      const emailResponse = await SecureStore.getItemAsync("email");

      setStoredUsername(usernameResponse);
      setStoredEmail(emailResponse);

      if (
        usernameResponse &&
        typeof usernameResponse !== "object" &&
        emailResponse &&
        typeof emailResponse !== "object"
      ) {
        const userResponse = await axios.get(
          `${SERVER_ADDRESS}/user/fetch/${emailResponse}`
        );

        setUserObject(userResponse.data);
      }
    } catch (error) {
      console.log(error);
    }

    setTimeout(() => {
      setCredentialsLoaded(true);
    }, 1000);
  };

  // Enables react-native-screens for better rendering optimization

  enableScreens();

  // if either fonts or credentials are not done loading, render the splash screen

  if (!fontsLoaded || !credentialsLoaded) {
    return (
      <View style={{ flex: 1 }}>
        <ImageBackground
          style={{ width: "100%", height: "100%" }}
          resizeMode="contain"
          source={SplashImage}
        />
      </View>
    );
  } else {
    return (
      <NavigationContainer theme={myTheme}>
        <SafeAreaProvider>
          <PaperProvider theme={myTheme}>
            <StatusBar style="light" animated={true} />
            <TopStack
              userObject={userObject}
              storedEmail={storedEmail}
              storedUsername={storedUsername}
              getSecureStoreDetails={getSecureStoreDetails}
            />
          </PaperProvider>
        </SafeAreaProvider>
      </NavigationContainer>
    );
  }
}

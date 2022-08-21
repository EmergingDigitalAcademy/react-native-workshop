import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import { NavigationContainer } from "@react-navigation/native";
import { Provider as PaperProvider, Text } from "react-native-paper";
import * as Font from "expo-font";

import { ImageBackground, View, StyleSheet, Image } from "react-native";
import SplashImage from "./assets/app-splash.png";

import EdaLogo from "./assets/eda-logo-purple.png";

// myFonts is loading collected font .ttf files from assets folder

import myFonts from "./src/constants/myFonts";

// myTheme is the shared themimg used throughout the application

import myTheme from "./src/constants/myTheme";

// Styles for App.js

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    overflow: "visible",
    width: "50%",
    height: "30%",
    position: "absolute",
    top: 0,
  },
  text: {
    fontSize: 20,
    textAlign: "center",
    margin: "5%",
    color: myTheme.colors.text,
  },
});

export default function App() {
  // config to enable fonts within the application
  const [fontsLoaded, setFontsLoaded] = useState(false);

  const loadFonstAsync = async () => {
    await Font.loadAsync(myFonts);
    setFontsLoaded(true);
  };

  useEffect(() => {
    loadFonstAsync();
  }, []);

  // Enables react-native-screens for better rendering optimization

  enableScreens();

  if (!fontsLoaded) {
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
      <SafeAreaProvider>
        <NavigationContainer theme={myTheme}>
          <PaperProvider theme={myTheme}>
            <StatusBar style="light" animated={true} />
            {/* Repalce me with your top Navigator */}
            <SafeAreaView style={styles.safeAreView}>
              <Image
                source={EdaLogo}
                resizeMode={"cover"}
                style={styles.image}
              />
              <Text style={styles.text}>
                Welcome to the EDA React Native Workshop!
              </Text>
              <Text style={styles.text}>
                We will start development of our Twitter Clone soon :)
              </Text>
            </SafeAreaView>
            {/* End Replace Me */}
          </PaperProvider>
        </NavigationContainer>
      </SafeAreaProvider>
    );
  }
}

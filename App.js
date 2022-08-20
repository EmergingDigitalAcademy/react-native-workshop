import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";
import { enableScreens } from "react-native-screens";
import * as Font from "expo-font";
import {
  NavigationContainer,
  DarkTheme as NavigationDarkTheme,
} from "@react-navigation/native";
import {
  Provider as PaperProvider,
  DarkTheme as PaperDarkTheme,
  Text,
} from "react-native-paper";

import { ImageBackground, View, StyleSheet, Image } from "react-native";
import SplashImage from "./assets/app-splash.png";

import EdaLogo from "./assets/eda-logo-purple.png";

// load fonts from assets file

const myFonts = {
  "Montserrat-Light": require("./assets/Montserrat-Font/Montserrat-Light.ttf"),
  "Montserrat-Medium": require("./assets/Montserrat-Font/Montserrat-Medium.ttf"),
  "Montserrat-Regular": require("./assets/Montserrat-Font/Montserrat-Regular.ttf"),
  "Montserrat-Thin": require("./assets/Montserrat-Font/Montserrat-Thin.ttf"),
  "Montserrat-Bold": require("./assets/Montserrat-Font/Montserrat-Bold.ttf"),
};

// Shared theme to be used throughout the application

const myTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: "#6fbea3",
    accent: "#26275f",
    text: "#f3ebf4",
  },
  fonts: {
    light: {
      fontFamily: "Montserrat-Light",
      fontWeight: "300",
    },
    medium: {
      fontFamily: "Montserrat-Medium",
      fontWeight: "500",
    },
    regular: {
      fontFamily: "Montserrat-Regular",
      fontWeight: "400",
    },
    thin: {
      fontFamily: "Montserrat-Thin",
      fontWeight: "100",
    },
    bold: {
      fontFamily: "Montserrat-Bold",
      fontWeight: "700",
    },
  },
};

// Styles for App.js

const styles = StyleSheet.create({
  safeAreView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    overflow: "visible",
    width: "25%",
    height: "15%",
    marginTop: "10%",
    position: "absolute",
    top: 0
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
              <Image source={EdaLogo} resizeMode={"cover"} style={styles.image} />
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

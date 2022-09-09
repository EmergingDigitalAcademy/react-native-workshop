import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

import EmptyStateView from "../../../reused-components/EmptyStateView";

export default function Landing({ navigation }) {
  const isFocused = useIsFocused(); // is focused will either be true or false depending on if the screen is in focus or not
  const myTheme = useTheme(); // initialzing myTheme useing useTheme

  // No CSS in react-native! we have to define our styles in a StyleSheet object
  // *most* CSS properties transfer over, but not all

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      marginHorizontal: "10%",
    },
    contentWrapper: {
      flex: 1,
      justifyContent: "flex-end",
    },
    text: {
      fontFamily: "Montserrat-Bold",
      fontSize: 28,
      marginBottom: "75%",
    },
    buttonLabelStyle: {
      fontFamily: "Montserrat-Bold",
      fontSize: 16,
      marginVertical: "5%",
    },
    legalAgreementText: {
      fontSize: 16,
      marginTop: "10%",
      marginBottom: "15%",
    },
    subText: {
      marginBottom: "5%",
    },
  });

  // renders EmptyStateView if the screen is not in focuse to save resources

  if (!isFocused) {
    return <EmptyStateView />;
  }

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      edges={["bottom", "left", "right"]} // edges determines which safe area insets are available
      // I am using all edges but top because I have a header from the navigator
      // that already pushes content past the required safearea
    >
      {/* Regular views in react native are not scrollable, have to import a special view */}
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        {/* content container style allows you to adjust the styleing of the content wrapper */}
        {/* regular style attribute doesn't always accept all style options */}
        <Text style={styles.text}>
          See what's happening in the world right now.
        </Text>

        <Button
          color="white"
          mode="contained"
          labelStyle={styles.buttonLabelStyle}
          onPress={() => navigation.navigate("SignUp")}
        >
          Create Account
        </Button>
        <Text
          style={{ ...styles.legalAgreementText, color: myTheme.colors.accent }}
        >
          By signing up, you agree to our{" "}
          <Text style={{ color: myTheme.colors.primary }}>Terms</Text>,{" "}
          <Text style={{ color: myTheme.colors.primary }}>Privacy Policy</Text>,
          and <Text style={{ color: myTheme.colors.primary }}>Cookie Use</Text>.
        </Text>

        <Text style={{ ...styles.subText, color: myTheme.colors.accent }}>
          Have an account already?{" "}
          <Text style={{ color: myTheme.colors.primary }}>Log in</Text>
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

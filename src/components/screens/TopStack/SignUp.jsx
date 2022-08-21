import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { View, StyleSheet, ScrollView } from "react-native";
import { Button, Text, useTheme } from "react-native-paper";

const styles = StyleSheet.create({
  safeAreaView: {
    flex: 1,
    alignItems: "center",
    marginHorizontal: "10%",
  },
  image: {
    height: "7.5%",
    width: "7.5%",
    overflow: "visible",
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
    marginBottom: "15%"
  },
  subText: {marginBottom: "5%"},
});

export default function SignUp() {
  const myTheme = useTheme();

  return (
    <SafeAreaView
      style={styles.safeAreaView}
      edges={["bottom", "left", "right"]}
    >
      <ScrollView contentContainerStyle={styles.contentWrapper}>
        <Text style={styles.text}>
          See what's happening in the world right now.
        </Text>

        <Button
          color="white"
          mode="contained"
          labelStyle={styles.buttonLabelStyle}
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

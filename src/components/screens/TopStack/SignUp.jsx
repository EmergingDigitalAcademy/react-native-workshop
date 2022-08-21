import React from "react";
import { useIsFocused } from "@react-navigation/native";

import { SafeAreaView } from "react-native-safe-area-context";
import { StyleSheet, ScrollView } from "react-native";
import { Text, TextInput, useTheme } from "react-native-paper";

export default function SignUp() {
  const isFocused = useIsFocused();
  const myTheme = useTheme();

  const styles = StyleSheet.create({
    safeAreaView: {
      flex: 1,
      marginHorizontal: "10%",
    },
    text: {
      fontFamily: "Montserrat-Bold",
      fontSize: 28,
      marginVertical: "5%"
    },
  });

  return (
    <SafeAreaView
      edges={["bottom", "left", "right"]}
      style={styles.safeAreaView}
    >
      <ScrollView>
        <Text style={styles.text}>Create your account</Text>
        <TextInput
        theme={{...myTheme, roundness: 4}}
        style={{ backgroundColor: "transparent", marginTop: "5%" }}
        label="Name"
        />
      </ScrollView>
    </SafeAreaView>
  );
}

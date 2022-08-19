import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { Provider as PaperProvider } from "react-native-paper";
import { SafeAreaProvider, SafeAreaView } from "react-native-safe-area-context";

import { Text } from "react-native";

// import TopStack from "./src/components/navigators/TopStack";

const TopStack = () => <SafeAreaView style={{flex: 1, justifyContent: "flex-end"}}><Text>Hello There</Text></SafeAreaView>

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <PaperProvider>
          <StatusBar barStyle="dark" animated={true} />
          <TopStack />
        </PaperProvider>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

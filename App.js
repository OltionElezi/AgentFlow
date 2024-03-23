import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, View } from "react-native";
import StackNavigator from "./StackNavigator";
// import { UserContext } from "./UserContext";
import { UserProvider } from "./UserContextData";

export default function App() {
  return (
    <>
      <StatusBar style="light" />
      <UserProvider>
        <View style={styles.container}>
          <StackNavigator />
        </View>
      </UserProvider>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    // alignItems: "center",
    // justifyContent: "center",
  },
});

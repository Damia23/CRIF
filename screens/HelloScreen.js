import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Link } from "@react-navigation/native";

const HomeScreen = () => {
  return (
    <SafeAreaView style={[styles.container, styles.fontSize]}>
      <Text style={{ fontSize: 50 }}>Hello, welcome to my app!</Text>
      <Link to={"/Home"} style={styles.nav_link}>
        To Home Screen
      </Link>
    </SafeAreaView>
  );
};

var { Platform } = React;

const styles = StyleSheet.create({
  fontSize: Platform.OS === "ios" ? 18 : 22,
  container: {
    flex: 1,
    justifyContent: "space-evenly",
    // justifyContent: 'center',
    alignItems: "center",
  },
  nav_link: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  button: {
    backgroundColor: "black",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;

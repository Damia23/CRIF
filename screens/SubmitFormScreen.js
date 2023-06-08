import { StyleSheet, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { Link } from "@react-navigation/native";
import { MaterialIcons } from "@expo/vector-icons";

const SubmitFormScreen = () => {
  return (
    <SafeAreaView style={[styles.container, styles.fontSize]}>
      <Text style={styles.header}>
        Construction Incident Report Form submitted!
      </Text>
      <MaterialIcons
        name="fact-check"
        size={80}
        color="green"
        style={styles.icon}
      />
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
    justifyContent: "center",
    alignItems: "center",
  },
  header: {
    fontSize: 50,
    textAlign: "center",
  },
  icon: {
    marginVertical: 30,
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

export default SubmitFormScreen;

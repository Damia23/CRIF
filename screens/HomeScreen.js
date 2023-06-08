import { StyleSheet, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { SafeAreaView } from "react-native";
import { Link } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../services/firebase";
import { auth } from "../services/firebase";
import { onAuthStateChanged } from "firebase/auth";

const HomeScreen = ({ navigation }) => {
  const [user, setUser] = useState("");

  useEffect(() => {
    // initializeApp(firebaseConfig);
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/auth.user
        setUser(user.email);
        // ...
      } else {
        // User is signed out
        // ...
        navigation.replace("Login");
      }
    });
  }, []);

  const logout = () => {
    auth.signOut();
  };

  return (
    <SafeAreaView style={[styles.container, styles.fontSize]}>
      <Text style={{ fontSize: 30 }}>
        <Ionicons
          name="construct"
          size={24}
          color="black"
          style={styles.icon}
        />{" "}
        CIRF System
      </Text>
      <Text>User logged in: {user}</Text>
      <Link to={"/CIRF"} style={styles.nav_link}>
        To Form Screen
      </Link>
      <Link to ={""} style={styles.nav_link}>
        Camera
      </Link>
      <TouchableOpacity style={styles.button} onPress={logout}>
        <Text style={styles.buttonText}>Logout</Text>
      </TouchableOpacity>
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
  nav_link: {
    backgroundColor: "orange",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginVertical: 20,
  },
  icon: {
    margin: 10,
    padding: 10,
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

import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  KeyboardAvoidingView,
  SafeAreaView,
} from "react-native";
import React, { useState, useEffect } from "react";
import { Link, useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { auth } from "../services/firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");
  const [loginError, setLoginError] = useState("");

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        navigation.replace("Home");
      } else {
        // User is signed out
        // setLoginError("Error in logging into the system. Can you try again?");
      }
    });
  }, [user]);

  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        setUser(userCredential.user.email);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.header}>
          <MaterialCommunityIcons
            name="login-variant"
            size={24}
            color="black"
          />
          Login
        </Text>
        <View style={{ width: "80%" }}>
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
            style={styles.input}
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
        </View>
        <Text>{loginError}</Text>

        <View style={styles.action_container}>
          <TouchableOpacity
            style={styles.login}
            onPress={() => login(email, password)}
          >
            <Text style={styles.text}>Login</Text>
          </TouchableOpacity>

          <Link to="/Signup" style={styles.register}>
            <Text style={styles.register_text}>Register</Text>
          </Link>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  input: {
    backgroundColor: "white",
    paddingHorizontal: 15,
    paddingVertical: 20,
    borderRadius: 10,
    marginTop: 5,
  },
  header: {
    fontSize: 32,
    fontWeight: 700,
  },
  text: {
    color: "white",
    fontWeight: 700,
    fontSize: 16,
  },
  action_container: {
    width: "60%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  login: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  register: {
    backgroundColor: "white",
    width: "100%",
    padding: 15,
    textAlign: "center",
    marginTop: 10,
  },
  register_text: {
    color: "blue",
    fontWeight: "700",
    fontSize: 16,
  },
});

export default LoginScreen;

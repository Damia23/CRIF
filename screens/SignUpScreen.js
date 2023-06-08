import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  SafeAreaView,
  FlatList,
} from "react-native";
import React, { useState } from "react";
import { Feather } from "@expo/vector-icons";
import { auth } from "../services/firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { useValidation } from "react-simple-form-validator";

const SignUpScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState([]);
  const [pwError, setPwError] = useState([]);

  const { isFieldInError, getErrorsInField, isFormValid } = useValidation({
    fieldsRules: {
      email: { email: true, required: true },
      password: { required: true, minlength: 6 },
    },
    state: { email, password },
  });

  const register = (email, password) => {
    if (isFormValid) {
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          navigation.replace("Home");
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    } else {
      setEmailError(getErrorsInField("email"));
      setPwError(getErrorsInField("password"));
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
      >
        <Text style={styles.header}>
          <Feather name="user-plus" size={24} color="black" />
          Register
        </Text>
        <View style={{ width: "80%" }}>
          <TextInput
            value={email}
            onChangeText={(email) => setEmail(email)}
            placeholder="Email"
            style={styles.input}
          />
          <FlatList
            data={emailError}
            renderItem={({ item }) => {
              return <Text>{item}</Text>;
            }}
          />
          <TextInput
            value={password}
            onChangeText={(password) => setPassword(password)}
            placeholder="Password"
            secureTextEntry
            style={styles.input}
          />
          <FlatList
            data={pwError}
            renderItem={({ item }) => {
              return <Text>{item}</Text>;
            }}
          />
        </View>

        <View style={styles.action_container}>
          <TouchableOpacity
            style={styles.register}
            onPress={() => register(email, password)}
          >
            <Text style={styles.text}>Register</Text>
          </TouchableOpacity>
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
  register: {
    backgroundColor: "blue",
    width: "100%",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
});

export default SignUpScreen;

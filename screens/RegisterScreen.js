import {
  StyleSheet,
  Text,
  View,
  TextInput,
  KeyboardAvoidingView,
  Pressable,
  Alert,
  ScrollView,
  Platform,
} from "react-native";

import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";

const RegisterScreen = () => {
  const [email, setEmail] = useState("");
  const [typeofUser, setTypeofUser] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  // const [image, setImage] = useState("");
  const navigation = useNavigation();

  const handleRegister = () => {
    if (!name || !email || !typeofUser || !password) {
      Alert.alert("Missing Information", "Please fill in all fields.");
      return;
    }
    if (!email.includes("@")) {
      Alert.alert("Invalid Email", "Please enter a valid email address.");
      return;
    }

    if (password.length < 8 || !/[a-zA-Z]/.test(password)) {
      Alert.alert(
        "Invalid Password",
        "Password must be at least 8 characters long and contain at least one letter."
      );
      return;
    }

    const user = {
      name: name,
      email: email,
      typeofUser: typeofUser,
      password: password,
      // image: image,
    };

    // send a POST request to the backend API to register the user
    axios
      .post("http://192.168.1.40:8000/register", user)
      .then((response) => {
        console.log(response);
        Alert.alert(
          "Registration successful",
          "You have been registered Successfully"
        );
        setName("");
        setEmail("");
        setTypeofUser("");
        setPassword("");
        setImage("");
        // Navigate to the login screen and pass the registered email
        navigation.navigate("Login");
      })
      .catch((error) => {
        Alert.alert(
          "Registration Error",
          "An error occurred while registering"
        );
        console.log("registration failed", error);
      });
  };

  const showInfoAlert = () => {
    Alert.alert(
      "Information",
      "Lloji i userit qe deshironi te jeni per te menaxhuar"
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View>
          <Text style={styles.headerText}>Register</Text>
          <Text style={styles.subheaderText}>Create New Account</Text>
        </View>

        <View style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Name</Text>
            <TextInput
              value={name}
              onChangeText={(text) => setName(text)}
              style={styles.textInput}
              placeholder="Your name"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Email</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              placeholder="Your email"
            />
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Type</Text>
            <View style={styles.typeInputContainer}>
              <TextInput
                value={typeofUser}
                onChangeText={(text) => setTypeofUser(text)}
                style={styles.textInput}
                placeholder="Your type"
              />
              <Pressable onPress={showInfoAlert}>
                <Text style={styles.questionMark}>?</Text>
              </Pressable>
            </View>
          </View>

          <View style={styles.inputContainer}>
            <Text style={styles.labelText}>Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              style={styles.textInput}
              placeholder="Your password"
              secureTextEntry={true}
            />
          </View>

          <Pressable onPress={handleRegister} style={styles.registerButton}>
            <Text style={styles.buttonText}>Register</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.goBack()}
            style={styles.signInContainer}
          >
            <Text style={styles.signInText}>
              Already have an account?{" "}
              <Text style={styles.signInLink}>Sign in</Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 10,
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: "space-between",
    margin: 50,
  },
  headerText: {
    color: "tomato",
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 10,
  },
  subheaderText: {
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
    marginBottom: 50,
  },
  formContainer: {
    alignItems: "center",
  },
  inputContainer: {
    marginBottom: 20,
    width: "80%",
  },
  labelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
    marginBottom: 5,
  },
  textInput: {
    fontSize: 18,
    borderBottomColor: "gray",
    borderBottomWidth: 1,
    width: "100%",
    paddingVertical: 5,
  },
  typeInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  questionMark: {
    fontSize: 22,
  },
  registerButton: {
    width: 200,
    backgroundColor: "tomato",
    padding: 15,
    borderRadius: 6,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signInContainer: {
    marginTop: 20,
  },
  signInText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
  signInLink: {
    textDecorationLine: "underline",
    color: "tomato",
  },
});

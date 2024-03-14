import {
  KeyboardAvoidingView,
  Pressable,
  Text,
  TextInput,
  ScrollView,
  View,
  Image,
  Platform,
  Switch,
} from "react-native";
import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../styles/LoginScreen.styles";
import Logo from "../assets/logo/AgentFlow.png";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [typeofUser, setTypeofUser] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");

        if (token) {
          navigation.replace("Home");
        } else {
          // token not found, show the login screen itself
        }

        const rememberMeValue = await AsyncStorage.getItem("rememberMe");
        if (rememberMeValue) {
          setRememberMe(true);
          const savedEmail = await AsyncStorage.getItem("email");
          const savedTypeofUser = await AsyncStorage.getItem("typeofUser");
          setEmail(savedEmail || "");
          setTypeofUser(savedTypeofUser || "");
        }
      } catch (error) {
        console.log("error", error);
      }
    };

    checkLoginStatus();
  }, []);

  const handleLogin = async () => {
    const user = {
      email: email,
      typeofUser: typeofUser,
      password: password,
    };

    axios
      .post("http://172.20.10.2:8000/login", user)
      .then(async (response) => {
        console.log(response);
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);

        if (rememberMe) {
          await AsyncStorage.setItem("rememberMe", "true");
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("typeofUser", typeofUser);
        } else {
          AsyncStorage.removeItem("rememberMe");
          AsyncStorage.removeItem("email");
          AsyncStorage.removeItem("typeofUser");
        }

        navigation.replace("Home");
      })
      .catch((error) => {
        Alert.alert("Login Error", "Invalid email, type, or password");
      });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>AgentFlow</Text>
        <View
          style={{
            marginTop: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerText}>Sign In</Text>
          <Text style={styles.subheaderText}>Sign In to Your Account</Text>
        </View>

        <View style={styles.inputContainer}>
          <View>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              style={styles.textInput}
              placeholderTextColor={"gray"}
              placeholder="Email"
            />
          </View>

          <View>
            <TextInput
              value={typeofUser}
              onChangeText={(text) => setTypeofUser(text)}
              style={styles.textInput}
              placeholderTextColor={"gray"}
              placeholder="Type"
            />
          </View>

          <View>
            <View style={styles.passwordContainer}>
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={!showPassword}
                style={styles.passwordInput}
                placeholderTextColor={"gray"}
                placeholder="Password"
              />
              <Pressable onPress={togglePasswordVisibility}>
                <Feather
                  name={showPassword ? "eye" : "eye-off"}
                  size={22}
                  color="gray"
                  style={styles.passwordToggleIcon}
                />
              </Pressable>
            </View>
          </View>

          <View style={styles.rememberMeContainer}>
            <Switch
              style={styles.rememberMeSwitch}
              value={rememberMe}
              onValueChange={(value) => setRememberMe(value)}
            />
            <Text style={styles.rememberMeText}>Remember Me</Text>
          </View>

          <Pressable
            onPress={handleLogin}
            style={({ pressed }) => [
              styles.loginButton,
              { backgroundColor: pressed ? "#FDA403" : "tomato" }, // Change the background color when pressed
            ]}
          >
            <Text style={styles.loginButtonText}>Login</Text>
          </Pressable>

          <Pressable
            onPress={() => navigation.navigate("Register")}
            style={styles.signUpTextContainer}
          >
            <Text style={styles.signUpText}>
              Don't have an account?{" "}
              <Text
                style={styles.signUpLink}
                onPress={() => navigation.navigate("Register")}
              >
                Sign Up
              </Text>
            </Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

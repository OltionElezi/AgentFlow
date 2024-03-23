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
import React, { useState, useEffect, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Alert } from "react-native";
import { Feather } from "@expo/vector-icons";
import styles from "../styles/LoginScreen.styles";
import Logo from "../assets/logo/AgentFlow.png";
import { UserContext } from "../UserContextData";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const { setUser } = useContext(UserContext);
  const navigation = useNavigation();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("authToken");
        const userId = await AsyncStorage.getItem("userId");
        if (token) {
          navigation.navigate("Tabs");

          axios
            .get(`http://192.168.1.40:8000/user/${userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((responseUser) => {
              console.log(responseUser.data, "USER RESPONSE");
              const userData = responseUser.data;
              setUser(userData);
            })
            .catch((error) => {
              console.log("Failed to fetch user data:", error);
            });
        } else {
          // token not found, show the login screen itself
          navigation.navigate("Login");
        }

        // const keys = await AsyncStorage.getAllKeys();
        // console.log(keys, "Oli");
        const rememberMeValue = await AsyncStorage.getItem("rememberMe");
        if (rememberMeValue) {
          setRememberMe(true);
          const savedEmail = await AsyncStorage.getItem("email");

          setEmail(savedEmail || "");
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
      password: password,
    };

    axios
      .post("http://192.168.1.40:8000/login", user)
      .then(async (response) => {
        const userId = response.data.userId;
        const token = response.data.token;
        AsyncStorage.setItem("authToken", token);
        AsyncStorage.setItem("userId", userId);
        if (rememberMe) {
          await AsyncStorage.setItem("rememberMe", "true");
          await AsyncStorage.setItem("email", email);
          await AsyncStorage.setItem("userId", userId);
        } else {
          AsyncStorage.removeItem("rememberMe");
          AsyncStorage.removeItem("email");
        }

        if (response.status === 200) {
          // Get the user details after logging in
          axios
            .get(`http://192.168.1.40:8000/user/${response.data.userId}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            })
            .then((responseUser) => {
              console.log(responseUser.data, "USER RESPONSE");
              const userData = responseUser.data;
              setUser(userData);
            })
            .catch((error) => {
              console.log("Failed to fetch user data:", error);
            });
        }

        navigation.navigate("Tabs");
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
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.select({ ios: 0, android: 0 })} // Adjust this value as needed
    >
      <ScrollView contentContainerStyle={styles.scrollViewContent}>
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />
        </View>
        <Text style={styles.title}>Hotelier</Text>
        <View
          style={{
            marginTop: 80,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={styles.headerText}>Sign In</Text>
          <Text style={styles.subheaderText}>Sign In to Your Account</Text>
          <Text style={styles.signUpText}>or</Text>
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
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

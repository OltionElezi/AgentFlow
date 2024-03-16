import {
  StyleSheet,
  Dimensions,
  Image,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect, useContext, useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import { UserType } from "../UserContext";
import AsyncStorage from "@react-native-async-storage/async-storage";
import jwt_decode from "jwt-decode";
import axios from "axios";
import User from "../components/User";
import LogoutButton from "./LogoutButton";
import Logo from "../assets/logo/AgentFlow.png";

const windowWidth = Dimensions.get("window").width;
const HomeScreen = () => {
  const navigation = useNavigation();
  const { userId, setUserId } = useContext(UserType);
  const [users, setUsers] = useState([]);
  useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: "",
      headerLeft: () => (
        <View style={styles.logoContainer}>
          <Image source={Logo} style={styles.logo} />

          <Text style={{ fontSize: 16, fontWeight: "bold" }}>AgentFlow</Text>
        </View>
      ),
      headerRight: () => (
        <View style={{ flexDirection: "row", alignItems: "center", gap: 8 }}>
          <MaterialIcons
            onPress={() => navigation.navigate("Friends")}
            name="people-outline"
            size={24}
            color="black"
          />
        </View>
      ),
    });
  }, []);

  useEffect(() => {
    const fetchUsers = async () => {
      const token = await AsyncStorage.getItem("authToken");
      const decodedToken = jwt_decode(token);
      const userId = decodedToken.userId;
      setUserId(userId);

      axios
        .get(`http://172.20.10.2:8000/users/${userId}`)
        .then((response) => {
          setUsers(response.data);
          console.log(response.data.typeofUser, "USER FETCH");
        })
        .catch((error) => {
          console.log("error retrieving users", error);
        });
    };

    fetchUsers();
  }, []);

  // console.log("users", users);
  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ padding: 10 }}>
        {users.map((item, index) => (
          <User key={index} item={item} />
        ))}
      </View>
      <LogoutButton />

      {/* home icon to see cards */}
      <MaterialCommunityIcons
        onPress={() => navigation.navigate("Card")}
        name="home-city"
        size={24}
        color="black"
      />

      {/* + icon to add card */}
      {User.typeofUser !== "agent" && (
        <MaterialIcons
          onPress={() => navigation.navigate("CreateCard")}
          name="add"
          size={24}
          color="black"
        />
      )}
    </ScrollView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  logoContainer: {
    flexDirection: "row",
    textAlign: "center",
    alignItems: "center",
  },
  logo: {
    // width: windowWidth < 400 ? 40 : 40, example of devices responsive
    width: 40,
    height: 40,
    resizeMode: "contain",
  },
});

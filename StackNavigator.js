// import { StyleSheet, Text, View } from "react-native";
// import React from "react";
// import { NavigationContainer } from "@react-navigation/native";
// import { createNativeStackNavigator } from "@react-navigation/native-stack";
// import LoginScreen from "./screens/LoginScreen";
// import RegisterScreen from "./screens/RegisterScreen";
// import HomeScreen from "./screens/HomeScreen";
// import FriendsScreen from "./screens/FriendsScreen";
// // import ChatsScreen from "./screens/ChatsScreen";
// // import ChatMessagesScreen from "./screens/ChatMessagesScreen";
// import CardScreen from "./screens/CardScreen";
// import CreateCard from "./screens/CreateCard";

// const StackNavigator = () => {
//   const Stack = createNativeStackNavigator();
//   return (
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen
//           name="Login"
//           component={LoginScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen
//           name="Register"
//           component={RegisterScreen}
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen name="Home" component={HomeScreen} />

//         <Stack.Screen name="Friends" component={FriendsScreen} />

//         {/* <Stack.Screen name="Chats" component={ChatsScreen} /> */}

//         {/* <Stack.Screen name="Messages" component={ChatMessagesScreen} /> */}
//         <Stack.Screen name="Card" component={CardScreen} />
//         <Stack.Screen name="CreateCard" component={CreateCard} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// };

// export default StackNavigator;

// const styles = StyleSheet.create({});

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ReservationScreen from "./screens/ReservationScreen";
import CardScreen from "./screens/CardScreen";
import CreateCard from "./screens/CreateCard";
import FriendsScreen from "./screens/FriendsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreenPrv from "./screens/HomeScreenPrv";
// import { Card } from "react-native-paper";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName;

        if (route.name === "Home") {
          iconName = "home";
        } else if (route.name === "Profile") {
          iconName = "user";
        } else if (route.name === "Reservation") {
          iconName = "calendar-alt";
        } else if (route.name === "Notification") {
          iconName = "bell";
        }

        return <FontAwesome5 name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: "tomato",
      tabBarInactiveTintColor: "gray",
      tabBarStyle: [
        {
          display: "flex",
        },
        null,
      ],
    })}
  >
    <Tab.Screen
      name="Home"
      component={HomeScreenPrv}
      options={{
        tabBarLabel: "Home",
      }}
    />
    <Tab.Screen
      name="Profile"
      component={ProfileScreen}
      options={{
        tabBarLabel: "Profile",
      }}
    />
    <Tab.Screen
      name="Reservation"
      component={ReservationScreen}
      options={{
        tabBarLabel: "Reservation",
      }}
    />
    <Tab.Screen
      name="Notification"
      component={NotificationScreen}
      options={{
        tabBarLabel: "Notification",
      }}
    />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Tabs"
          component={TabNavigator}
          options={{ headerShown: false }}
        />
        {/* <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "Home" }}
        /> */}
        <Stack.Screen
          name="Card"
          component={CardScreen}
          options={{ title: "Card" }}
        />

        <Stack.Screen
          name="CreateCard"
          component={CreateCard}
          options={{ title: "CreateCard" }}
        />

        <Stack.Screen
          name="Friends"
          component={FriendsScreen}
          options={{ title: "Friends" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

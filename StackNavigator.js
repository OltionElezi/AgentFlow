import React, { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { FontAwesome5 } from "@expo/vector-icons";
// import HomeScreen from "./screens/HomeScreen";
import ProfileScreen from "./screens/ProfileScreen";
import NotificationScreen from "./screens/NotificationScreen";
import ReservationScreen from "./screens/ReservationScreen";
import CardScreen from "./screens/CardScreen";
import CreateCard from "./screens/CreateCard";
import FriendsScreen from "./screens/FriendsScreen";
import LoginScreen from "./screens/LoginScreen";
import RegisterScreen from "./screens/RegisterScreen";
import HomeScreenPrv from "./screens/HomeScreenPrv";
import CardProfile from "./screens/CardProfile";
// import { Card } from "react-native-paper";
import CreateCardButton from "./screens/CreateCardButton";
import CreateCardPrv from "./screens/CreateCardPrv";
import Settings from "./screens/Settings";
import EditProfile from "./screens/EditProfile";
import { Ionicons } from "@expo/vector-icons";
import FilterScreen from "./screens/FilterScreen";
import { UserContext } from "./UserContextData";

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  const { user } = useContext(UserContext);

  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName;

          if (route.name === "Home") {
            iconName = "home";
          } else if (
            route.name === "CreateCardPrv" &&
            user &&
            user.typeofUser === "Owner"
          ) {
            iconName = "plus";
          } else if (route.name === "Profile") {
            iconName = "user";
          } else if (route.name === "Reservation") {
            iconName = "calendar-alt";
          } else if (route.name === "Notification") {
            iconName = "bell";
          } else if (route.name === "Settings") {
            iconName = "settings-sharp";
            return <Ionicons name={iconName} size={size} color={color} />;
          }

          return <FontAwesome5 name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#16FF00",
        tabBarInactiveTintColor: "gray",
        tabBarStyle: {
          backgroundColor: "#000",
          borderRadius: 30,
          marginTop: 0,
          marginBottom: 20,
          marginHorizontal: 10,
          paddingBottom: 10,
          paddingTop: 10,
        },
        tabBarLabelStyle: {
          display: "none",
        },
      })}
    >
      <Tab.Screen
        name="Home"
        component={HomeScreenPrv}
        options={{
          tabBarLabel: "Home",
          headerShown: false,
        }}
      />
      {user.typeofUser === "Owner" && (
        <Tab.Screen
          name="CreateCardPrv"
          component={CreateCardPrv}
          options={{
            tabBarLabel: "CreateCard",
          }}
        />
      )}
      <Tab.Screen
        name="Reservation"
        component={ReservationScreen}
        options={{
          tabBarLabel: "Reservation",
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          tabBarLabel: "Settings",
        }}
      />
    </Tab.Navigator>
  );
};

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

        <Stack.Screen
          name="CardProfile"
          component={CardProfile}
          options={{ headerShown: false }}
        />
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
          name="EditProfile"
          component={EditProfile}
          options={{ title: "EditProfile" }}
        />

        <Stack.Screen
          name="Notification"
          component={NotificationScreen}
          options={{ title: "Notification" }}
        />

        <Stack.Screen
          name="Filter"
          component={FilterScreen}
          options={{ title: "Filter" }}
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

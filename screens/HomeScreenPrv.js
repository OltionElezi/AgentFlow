import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import "react-native-get-random-values";

import { Ionicons } from "@expo/vector-icons";
import Card from "../api/models/cardDetails";

const HomeScreenPrv = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loremIpsum = `Lorem ipsum dolor sit ajsdnl   Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametametL Lorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametLorem ipsum dolor sit ametorem ipsum dolor sit amet im ashaSDDD cosntasf FffSDLL DCOMSMSdlasa  consectetur adipiscing elit. Sed ut nisl eget velit fermentum commodo. Donec nec varius velit. Proin eget arcu sit amet justo efficitur sollicitudin. Mauris aliquet lectus in erat luctus, id venenatis nulla eleifend. Fusce non lacus at velit tincidunt feugiat nec id lorem. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Morbi et felis quis orci euismod mattis. Integer vitae turpis non lectus eleifend placerat vel nec quam. Nam sit amet tincidunt lectus. Suspendisse potenti. Proin rutrum, mi at ullamcorper congue, libero velit varius nulla, eu posuere lectus risus vitae risus. Curabitur quis urna eu leo posuere tempor.`; // Repeat or customize as needed

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("http://192.168.1.40:8000/card/list");
      const data = await response.json();
      const updatedData = data.map((item) => ({
        ...item,
        image: { uri: item.image },
      }));
      console.log(updatedData, "data");
      setData(updatedData);
      setSearchResults(updatedData);
      setIsLoading(false);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleSearch = async () => {
    try {
      const response = await fetch(
        `http://192.168.1.40:8000/card/search?query=${searchQuery}`
      );
      const data = await response.json();
      const updatedData = data.map((item) => ({
        ...item,
        image: `${item.image}`,
      }));
      setSearchResults(updatedData);
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleCardPress = (item) => {
    navigation.navigate("CardProfile", { item });
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Image source={item.image} style={{ width: 100, height: 100 }} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
    </TouchableOpacity>
  );
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerProfile}>
          <TouchableOpacity style={styles.profileButton}>
            <FontAwesome5 name={"user"} size={24} color={"#fff"} />
          </TouchableOpacity>
          <View style={styles.titleText}>
            <Text style={styles.titleHeader}>Hi, Oli</Text>
            <Text style={styles.paragraphHeader}>Agent</Text>
          </View>
        </View>

        <TouchableOpacity style={styles.notificationButton}>
          <FontAwesome5 name={"bell"} size={24} color={"#fff"} />
        </TouchableOpacity>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <AntDesign
            name="search1"
            size={22}
            color="#fff"
            style={styles.searchIcon}
          />
          <TextInput
            placeholder="Search..."
            style={[styles.searchInput, { color: "#fff" }]} // Add color style here
            placeholderTextColor="#fff"
            value={searchQuery}
            onChangeText={(text) => setSearchQuery(text)}
            onSubmitEditing={handleSearch}
          />

          <TouchableOpacity style={styles.filterButton}>
            <FontAwesome6
              name="sliders"
              size={18}
              color="#000"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item._id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  headerProfile: {
    flexDirection: "row",
  },
  profileButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#16FF00",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
    padding: 5,
  },
  titleText: {
    flexDirection: "column",
  },
  titleHeader: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  paragraphHeader: {
    color: "#fff",
    fontSize: 10,
  },
  notificationButton: {
    padding: 5,
    // borderRadius: 5,
    // backgroundColor: "#ddd",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInputContainer: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    position: "relative",
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
    paddingLeft: 40,
    paddingRight: 40,
  },
  searchIcon: {
    color: "#fff",
    position: "absolute",
    left: 10,
    top: "50%",
    transform: [{ translateY: -12 }],
  },
  filterButton: {
    width: 30,
    height: 30,
    borderRadius: 20,
    backgroundColor: "#16FF00",
    justifyContent: "center",
    alignItems: "center",
    marginLeft: 10,
    padding: 5,
    position: "absolute",
    right: 10,
    top: "50%",
    transform: [{ translateY: -15 }],
  },

  card: {
    flexDirection: "column",
    alignItems: "center",
    marginBottom: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ddd",
    overflow: "hidden",
    position: "relative", // Ensure the card is relative
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    padding: 10,
    alignSelf: "flex-start", // Align content to start
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left", // Align text to left
  },
  location: {
    fontSize: 14,
    textAlign: "left", // Align text to left
  },
  addButton: {
    backgroundColor: "grey",
    width: 30, // Fixed width
    height: 30, // Fixed height
    borderRadius: 15, // Half of width and height to make it a circle
    justifyContent: "center",
    alignItems: "center",
    position: "absolute", // Position the button absolutely
    bottom: 0, // Align to the bottom
    right: 0, // Align to the right
    marginBottom: 5,
    marginRight: 5,
  },
});

export default HomeScreenPrv;

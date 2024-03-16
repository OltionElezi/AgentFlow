import React from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

const HomeScreenPrv = () => {
  const data = [
    {
      id: 1,
      title: "Title 1",
      location: "Location 1",
      image: require("../api/files/1688547340715-576375569-image.jpg"),
    },
    {
      id: 2,
      title: "Title 2",
      location: "Location 2",
      image: require("../api/files/1688547106897-739523091-image.jpg"),
    },
    // Add more data items here...
  ];

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <Image source={item.image} style={styles.image} />
      <View style={styles.cardContent}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>{item.location}</Text>
      </View>
      <TouchableOpacity style={styles.addButton}>
        {/* Add your icon here */}
        <Text style={{ color: "white" }}>+</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput placeholder="Search" style={styles.searchInput} />
        <AntDesign
          name="search1"
          size={24}
          color="black"
          style={styles.searchIcon}
        />
      </View>
      <FlatList
        data={data}
        renderItem={renderCard}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  searchInput: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "gray",
    borderRadius: 10,
  },
  searchIcon: {
    marginLeft: 10,
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
  },
  image: {
    width: "100%",
    height: 200,
    resizeMode: "cover",
  },
  cardContent: {
    flex: 1,
    padding: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
  },
  location: {
    fontSize: 14,
  },
  addButton: {
    backgroundColor: "grey",
    padding: 8,
    marginRight: 5,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default HomeScreenPrv;

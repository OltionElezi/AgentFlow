import { StyleSheet, View, Text, ScrollView, Image } from "react-native";
import React, { useEffect, useState } from "react";
import axios from "axios";

const CardScreen = () => {
  const [cardRequests, setCardRequests] = useState([]);
  useEffect(() => {
    fetchCardRequests();
  }, []);

  const fetchCardRequests = async () => {
    try {
      const response = await axios.get(`http://192.168.1.40:8000/card/list`);
      if (response.status === 200) {
        setCardRequests(response.data);
      }
    } catch (err) {
      console.log("error message", err);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollView}>
      <View style={styles.container}>
        {cardRequests.map((card) => (
          <View key={card._id} style={styles.card}>
            <Image source={{ uri: card.image }} style={styles.image} />
            <Text style={styles.location}>{card.location}</Text>
            <Text style={styles.description}>
              {card.description.slice(0, 20)}...
            </Text>
          </View>
        ))}
      </View>
    </ScrollView>
  );
};

export default CardScreen;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
    paddingVertical: 10,
  },
  container: {
    padding: 10,
  },
  card: {
    backgroundColor: "#f0f0f0",
    padding: 10,
    marginBottom: 10,
    borderRadius: 5,
  },
  image: {
    width: "100%",
    height: 200,
    borderRadius: 10,
    marginBottom: 10,
  },
  location: {
    textAlign: "center",
    marginBottom: 5,
  },
  description: {
    color: "gray",
    marginBottom: 5,
  },
});

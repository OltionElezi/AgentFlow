import React from "react";
import { TouchableOpacity, Text, View, StyleSheet } from "react-native";
import { FontAwesome5 } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

const CreateCardButton = () => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("CreateCard");
  };

  return (
    <TouchableOpacity style={styles.button} onPress={handlePress}>
      <FontAwesome5 name="plus" size={24} color="#fff" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: "#FFFFFF",
    borderRadius: 50,
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    bottom: 20,
    right: 20,
    zIndex: 999,
  },
});

export default CreateCardButton;

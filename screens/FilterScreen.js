import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Slider from "@react-native-community/slider";

const FilterScreen = ({ onClose, onApply }) => {
  const [priceRange, setPriceRange] = useState(10);
  const [searchType, setSearchType] = useState("");

  const handleApplyFilter = () => {
    onApply({ priceRange, searchType });
    onClose();
  };

  return (
    <View style={styles.container}>
      {/* <TouchableOpacity style={styles.closeButton} onPress={onClose}>
        <AntDesign name="close" size={24} color="black" />
      </TouchableOpacity> */}
      <Text style={styles.title}>Filter</Text>
      <View style={styles.filterOption}>
        <Text>Price Range:</Text>
        <Slider
          style={{ flex: 1 }}
          minimumValue={10}
          maximumValue={2000}
          step={10}
          value={priceRange}
          onValueChange={(value) => setPriceRange(value)}
        />
        <Text>${priceRange}</Text>
      </View>
      <View style={styles.filterOption}>
        <Text>Search Type:</Text>
        <TextInput
          style={styles.input}
          value={searchType}
          onChangeText={(text) => setSearchType(text)}
          placeholder="Enter search type"
        />
      </View>
      <TouchableOpacity style={styles.applyButton} onPress={handleApplyFilter}>
        <Text style={styles.applyText}>Apply</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  closeButton: {
    position: "absolute",
    top: 10,
    right: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  filterOption: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
  },
  applyButton: {
    backgroundColor: "#16FF00",
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  applyText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default FilterScreen;

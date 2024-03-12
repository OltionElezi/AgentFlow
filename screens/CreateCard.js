import React, { useState } from "react";
import { View, TextInput, Button, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import axios from "axios";
import DateTimePicker from "@react-native-community/datetimepicker";

const CreateCard = () => {
  const [image, setImage] = useState(null);
  const [location, setLocation] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShowDatePicker(false);
    setDate(currentDate);
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("image", {
        uri: image,
        type: "image/jpeg", // or whatever MIME type your image is
        name: "image.jpg",
      });

      formData.append("description", description);
      formData.append("location", location);
      formData.append("calendar", "12/07/2024-18/07/2024");

      const response = await fetch("http://172.20.10.2:8000/card/register", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error registering card", error);
    }
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Button title="Pick an image from gallery" onPress={pickImage} />
      {image && (
        <Image
          source={{ uri: image }}
          style={{
            width: 150,
            height: 150,
            borderWidth: 1,
            borderColor: "black",
          }}
        />
      )}
      <DateTimePicker
        value={date}
        mode="date"
        display="default"
        onChange={handleDateChange}
        isVisible={showDatePicker}
      />
      <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
        style={{
          backgroundColor: "lightgray",
          padding: 10,
          width: "100%",
          height: "10%",
        }}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
        numberOfLines={4}
        style={{
          backgroundColor: "white",
          padding: 10,
          width: "100%",
          height: "20%",
        }}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

export default CreateCard;

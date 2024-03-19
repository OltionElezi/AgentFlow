import React, { useState, useEffect } from "react";
import { View, TextInput, Button, Image, StyleSheet, Text } from "react-native";
import * as ImagePicker from "expo-image-picker";

const CreateCardPrv = () => {
  const [image, setImage] = useState(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [location, setLocation] = useState("");
  const [calendar, setCalendar] = useState("");

  useEffect(() => {
    getPermissionAsync();
  }, []);

  const getPermissionAsync = async () => {
    const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
    if (status !== "granted") {
      alert("Sorry, we need camera roll permissions to make this work!");
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append("imageFile", {
        uri: image,
        type: "image/png", // Change to image/png for PNG images
        name: "image.png", // Change to .png extension
      });
      formData.append("title", title);
      formData.append("description", description);
      formData.append("location", location);
      formData.append("calendar", calendar);

      const uploadResponse = await fetch(
        "http://192.168.1.40:8000/card/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
            // Add any other headers here
          },
          body: formData,
        }
      );
      const data = await uploadResponse.json();
      console.log("Success:", data);
      // Handle success response
    } catch (error) {
      console.error("Error:", error);
      console.log("Response Text:", await error.response.text());
      // Handle error
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <Text>No image selected</Text>
        )}
        <Button title="Upload Image" onPress={pickImage} />
      </View>
      <TextInput
        style={styles.input}
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        style={styles.input}
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
        multiline
      />
      <TextInput
        style={styles.input}
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        style={styles.input}
        placeholder="Calendar"
        value={calendar}
        onChangeText={setCalendar}
      />
      <Button title="Register" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    padding: 10,
    marginBottom: 20,
  },
});

export default CreateCardPrv;

import React, { useRef, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  PanResponder,
  Animated,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
import Icon from "react-native-vector-icons/FontAwesome";
import { useNavigation } from "@react-navigation/native";

const CardProfile = ({ route }) => {
  const { item } = route.params;
  const windowHeight = Dimensions.get("window").height;
  const navigation = useNavigation();

  const pan = useRef(new Animated.ValueXY()).current;
  const isOpen = useRef(false);

  const [showFullDescription, setShowFullDescription] = useState(false);

  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (evt, gestureState) => {
      // Allow vertical movement only if the user is swiping and not clicking
      return (
        Math.abs(gestureState.moveX - gestureState.x0) > 5 ||
        Math.abs(gestureState.moveY - gestureState.y0) > 5 ||
        Math.abs(gestureState.moveX + gestureState.y0) < 5 ||
        Math.abs(gestureState.moveY + gestureState.y0) < 5
      );
    },

    onPanResponderMove: (evt, gestureState) => {
      if (!isOpen.current) {
        // Swiping up
        if (gestureState.dy < -20) {
          Animated.event([null, { dy: pan.y }], {
            useNativeDriver: false,
          })(evt, gestureState);
        }
        // Swiping down
        else if (gestureState.dy > 0 && gestureState.y0 < windowHeight * 0.4) {
          Animated.event([null, { dy: pan.y }], {
            useNativeDriver: false,
          })(evt, gestureState);
        }
      }
    },

    onPanResponderRelease: (e, gestureState) => {
      if (Math.abs(gestureState.dy) > 5) {
        // User scrolled
        if (gestureState.dy < -100) {
          // User swiped up, open title section to fullscreen
          isOpen.current = true;
          Animated.timing(pan, {
            toValue: { x: 0, y: -windowHeight },
            duration: 600,
            useNativeDriver: false,
          }).start();
        } else if (
          gestureState.dy > 100 &&
          isOpen.current &&
          gestureState.y0 < windowHeight * 0.4
        ) {
          // User swiped down, close title section to original height
          isOpen.current = false;
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 600,
            useNativeDriver: false,
          }).start();
          setShowFullDescription(false); // Close the full description
        } else if (
          gestureState.dy > 100 &&
          !isOpen.current &&
          gestureState.y0 < windowHeight * 0.4
        ) {
          // User swiped down, display "See more..."
          toggleDescription();
        }
      }
    },
  });

  const toggleDescription = () => {
    if (!isOpen.current) {
      isOpen.current = true;
      setShowFullDescription(true);
      Animated.timing(pan, {
        toValue: { x: 0, y: -windowHeight },
        duration: 600,
        useNativeDriver: false,
      }).start();
    } else {
      setShowFullDescription(showFullDescription);
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation.goBack()} // Navigate back to previous screen
        style={styles.backButton}
      >
        <View style={styles.backButtonCircle}>
          <AntDesign name="left" size={22} color="grey" />
        </View>
      </TouchableOpacity>
      <Image source={{ uri: item.image }} style={styles.image} />
      <Animated.View
        {...panResponder.panHandlers}
        style={[
          styles.titleSection,
          {
            height: pan.y.interpolate({
              inputRange: [-windowHeight, 0],
              outputRange: ["92%", "40%"],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.location}>
          <Icon name="map-marker" size={22} color="#5356FF" /> {item.location}
        </Text>
        {/* Show full description or truncated description */}
        {showFullDescription ? (
          <Text style={styles.description}>{item.description}</Text>
        ) : (
          <Text numberOfLines={2} style={styles.description}>
            {item.description}
          </Text>
        )}
        {/* See more button */}
        {!isOpen.current && !showFullDescription && (
          <TouchableOpacity onPress={toggleDescription}>
            <Text style={styles.seeMore}>See more...</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.calendar}>{item.calendar}</Text>
      </Animated.View>
      <View style={styles.buttonsContainer}>
        <View style={[styles.button, { backgroundColor: "tomato" }]}>
          <Text style={[styles.buttonText, { color: "#fff" }]}>DATE VIEW</Text>
        </View>
        <View style={[styles.button, { backgroundColor: "rgba(0, 0, 0, 0)" }]}>
          <Text style={[styles.buttonText, { color: "tomato" }]}>BOOK</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f8f8",
  },
  image: {
    width: "100%",
    height: "60%",
    resizeMode: "cover",
  },
  titleSection: {
    backgroundColor: "#f8f8f8",
    padding: 10,
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 80, // Adjust this value to make space for the buttons
    zIndex: 1,
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 50,
    marginBottom: 10,
  },
  location: {
    fontSize: 18,
    color: "gray",
    marginBottom: 10,
  },
  description: {
    fontSize: 16,
    marginBottom: 10,
  },
  seeMore: {
    color: "blue",
    textDecorationLine: "underline",
    marginBottom: 10,
  },
  calendar: {
    fontSize: 16,
    color: "gray",
  },
  buttonsContainer: {
    position: "absolute",
    zIndex: 2,
    bottom: 20,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "45%",
    height: 50,
    borderRadius: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    zIndex: 1,
  },
  backButtonCircle: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: "rgba(255, 255, 255, 0.5)",
    justifyContent: "center",
    alignItems: "center",
    padding: 2,
  },
});

export default CardProfile;

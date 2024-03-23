import React, { useState, useEffect, useRef, useContext } from "react";
import {
  View,
  TextInput,
  FlatList,
  Image,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  PanResponder,
  Dimensions,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome5 } from "@expo/vector-icons";
import { FontAwesome6 } from "@expo/vector-icons";
import { AntDesign } from "@expo/vector-icons";
import "react-native-get-random-values";
import { Badge } from "react-native-elements";

import { UserContext } from "../UserContextData";

const HomeScreenPrv = () => {
  const navigation = useNavigation();
  const { user } = useContext(UserContext);

  const [searchQuery, setSearchQuery] = useState("");
  const [data, setData] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notificationCount, setNotificationCount] = useState(2);
  const windowHeight = Dimensions.get("window").height;
  const [isFullOpen, setIsFullOpen] = useState(false);
  const pan = useRef(new Animated.ValueXY()).current;

  const isOpen = useRef(false);

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
        if (gestureState.dy < -2) {
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
          setIsFullOpen(true);
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
          gestureState.y0 < windowHeight * 0.2
        ) {
          // User swiped down, close title section to original height
          isOpen.current = false;
          Animated.timing(pan, {
            toValue: { x: 0, y: 0 },
            duration: 600,
            useNativeDriver: false,
          }).start();
        } else if (
          gestureState.dy > 100 &&
          !isOpen.current &&
          gestureState.y0 < windowHeight * 0.2
        ) {
          // User swiped down, display "See more..."
          toggleDescription();
        }
      }
    },
  });

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
      if (searchQuery.trim() === "") {
        // If search query is empty, fetch all cards
        fetchData();
      } else {
        const response = await fetch(
          `http://192.168.1.40:8000/card/search?query=${searchQuery}`
        );
        const data = await response.json();
        const updatedData = data.map((item) => ({
          ...item,
          image: `${item.image}`,
        }));
        setSearchResults(updatedData);
        setData(updatedData);
      }
    } catch (error) {
      console.error("Error searching:", error);
    }
  };

  const handleCardPress = (item) => {
    navigation.navigate("CardProfile", { item });
  };

  const renderCard = ({ item }) => (
    <TouchableOpacity style={styles.card} onPress={() => handleCardPress(item)}>
      <Image
        source={require("../api/files/home1.jpeg")}
        style={{ width: "100%", height: "90%", borderRadius: 10, marginTop: 5 }}
      />
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
          <TouchableOpacity
            style={styles.profileButton}
            onPress={() => navigation.navigate("EditProfile")}
          >
            <FontAwesome5 name={"user"} size={24} color={"#fff"} />
          </TouchableOpacity>
          <View style={styles.titleText}>
            <Text style={styles.titleHeader}>Hi, {user ? user.name : ""}</Text>

            <Text style={styles.paragraphHeader}>
              {user ? user.typeofUser : ""}
            </Text>
          </View>
        </View>

        <TouchableOpacity
          style={styles.notificationButton}
          onPress={() => navigation.navigate("Notification")}
        >
          {notificationCount > 1 && (
            <Badge
              value={notificationCount}
              status="error"
              containerStyle={styles.badge}
            />
          )}
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

          <TouchableOpacity
            style={styles.filterButton}
            onPress={() => navigation.navigate("Filter")}
          >
            <FontAwesome6
              name="sliders"
              size={18}
              color="#000"
              style={styles.filterIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      <Animated.View
        style={[
          styles.mainContainer,
          {
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            height: pan.y.interpolate({
              inputRange: [-windowHeight, 0],
              outputRange: ["100%", "75%"],
              extrapolate: "clamp",
            }),
          },
        ]}
      >
        <View style={styles.gripLine}></View>
        <View style={styles.gripLine}></View>
        <FlatList
          data={data}
          renderItem={renderCard}
          keyExtractor={(item) => item._id.toString()}
          horizontal={!isOpen.current} // Scroll horizontally when not 100% height
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
          {...panResponder.panHandlers} // Apply panResponder directly to FlatList
          style={{ height: isFullOpen ? "100%" : "80%" }}
        />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    padding: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 40,
    marginBottom: 10,
    paddingHorizontal: 10,
    height: "10%",
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
  badge: {
    position: "absolute",
    top: -5,
    right: -5,
  },
  searchContainer: {
    flexDirection: "row",
    height: "5%",
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

  gripLine: {
    height: 3,
    backgroundColor: "#000",
    marginVertical: 2,
    marginTop: 2,
    width: "20%",
    alignSelf: "center",
  },
  card: {
    width: 410,
    height: 600,
    flexDirection: "column",
    alignItems: "center",
    backgroundColor: "#fff",
  },
  // image: {
  //   width: "100%",
  //   height: 200,
  //   resizeMode: "cover",
  // },
  cardContent: {
    width: "100%",
    height: "10%",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5,
    textAlign: "left",
  },
  location: {
    fontSize: 14,
    textAlign: "left",
  },

  mainContainer: {
    height: "80%",
    width: "100%",
    padding: 10,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
  },
});

export default HomeScreenPrv;

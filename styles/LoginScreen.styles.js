// styles/LoginScreen.styles.js
import { StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get("window").width;

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollViewContent: {
    flexGrow: 1,
    marginBottom: 25,
    justifyContent: "space-between",
  },
  headerText: {
    color: "tomato",
    fontSize: 17,
    fontWeight: "600",
  },
  subheaderText: {
    fontSize: 17,
    fontWeight: "600",
    marginTop: 15,
  },
  labelText: {
    fontSize: 18,
    fontWeight: "600",
    color: "gray",
  },
  textInput: {
    fontSize: 18,
    borderColor: "gray",
    marginLeft: "auto",
    marginRight: "auto",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    width: 300,
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginLeft: "auto",
    marginRight: "auto",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    // marginVertical: 10,
    width: 300,
  },
  passwordInput: {
    fontSize: 18,
  },
  loginButton: {
    width: 250,
    backgroundColor: "tomato",
    marginTop: windowWidth < 400 ? 50 : 120,
    height: 50,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    marginTop: "auto",
    marginBottom: "auto",
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpTextContainer: {
    marginTop: 10,
  },
  signUpText: {
    textAlign: "center",
    color: "gray",
    fontSize: 16,
  },
  signUpLink: {
    textDecorationLine: "underline",
    color: "tomato",
  },
  logoContainer: {
    textAlign: "center",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
  },
  logo: {
    width: windowWidth < 400 ? 150 : 200,
    height: windowWidth < 400 ? 150 : 200,
    resizeMode: "contain",
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  rememberMeContainer: {
    flexDirection: "row",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    marginTop: 20,
  },
  rememberMeText: {
    fontSize: 18,
    marginLeft: 8,
  },
});

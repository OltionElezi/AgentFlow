// styles/LoginScreen.styles.js
import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    padding: 10,
    alignItems: "center",
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
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    width: 300,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 6,
    padding: 10,
    marginVertical: 10,
    width: 300,
  },
  passwordInput: {
    fontSize: 18,
    flex: 1,
    marginRight: 10,
  },
  passwordToggleIcon: {
    marginLeft: 10,
  },
  loginButton: {
    width: 200,
    backgroundColor: "tomato",
    padding: 15,
    marginTop: 100,
    borderRadius: 6,
    marginLeft: "auto",
    marginRight: "auto",
  },
  loginButtonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  signUpTextContainer: {
    marginTop: 15,
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
    width: 200,
    height: 200,
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
    alignItems: "center",
    marginTop: 20,
  },
  rememberMeText: {
    fontSize: 18,
    marginLeft: 8,
  },
});

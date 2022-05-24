import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import firebase from "firebase";
import { SignedInStack, SignedOutStack } from "./Navigation";

const AuthNavigation = () => {
  const [loggedIn, setLoggedIn] = React.useState(null);
  const userHandler = (user) => (user ? setLoggedIn(user) : setLoggedIn(null));

  React.useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged((user) => userHandler(user));
    return unsubscribe;
  }, []);
  return <>{loggedIn ? <SignedInStack /> : <SignedOutStack />}</>;
};

export default AuthNavigation;

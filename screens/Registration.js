import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  TextInput,
} from "react-native";
import * as Yup from "yup";
import { validate } from "email-validator";
import firebase from "../firebase";
const Registration = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View>
        <Image
          source={require("../assets/header-logo.png")}
          style={{ width: 200, height: 70, alignSelf: "center" }}
        />
        <Forms navigation={navigation} />
        <TouchableOpacity onPress={() => navigation.navigate("LoginScreen")}>
          <Text style={{ color: "white", alignSelf: "center", marginTop: 50 }}>
            Already have an account?{" "}
            <Text style={{ color: "#0095F6", fontWeight: "800" }}>Log in!</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Forms = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    email: Yup.string().email().label("Email"),
    username: Yup.string().required().min(4),
    password: Yup.string().min(4).label("Password"),
  });

  const handleSignUp = async (email, password, username) => {
    try {
      const authUser = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);
      const db = firebase.firestore();
      db.collection("users").add({
        email: email,
        owner_id: authUser.user.uid,
        username: username,
        profile_picture:
          "https://storage.googleapis.com/ares-profile-pictures/hd/no__strings-143f671b112b152e6b012e1acf45a1b7_hd.jpg",
      });
      console.log("database added");
      Alert.alert("", "Account created!", [
        {
          text: "cool",
        },
      ]);
    } catch (error) {
      alert(error);
    }
  };
  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validationSchema={validationSchema}
      onSubmit={(values) =>
        handleSignUp(values.email, values.password, values.username)
      }
      validateOnMount={true}
    >
      {({
        handleChange,
        handleSubmit,
        values,
        errors,
        isValid,
        handleBlur,
      }) => (
        <View style={{ width: "100%" }}>
          <TextInput
            name="email"
            placeholder="Email"
            placeholderTextColor="grey"
            onChangeText={handleChange("email")}
            onBlur={handleBlur("email")}
            value={values.email}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            style={[
              styles.inputField,
              {
                borderColor:
                  values.email.length < 1 || validate(values.email)
                    ? null
                    : "red",
              },
            ]}
          />
          <TextInput
            name="username"
            placeholder="Username"
            placeholderTextColor="grey"
            onChangeText={handleChange("username")}
            onBlur={handleBlur("username")}
            value={values.username}
            returnKeyType="next"
            autoCorrect={false}
            autoCapitalize="none"
            style={[
              styles.inputField,
              {
                borderColor:
                  values.username.length > 4 || values.username.length < 1
                    ? null
                    : "red",
              },
            ]}
          />
          <TextInput
            name="password"
            placeholder="Password"
            placeholderTextColor="grey"
            onChangeText={handleChange("password")}
            onBlur={handleBlur("password")}
            value={values.password}
            returnKeyType="go"
            autoCorrect={false}
            autoCapitalize="none"
            secureTextEntry={true}
            style={[
              styles.inputField,
              {
                borderColor:
                  values.password.length > 6 || values.password.length < 1
                    ? null
                    : "red",
              },
            ]}
          />
          <TouchableOpacity
            style={styles.submitButton(isValid)}
            onPress={handleSubmit}
          >
            <Text style={{ color: "white", fontWeight: "700" }}>Sign up</Text>
          </TouchableOpacity>
        </View>
      )}
    </Formik>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
    justifyContent: "center",
  },
  inputField: {
    backgroundColor: "#242524",
    marginTop: 20,
    paddingVertical: 18,
    marginHorizontal: 20,
    paddingLeft: 20,
    borderRadius: 8,
    borderWidth: 1,
    color: "white",
  },
  submitButton: (isValid) => ({
    width: 350,
    alignItems: "center",
    alignSelf: "center",
    justifyContent: "center",
    backgroundColor: isValid ? "#0095F6" : "#9ACAF7",
    marginTop: 30,
    height: 40,
    borderRadius: 8,
  }),
});
export default Registration;

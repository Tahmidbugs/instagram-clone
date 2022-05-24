import { Formik } from "formik";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
} from "react-native";
import * as Yup from "yup";
import { validate } from "email-validator";
const LoginScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={{}}>
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
    username: Yup.string().required().min(2),
    password: Yup.string().min(4).label("Password"),
  });

  return (
    <Formik
      initialValues={{ email: "", password: "", username: "" }}
      validationSchema={validationSchema}
      onSubmit={() => navigation.navigate("Home")}
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
            style={{
              backgroundColor: "#242524",
              marginTop: 30,
              paddingVertical: 20,
              marginHorizontal: 20,
              paddingLeft: 20,
              borderRadius: 8,
              borderWidth: 1,
              borderColor:
                values.email.length < 1 || validate(values.email)
                  ? null
                  : "red",
              color: "white",
            }}
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
            style={{
              backgroundColor: "#242524",
              marginTop: 20,
              paddingVertical: 20,
              marginHorizontal: 20,
              paddingLeft: 20,
              borderRadius: 8,

              color: "white",
            }}
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
            style={{
              backgroundColor: "#242524",
              marginTop: 20,
              paddingVertical: 20,
              marginHorizontal: 20,
              paddingLeft: 20,
              color: "white",
              borderRadius: 8,
              borderWidth: 1,
              borderColor:
                values.password.length > 6 || values.password.length < 1
                  ? null
                  : "red",
            }}
          />
          <TouchableOpacity
            style={{
              width: 350,
              alignItems: "center",
              alignSelf: "center",
              justifyContent: "center",
              backgroundColor: "#0095F6",
              marginTop: 30,
              height: 40,
              borderRadius: 8,
            }}
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
});
export default LoginScreen;

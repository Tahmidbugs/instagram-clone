import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  TextInput,
  Button,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import firebase from "../firebase";
import { Formik } from "formik";
import * as Yup from "yup";
import { useNavigation } from "@react-navigation/native";
const EditProfile = ({ navigation, route }) => {
  const [thumbnail, setThumbnail] = React.useState(route.params);

  const selectImage = async () => {
    try {
      const result = await ImagePicker.launchImageLibraryAsync();
      if (!result.cancelled) {
        const blob = await new Promise((resolve, reject) => {
          const xhr = new XMLHttpRequest();
          xhr.onload = function () {
            resolve(xhr.response);
          };
          xhr.onerror = function (e) {
            reject(new TypeError("Network request failed"));
          };
          xhr.responseType = "blob";
          xhr.open("GET", result.uri, true);
          xhr.send(null);
        });
        const metadata = { contentType: "image/jpg" };
        const current = new Date().toLocaleTimeString();
        const postedby = firebase.auth().currentUser.email;
        const imgRef = firebase
          .storage()
          .ref()
          .child(`${postedby}at${current}`);

        await imgRef.put(blob, metadata);

        // We're done with the blob, close and release it
        blob.close();

        // Image permanent URL

        const imageURL = await imgRef.getDownloadURL();
        setThumbnail(imageURL);
      }
    } catch (error) {
      console.log("error reading image", error);
    }
  };

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Header navigation={navigation} />
      <SetProfilePic thumbnail={thumbnail} onChangeProfile={selectImage} />
      <SetUserCredentials thumbnail={thumbnail} navigation={navigation} />
    </View>
  );
};
const UploadCredentialsToFirebase = async (
  thumbnail,
  name,
  bio,
  navigation
) => {
  const db = firebase.firestore();
  db.collection("users")
    .doc(firebase.auth().currentUser.email)
    .update({ profile_picture: thumbnail, name: name, bio: bio })
    .then(navigation.navigate("ProfileScreen"));
};
const SetUserCredentials = ({ thumbnail, navigation }) => (
  <View style={{ marginTop: 20 }}>
    <Formik
      initialValues={{ name: "", bio: "" }}
      onSubmit={(values) => {
        UploadCredentialsToFirebase(
          thumbnail,
          values.name,
          values.bio,
          navigation
        );
      }}
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
        <>
          <View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 20,
                borderColor: "#222525",
                borderTopWidth: 1,
                borderBottomWidth: 1,
                height: 60,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: 40,
                  marginLeft: 10,
                }}
              >
                Name
              </Text>
              <TextInput
                name="name"
                placeholder="Enter your full name"
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={"grey"}
                style={{
                  color: "white",
                  fontSize: 20,
                }}
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
                returnKeyType="default"
              />
            </View>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginBottom: 50,
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  marginRight: 60,
                  marginLeft: 10,
                }}
              >
                Bio
              </Text>
              <TextInput
                name="bio"
                placeholder="Enter a bio of your choice"
                autoCorrect={false}
                autoCapitalize="none"
                placeholderTextColor={"grey"}
                style={{
                  color: "white",
                  fontSize: 20,
                }}
                onChangeText={handleChange("bio")}
                onBlur={handleBlur("bio")}
                value={values.bio}
              />
            </View>
          </View>

          <Button title="Save" disabled={!isValid} onPress={handleSubmit} />
        </>
      )}
    </Formik>
  </View>
);
const SetProfilePic = ({ thumbnail, onChangeProfile }) => (
  <View
    style={{ marginTop: 50, alignItems: "center", justifyContent: "center" }}
  >
    <Image
      source={{
        uri: thumbnail,
      }}
      style={{
        height: 100,
        width: 100,
        borderRadius: 50,
        borderColor: "grey",
        borderWidth: 1,
      }}
    />
    <TouchableOpacity onPress={onChangeProfile}>
      <Text style={{ color: "blue", marginTop: 30 }}>
        Change profile Picture
      </Text>
    </TouchableOpacity>
  </View>
);
const Header = ({ navigation }) => {
  return (
    <View style={styles.headerContainer}>
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={{
            uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png",
          }}
          style={styles.backButton}
        />
      </TouchableOpacity>
      <Text style={styles.headerText}>Edit your profile</Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 50,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
  },
});

export default EditProfile;

import React from "react";
import { View, Text, Image, Button, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import SharingOptions from "./SharingOptions";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../firebase";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as ImagePicker from "expo-image-picker";

const AppForm = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    caption: Yup.string().max(
      2000,
      "Caption must not be over 2000 characters!"
    ),
  });

  const [thumbnail, setThumbnail] = React.useState(null);

  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);

  const getUserName = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();
    const unsubscribe = db
      .collection("users")
      .where("owner_uid", "==", user.uid)
      .limit(1)
      .onSnapshot((snapshot) => {
        snapshot.docs.map((doc) => {
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        });
      });

    return unsubscribe;
  };

  React.useEffect(getUserName, []);

  const UploadPostToFirebase = async (imageURL, caption) => {
    const db = firebase.firestore();
    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .add({
        imageURL: imageURL,
        user: currentLoggedInUser.username,
        profilepic: currentLoggedInUser.profilePicture,
        owner_uid: firebase.auth().currentUser.uid,
        owner_email: firebase.auth().currentUser.email,
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes_by_users: [],
        comments: [],
      })
      .then(navigation.goBack());
  };

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
    <View>
      <Formik
        initialValues={{ caption: "" }}
        onSubmit={(values) => {
          UploadPostToFirebase(thumbnail, values.caption);
        }}
        validationSchema={validationSchema}
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
            <View
              style={{
                flexDirection: "row",
                margin: 30,
              }}
            >
              <TouchableOpacity onPress={selectImage}>
                {!thumbnail ? (
                  <Image
                    source={{
                      uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL02vlAAqK0Yg64rtLyh4wRoVws7KlWF2eoDVa6Zu-o653gFuZJjMIVc-L4tH57d2pck&usqp=CAU",
                    }}
                    style={{ height: 100, width: 100 }}
                  />
                ) : (
                  <Image
                    source={{ uri: thumbnail }}
                    style={{ height: 100, width: 100 }}
                  />
                )}
              </TouchableOpacity>
              <View style={{ flex: 1, marginLeft: 20 }}>
                <TextInput
                  name="caption"
                  placeholder="Add a caption"
                  autoCorrect={false}
                  autoCapitalize="none"
                  multiline={true}
                  placeholderTextColor={"grey"}
                  style={{
                    color: "white",
                    marginTop: 10,
                    fontSize: 20,
                  }}
                  onChangeText={handleChange("caption")}
                  onBlur={handleBlur("caption")}
                  value={values.caption}
                  returnKeyType="done"
                />
              </View>
            </View>
            <SharingOptions />
            <Button title="Share" disabled={!isValid} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AppForm;

import React from "react";
import { View, Text, Image, Button, TextInput } from "react-native";
import { Formik } from "formik";
import * as Yup from "yup";
import SharingOptions from "./SharingOptions";
import { useNavigation } from "@react-navigation/native";
import firebase from "../../firebase";

const AppForm = ({ navigation }) => {
  const validationSchema = Yup.object().shape({
    image: Yup.string().url().required("Must upload a URL"),
    caption: Yup.string().max(
      2000,
      "Caption must not be over 2000 characters!"
    ),
  });

  const [thumbnail, setThumbnail] = React.useState(
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRtL02vlAAqK0Yg64rtLyh4wRoVws7KlWF2eoDVa6Zu-o653gFuZJjMIVc-L4tH57d2pck&usqp=CAU"
  );

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
          console.log("snapshotted forms");
          setCurrentLoggedInUser({
            username: doc.data().username,
            profilePicture: doc.data().profile_picture,
          });
        });
      });
    console.log("user logged in:", currentLoggedInUser);

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
        caption: caption,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        likes: 0,
        likes_by_users: [],
        comments: [],
      })
      .then(navigation.goBack());
  };

  return (
    <View>
      <Formik
        initialValues={{ image: "", caption: "" }}
        onSubmit={(values) => {
          UploadPostToFirebase(values.image, values.caption);
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
              <Image
                source={{ uri: thumbnail }}
                style={{ height: 100, width: 100 }}
              />
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
                />
              </View>
            </View>
            <TextInput
              name="image"
              autoCorrect={false}
              autoCapitalize="none"
              placeholder="Enter Image URL"
              placeholderTextColor={"grey"}
              style={{
                height: 50,
                color: "white",
                marginTop: 20,
                borderTopColor: "grey",
                borderTopWidth: 2,
                paddingTop: 20,
              }}
              onChangeText={handleChange("image")}
              onBlur={handleBlur("image")}
              value={values.image}
              onChange={(event) => setThumbnail(event.nativeEvent.text)}
              returnKeyType="done"
            />
            {errors.image && (
              <Text style={{ fontSize: 10, color: "red" }}>{errors.image}</Text>
            )}
            <SharingOptions />
            <Button title="Share" disabled={!isValid} onPress={handleSubmit} />
          </>
        )}
      </Formik>
    </View>
  );
};

export default AppForm;

import React from "react";
import { SafeAreaView } from "react-native";
import firebase from "../firebase";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileBioandEdit from "../components/Profile/ProfileBioandEdit";

import { useNavigation } from "@react-navigation/native";
const ProfileScreen = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);
  const navigation = useNavigation();
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
            name: doc.data().name,
            bio: doc.data().bio,
          });
        });
      });

    return unsubscribe;
  };
  const [Posts, setPosts] = React.useState([]);
  const viewPosts = () => {
    const user = firebase.auth().currentUser;
    const db = firebase.firestore();

    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .collection("posts")
      .orderBy("createdAt", "desc")
      .onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
  };
  React.useEffect(() => {
    getUserName();
    viewPosts();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      {currentLoggedInUser && (
        <>
          <ProfileHeader username={currentLoggedInUser.username} />
          <ProfileStats profilePicture={currentLoggedInUser.profilePicture} />
          <ProfileBioandEdit
            name={currentLoggedInUser.name}
            bio={currentLoggedInUser.bio}
          />
          <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
            {Posts.map((post, index) => (
              <View style={{ flexDirection: "row" }} key={index}>
                <TouchableOpacity
                  onPress={() => navigation.navigate("ViewPost", post)}
                >
                  <Image
                    source={{ uri: post.imageURL }}
                    style={{
                      height: 130,
                      width: 130,
                      borderWidth: 1,
                      borderColor: "black",
                    }}
                  />
                </TouchableOpacity>
              </View>
            ))}
          </View>
        </>
      )}
    </SafeAreaView>
  );
};

export default ProfileScreen;

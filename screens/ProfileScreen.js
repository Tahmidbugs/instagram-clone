import React from "react";
import { SafeAreaView } from "react-native";
import firebase from "../firebase";
import {
  View,
  Image,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TouchableWithoutFeedback,
  Modal,
} from "react-native";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileBioandEdit from "../components/Profile/ProfileBioandEdit";
import { useNavigation } from "@react-navigation/native";
import BottomTab from "../components/home/BottomTab";

const ProfileScreen = () => {
  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);
  const [modalVisible, setModalVisible] = React.useState(false);
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

  const handleModalVisibility = () => {
    setModalVisible(!modalVisible);
  };

  console.log("Modal visibility: ", modalVisible);

  const handleSignOut = async () => {
    try {
      await firebase.auth().signOut().then();
      console.log("signedout");
    } catch {
      console.log(error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      {currentLoggedInUser && (
        <ScrollView style={{ flex: 1 }}>
          <ProfileHeader
            username={currentLoggedInUser.username}
            handleModalVisibility={handleModalVisibility}
          />
          <Modal visible={modalVisible} animationType="fade" transparent={true}>
            <ModalContent
              handleSignOut={handleSignOut}
              handleModalVisibility={handleModalVisibility}
            />
          </Modal>
          <ProfileStats profilePicture={currentLoggedInUser.profilePicture} />
          <ProfileBioandEdit
            name={currentLoggedInUser.name}
            bio={currentLoggedInUser.bio}
            sendPicture={currentLoggedInUser.profilePicture}
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
        </ScrollView>
      )}
      <View style={{ position: "absolute", bottom: 2 }}>
        <BottomTab />
      </View>
    </SafeAreaView>
  );
};

const ModalContent = ({ handleSignOut, handleModalVisibility }) => (
  <TouchableWithoutFeedback onPressOut={handleModalVisibility}>
    <View style={styles.ModalContainer}>
      <TouchableOpacity onPress={handleSignOut}>
        <View style={styles.ContainBox}>
          <Text style={styles.RestaurantTitle}>Signout</Text>
        </View>
      </TouchableOpacity>
    </View>
  </TouchableWithoutFeedback>
);

const styles = StyleSheet.create({
  ModalContainer: {
    flex: 1,
    justifyContent: "flex",
    backgroundColor: "#rgba(0,0,0,0.8)",
  },
  ContainBox: {
    backgroundColor: "black",
    opacity: 0.8,
    borderColor: "grey",
    borderWidth: 2,
    padding: 16,
    height: 50,
    width: 200,
    borderWidth: 1,
    marginTop: 100,
    marginLeft: 15,
    borderRadius: 20,
  },
  RestaurantTitle: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    color: "white",
  },
});

export default ProfileScreen;

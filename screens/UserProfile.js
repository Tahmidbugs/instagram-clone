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
} from "react-native";
import {
  Ionicons,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";
import ProfileHeader from "../components/Profile/ProfileHeader";
import ProfileStats from "../components/Profile/ProfileStats";
import ProfileBioandEdit from "../components/Profile/ProfileBioandEdit";
import BottomTab from "../components/home/BottomTab";
import { useNavigation } from "@react-navigation/native";

const UserProfile = ({ route, navigation }) => {
  const [userCredentials, setUserCredentials] = React.useState(null);
  const [following, setFollowing] = React.useState(false);
  const [postCount, setPostCount] = React.useState(0);
  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);

  console.log("The owner of this post is:", route.params);

  const [Posts, setPosts] = React.useState([]);

  const fetchUser = async () => {
    const db = firebase.firestore();

    db.collection("users")
      .doc(route.params)
      .onSnapshot((doc) => {
        setUserCredentials({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
          name: doc.data().name,
          bio: doc.data().bio,
          followers: doc.data().followers,
          following: doc.data().following,
        });
      });

    db.collection("users")
      .doc(route.params)
      .collection("posts")
      .get()
      .then((snap) => {
        setPostCount(snap.size);
      });

    db.collection("users")
      .doc(firebase.auth().currentUser.email)
      .onSnapshot((doc) => {
        setCurrentLoggedInUser({
          username: doc.data().username,
          profilePicture: doc.data().profile_picture,
          name: doc.data().name,
          bio: doc.data().bio,
          followers: doc.data().followers,
          following: doc.data().following,
        });
      });
  };

  const fetchPosts = () => {
    let mounted = true;
    const db = firebase.firestore();
    if (mounted) {
      db.collection("users")
        .doc(route.params)
        .collection("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
    }
    return () => (mounted = false);
  };
  React.useEffect(() => {
    fetchUser();
    fetchPosts();
  }, []);

  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      {userCredentials && currentLoggedInUser && (
        <ScrollView style={{ flex: 1 }}>
          <Header username={userCredentials.username} />

          <ProfileStats
            profilePicture={userCredentials.profilePicture}
            postCount={postCount}
            followers={userCredentials.followers}
            following={userCredentials.following}
          />
          <UserProfileBioandEdit
            name={userCredentials.name}
            bio={userCredentials.bio}
            sendPicture={userCredentials.profilePicture}
            email={route.params}
            followers={userCredentials.followers}
            setFollowing={setFollowing}
            currentfollowing={currentLoggedInUser.following}
            following={following}
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
                      height: 135,
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

const Header = ({ username }) => {
  const navigation = useNavigation();
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
      <Text style={styles.headerText}>{username}</Text>
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
    marginTop: 10,
  },
  backButton: {
    width: 30,
    height: 30,
  },
  headerText: {
    color: "white",
    fontWeight: "700",
    fontSize: 20,
    marginRight: 27.5,
  },
});
const UserProfileBioandEdit = ({
  name,
  bio,
  sendPicture,
  email,
  followers,
  setFollowing,
  following,
  currentfollowing,
}) => {
  const navigation = useNavigation();

  const handleFollowing = () => {
    const db = firebase.firestore();
    firebase
      .firestore()
      .collection("users")
      .doc(firebase.auth().currentUser.email)
      .update({
        following: currentfollowing + 1,
      });
    console.log(firebase.auth().currentUser.email, "following updated");
  };
  return (
    <View>
      <View style={{ marginTop: 15, marginLeft: 10, marginBottom: 30 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "700",
            fontSize: 15,
            marginBottom: 2,
          }}
        >
          {name}
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "500",
            fontSize: 15,
            marginBottom: 2,
          }}
        >
          {bio}
        </Text>
      </View>
      <View style={{ flexDirection: "row" }}>
        <TouchableOpacity
          style={{
            backgroundColor: following ? "#0098FD" : "black",
            height: 32,
            width: 150,
            marginLeft: 10,
            marginRight: 7,
            borderWidth: 1,
            borderColor: "#222525",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
          onPress={() => {
            setFollowing(!following ? true : false);
            firebase
              .firestore()
              .collection("users")
              .doc(email)
              .update({
                followers: followers + 1,
              });
            handleFollowing();
          }}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            {following ? "Following" : "Follow"}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            height: 32,
            width: 150,
            marginLeft: 10,
            marginRight: 7,
            borderWidth: 1,
            borderColor: "#222525",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("InProgress")}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Message
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            color: "black",
            height: 32,
            width: 35,

            borderWidth: 1,
            borderColor: "#222525",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 6,
          }}
        >
          <Ionicons name="md-person-add" size={18} color="white" />
        </TouchableOpacity>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomColor: "#222525",
          borderBottomWidth: 1,
          marginTop: 40,
        }}
      >
        <TouchableOpacity style={{ marginLeft: 100 }}>
          <MaterialCommunityIcons
            name="grid"
            size={20}
            color="white"
            style={{ marginRight: 150 }}
          />
        </TouchableOpacity>
        <FontAwesome5 name="user-tag" size={17} color="grey" />
      </View>
    </View>
  );
};

export default UserProfile;

import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  RefreshControl,
} from "react-native";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import BottomTab from "../components/home/BottomTab";
import firebase from "../firebase";

const wait = (timeout) => {
  return new Promise((resolve) => setTimeout(resolve, timeout));
};
const Home = () => {
  const [Posts, setPosts] = React.useState([]);
  const [currentLoggedInUser, setCurrentLoggedInUser] = React.useState(null);
  React.useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    if (mounted) {
      db.collectionGroup("posts")
        .orderBy("createdAt", "desc")
        .onSnapshot((snapshot) => {
          setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
        });
    }
    const user = firebase.auth().currentUser;
    db.collection("users")
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

    return () => (mounted = false);
  }, []);
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    wait(2000).then(() => setRefreshing(false));
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      {currentLoggedInUser && (
        <>
          <Header />
          <ScrollView
            contentContainerStyle={styles.scrollView}
            refreshControl={
              <RefreshControl
                refreshing={refreshing}
                onRefresh={onRefresh}
                tintColor="white"
              />
            }
          >
            <Stories
              profilePicture={currentLoggedInUser.profilePicture}
              username={currentLoggedInUser.username}
            />
            {Posts.map((post, index) => (
              <Post key={index} post={post} />
            ))}
          </ScrollView>
          <BottomTab profilePicture={currentLoggedInUser.profilePicture} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

export default Home;

import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import BottomTab from "../components/home/BottomTab";
import firebase from "../firebase";
const Home = () => {
  const [Posts, setPosts] = React.useState([]);

  React.useEffect(() => {
    let mounted = true;
    const db = firebase.firestore();
    if (mounted) {
      db.collectionGroup("posts").onSnapshot((snapshot) => {
        setPosts(snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() })));
      });
    }

    return () => (mounted = false);
  }, []);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Header />
      <ScrollView>
        <Stories />
        {Posts.map((post, index) => (
          <Post key={index} post={post} />
        ))}
      </ScrollView>
      <BottomTab />
    </View>
  );
};

export default Home;

import React from "react";
import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
import Header from "../components/home/Header";
import Post from "../components/home/Post";
import Stories from "../components/home/Stories";
import BottomTab from "../components/home/BottomTab";
import Posts from "../data/Posts";
const Home = () => {
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

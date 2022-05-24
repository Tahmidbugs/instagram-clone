import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import UploadPost from "../components/Post/UploadPost";

const PostScreen = () => {
  return (
    <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
      <UploadPost />
    </SafeAreaView>
  );
};

export default PostScreen;

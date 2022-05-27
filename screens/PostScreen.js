import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import BottomTab from "../components/home/BottomTab";
import UploadPost from "../components/Post/UploadPost";

const PostScreen = ({ navigation }) => {
  return (
    <>
      <SafeAreaView style={{ backgroundColor: "black", flex: 1 }}>
        <UploadPost navigation={navigation} />
      </SafeAreaView>
      <View style={{ position: "absolute", bottom: 2 }}>
        <BottomTab />
      </View>
    </>
  );
};

export default PostScreen;

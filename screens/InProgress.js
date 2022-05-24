import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";

const PostScreen = () => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: "black",
        justifyContent: "center",
        alignItems: "center",
        flex: 1,
      }}
    >
      <Image
        source={{
          uri: "https://communityofhopepdx.org/wp-content/uploads/2018/11/under-construction.gif",
        }}
        style={{ width: 300, height: 300 }}
      />
    </SafeAreaView>
  );
};

export default PostScreen;

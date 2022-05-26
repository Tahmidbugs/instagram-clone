import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import Post from "../components/home/Post";

const ViewPost = ({ route }) => {
  console.log(route.params);
  return (
    <View style={{ flex: 1, backgroundColor: "black" }}>
      <Header username={route.params.user} />
      <Post post={route.params} />
    </View>
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
    marginTop: 50,
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

export default ViewPost;

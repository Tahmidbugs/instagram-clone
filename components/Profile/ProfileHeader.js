import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";

import {
  Ionicons,
  AntDesign,
  Feather,
  MaterialCommunityIcons,
  FontAwesome5,
} from "@expo/vector-icons";

const ProfileHeader = ({ username, handleModalVisibility }) => {
  console.log(username);
  return (
    <View
      style={{
        flexDirection: "row",
        alignItems: "center",
        marginTop: 20,
        marginLeft: 10,
      }}
    >
      <Feather name="lock" size={15} color="white" />
      <TouchableOpacity
        style={{ marginHorizontal: 5 }}
        onPress={handleModalVisibility}
      >
        <Text style={{ color: "white", fontSize: 24, fontWeight: "800" }}>
          {username}
        </Text>
      </TouchableOpacity>
      <AntDesign
        name="down"
        size={15}
        color="white"
        style={{ marginRight: "auto" }}
      />
      <TouchableOpacity onPress={() => navigation.navigate("PostScreen")}>
        <Image
          source={{
            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
          }}
          style={{
            width: 30,
            height: 30,
            marginLeft: 10,
            resizeMode: "contain",
          }}
        />
      </TouchableOpacity>
      <Ionicons
        name="menu-sharp"
        size={24}
        color="white"
        style={{ marginHorizontal: 20 }}
      />
    </View>
  );
};

export default ProfileHeader;

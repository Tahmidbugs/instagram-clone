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
const ProfileStats = ({ profilePicture }) => (
  <View style={{ marginTop: 20 }}>
    <View style={{ flexDirection: "row", alignItems: "center" }}>
      <Image
        source={{ uri: profilePicture }}
        style={{
          width: 100,
          height: 100,
          borderRadius: 50,
          borderWidth: 2,
          borderColor: "grey",
          marginRight: 50,
          marginLeft: 10,
        }}
      />
      <View style={{ marginRight: 30, alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
          0
        </Text>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
          Posts
        </Text>
      </View>
      <View style={{ marginRight: 30, alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
          0
        </Text>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 13 }}>
          Followers
        </Text>
      </View>
      <View style={{ marginRight: 30, alignItems: "center" }}>
        <Text style={{ color: "white", fontWeight: "700", fontSize: 18 }}>
          0
        </Text>
        <Text style={{ color: "white", fontWeight: "500", fontSize: 15 }}>
          Following
        </Text>
      </View>
    </View>
  </View>
);

export default ProfileStats;

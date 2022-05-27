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
import firebase from "../../firebase";
import { useNavigation } from "@react-navigation/native";
const ProfileBioandEdit = ({ name, bio, sendPicture }) => {
  const navigation = useNavigation();
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
            color: "black",
            height: 32,
            width: 320,
            marginLeft: 10,
            marginRight: 7,
            borderWidth: 1,
            borderColor: "#222525",
            alignItems: "center",
            justifyContent: "center",
            borderRadius: 5,
          }}
          onPress={() => navigation.navigate("EditProfile", sendPicture)}
        >
          <Text
            style={{
              color: "white",
              fontWeight: "600",
              fontSize: 16,
            }}
          >
            Edit Profile
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
      <View style={{ marginTop: 15, marginLeft: 10 }}>
        <Text
          style={{
            color: "white",
            fontWeight: "600",
            fontSize: 14,
            marginBottom: 2,
          }}
        >
          Story Highlights
        </Text>
        <Text
          style={{
            color: "white",
            fontWeight: "400",
            fontSize: 13,
            marginBottom: 2,
          }}
        >
          Keep your favorite stories on your profile
        </Text>
      </View>
      <View style={{ marginTop: 10, marginBottom: 13 }}>
        <ScrollView
          style={{ flexDirection: "row", marginHorizontal: 10 }}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          <View
            style={{
              justifyContent: "center",
              marginRight: 20,
              alignItems: "center",
            }}
          >
            <TouchableOpacity
              style={{
                height: 60,
                width: 60,
                borderRadius: 30,
                alignItems: "center",
                justifyContent: "center",
                borderColor: "#222525",
                borderWidth: 1,
              }}
            >
              <AntDesign name="plus" size={20} color="white" />
            </TouchableOpacity>
            <Text
              style={{
                color: "white",
                fontWeight: "400",
                fontSize: 13,
                marginTop: 3,
              }}
            >
              New
            </Text>
          </View>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#222525",
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
            ></TouchableOpacity>
          </View>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#222525",
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
            ></TouchableOpacity>
          </View>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#222525",
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
            ></TouchableOpacity>
          </View>
          <View style={{ marginRight: 20 }}>
            <TouchableOpacity
              style={{
                backgroundColor: "#222525",
                height: 60,
                width: 60,
                borderRadius: 30,
              }}
            ></TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      <View
        style={{
          flexDirection: "row",
          paddingBottom: 10,
          borderBottomColor: "#222525",
          borderBottomWidth: 1,
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

export default ProfileBioandEdit;

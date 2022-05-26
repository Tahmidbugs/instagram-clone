import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";
const SharingOptions = () => {
  return (
    <>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: "grey",
          borderTopWidth: 0.5,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: "grey",
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          Tag People
        </Text>
        <AntDesign name="right" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: "grey",
          borderTopWidth: 0.5,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: "grey",
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          Add location
        </Text>
        <AntDesign name="right" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: "grey",
          borderTopWidth: 0.5,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: "grey",
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          Add fundraiser
        </Text>
        <AntDesign name="right" size={24} color="grey" />
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          borderTopColor: "grey",
          borderTopWidth: 0.5,
          paddingVertical: 15,
        }}
      >
        <Text
          style={{
            color: "grey",
            fontWeight: "500",
            fontSize: 16,
            marginLeft: 10,
          }}
        >
          Share on Facebook
        </Text>
        <AntDesign name="right" size={24} color="grey" />
      </TouchableOpacity>
    </>
  );
};

export default SharingOptions;

import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Users from "../../data/Users";
import { AntDesign } from "@expo/vector-icons";
const Stories = ({ profilePicture, username }) => {
  console.log("username is:", username);
  console.log("profilepic is:", profilePicture);
  return (
    <View style={{ marginTop: 5, marginBottom: 13 }}>
      <ScrollView
        style={{ flexDirection: "row", marginHorizontal: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <View style={{ alignItems: "center", paddingHorizontal: 6 }}>
          <TouchableOpacity>
            <Image
              source={{ uri: profilePicture }}
              style={[styles.profile, { borderWidth: 0 }]}
            />
            <TouchableOpacity
              style={{
                backgroundColor: "#1BA0F6",
                height: 28,
                width: 28,
                borderRadius: 15,
                position: "absolute",
                right: 5,
                bottom: 4,
                borderWidth: 3,
                borderColor: "black",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AntDesign name="plus" size={15} color="white" />
            </TouchableOpacity>
          </TouchableOpacity>
          <Text style={styles.username}>
            {username.length > 11 ? username.slice(0, 11) + ".." : username}
          </Text>
        </View>
        <>
          {Users.map((user, index) => (
            <View
              key={index}
              style={{ alignItems: "center", paddingHorizontal: 6 }}
            >
              <TouchableOpacity>
                <Image source={user.image} style={styles.profile} />
              </TouchableOpacity>
              <Text style={styles.username}>
                {user.username.length > 11
                  ? user.username.slice(0, 10) + ".."
                  : user.username}
              </Text>
            </View>
          ))}
        </>
      </ScrollView>
    </View>
  );
};
const styles = StyleSheet.create({
  profile: {
    width: 70,
    height: 70,
    borderRadius: 35,
    borderWidth: 3,
    borderColor: "#FF4F25",
    marginBottom: 3,
  },
  username: {
    color: "white",
    alignSelf: "center",
    fontSize: 13,
    fontWeight: "500",
  },
});
export default Stories;

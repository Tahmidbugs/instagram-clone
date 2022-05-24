import React from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Users from "../../data/Users";
const Stories = () => {
  return (
    <View style={{ marginTop: 5, marginBottom: 13 }}>
      <ScrollView
        style={{ flexDirection: "row", marginHorizontal: 10 }}
        horizontal
        showsHorizontalScrollIndicator={false}
      >
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

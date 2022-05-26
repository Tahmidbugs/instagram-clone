import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const BottomTab = ({ profilePicture }) => {
  const [activeTab, setActiveTab] = React.useState("Home");
  const navigation = useNavigation();
  console.log("Profile sent: ", profilePicture);
  return (
    <View style={{ color: "black", margin: 20, flexDirection: "row" }}>
      {bottomTabIcons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            navigation.navigate("InProgress");
          }}
        >
          <Image
            source={{
              uri: activeTab === icon.name ? icon.active : icon.inactive,
            }}
            style={[
              styles.Icon,
              icon.name === "Profile" ? styles.Profile() : null,
              activeTab == "Profile" && icon.name === activeTab
                ? styles.Profile(activeTab)
                : null,
            ]}
          />
        </TouchableOpacity>
      ))}
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("ProfileScreen");
        }}
      >
        <Image
          source={{
            uri: profilePicture,
          }}
          style={styles.Profile}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  Icon: {
    width: 30,
    height: 30,
    marginRight: 50,
  },
  Profile: {
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "white",
  },
});

export default BottomTab;

const bottomTabIcons = [
  {
    name: "Home",
    active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
  },
];

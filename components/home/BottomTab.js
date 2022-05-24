import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const BottomTab = () => {
  const [activeTab, setActiveTab] = React.useState("Home");
  return (
    <View style={{ color: "black", margin: 20, flexDirection: "row" }}>
      {bottomTabIcons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setActiveTab(icon.name);
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
    </View>
  );
};

const styles = StyleSheet.create({
  Icon: {
    width: 30,
    height: 30,
    marginRight: 50,
  },
  Profile: (activeTab = "") => ({
    width: 30,
    height: 30,
    borderRadius: 15,
    borderWidth: activeTab === "Profile" ? 2 : 0,
    borderColor: "white",
  }),
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
  {
    name: "Profile",
    active:
      "https://instagram.ftpa1-2.fna.fbcdn.net/v/t51.2885-19/249865761_119727660487552_7484151078639541787_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ftpa1-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=KOJDDmcO_bIAX_vs7dC&edm=ABfd0MgBAAAA&ccb=7-5&oh=00_AT_sbPSGZS1Fqbe9osKVARJy3YDaC8rt3hcDuaV2hh6K4w&oe=6293C255&_nc_sid=7bff83",
    inactive:
      "https://instagram.ftpa1-2.fna.fbcdn.net/v/t51.2885-19/249865761_119727660487552_7484151078639541787_n.jpg?stp=dst-jpg_s320x320&_nc_ht=instagram.ftpa1-2.fna.fbcdn.net&_nc_cat=104&_nc_ohc=KOJDDmcO_bIAX_vs7dC&edm=ABfd0MgBAAAA&ccb=7-5&oh=00_AT_sbPSGZS1Fqbe9osKVARJy3YDaC8rt3hcDuaV2hh6K4w&oe=6293C255&_nc_sid=7bff83",
  },
];

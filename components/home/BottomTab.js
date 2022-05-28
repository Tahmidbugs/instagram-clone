import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";

const BottomTab = () => {
  const [activeTab, setActiveTab] = React.useState("Home");
  const navigation = useNavigation();
  return (
    <View style={{ color: "black", margin: 20, flexDirection: "row" }}>
      {bottomTabIcons.map((icon, index) => (
        <TouchableOpacity
          key={index}
          onPress={() => {
            setActiveTab(icon.name);
            navigation.navigate(icon.navigation);
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
    navigation: "Home",
  },
  {
    name: "Search",
    active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
    navigation: "SearchScreen",
  },
  {
    name: "Reels",
    active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
    inactive: "https://img.icons8.com/ios/500/ffffff/instagram-reel.png",
    navigation: "InProgress",
  },
  {
    name: "Shop",
    active:
      "https://img.icons8.com/fluency-systems-filled/48/ffffff/shopping-bag-full.png",
    inactive:
      "https://img.icons8.com/fluency-systems-regular/48/ffffff/shopping-bag-full.png",
    navigation: "InProgress",
  },
  {
    name: "Profile",
    active:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHXJexU8T3fYobb9B7aPWEeXa1scKM4cweQ&usqp=CAU",
    inactive:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSfHXJexU8T3fYobb9B7aPWEeXa1scKM4cweQ&usqp=CAU",
    navigation: "ProfileScreen",
  },
];

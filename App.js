import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import Post from "./components/home/Post";
import SharingOptions from "./components/Post/SharingOptions";
import Navigation from "./Navigation";
import Home from "./screens/Home";
import PostScreen from "./screens/PostScreen";
import InProgress from "./screens/InProgress";
import LoginScreen from "./screens/LoginScreen";
import Registration from "./screens/Registration";
export default function App() {
  return <Navigation />;
}

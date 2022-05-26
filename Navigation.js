import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./screens/Home";
import PostScreen from "./screens/PostScreen";
import InProgress from "./screens/InProgress";
import LoginScreen from "./screens/LoginScreen";
import Registration from "./screens/Registration";
import ProfileScreen from "./screens/ProfileScreen";
import ViewPost from "./screens/ViewPost";
import MakeProfile from "./screens/MakeProfile";
import EditProfile from "./screens/EditProfile";
const Stack = createNativeStackNavigator();

const screenOptions = {
  headerShown: false,
};

export const SignedInStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={screenOptions} initialRouteName="Home">
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="InProgress" component={InProgress} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="EditProfile" component={EditProfile} />
        <Stack.Screen name="ViewPost" component={ViewPost} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export const SignedOutStack = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="Registration"
      >
        <Stack.Screen name="Registration" component={Registration} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

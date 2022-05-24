import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Home from "./screens/Home";
import PostScreen from "./screens/PostScreen";
import InProgress from "./screens/InProgress";
import LoginScreen from "./screens/LoginScreen";
import Registration from "./screens/Registration";

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  const screenOptions = {
    headerShown: false,
  };
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={screenOptions}
        initialRouteName="LoginScreen"
      >
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="PostScreen" component={PostScreen} />
        <Stack.Screen name="InProgress" component={InProgress} />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="Registration" component={Registration} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;

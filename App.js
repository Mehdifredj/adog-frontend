import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";


import FontAwesome from "react-native-vector-icons/FontAwesome";

import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";

import user from "./reducers/user";

import SwipesScreen from "./screens/SwipesScreen";
import HomeScreen from "./screens/HomeScreen";
import SignInScreen from "./screens/SignInScreen";
import SignUpScreen from "./screens/SignUpScreen";
import MatchScreen from "./screens/MatchScreen";
import UserProfileScreen from "./screens/UserProfileScreen";
import MessagerieScreen from "./screens/MessagerieScreen";
import ChatScreen from "./screens/ChatScreen"

const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = "";

          if (route.name === "Swipes") {
            iconName = "heart";
          } else if (route.name === "My Profile") {
            iconName = "paw";
          } else if (route.name === "Mailbox") {
            iconName = "comments";
          }
          return <FontAwesome name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#F1890F",
        tabBarInactiveTintColor: "#9c9c9c",
        headerShown: false,
      })}
    >
      <Tab.Screen name="My Profile" component={UserProfileScreen} />
      <Tab.Screen name="Swipes" component={SwipesScreen} />
      <Tab.Screen name="Mailbox" component={MessagerieScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Match" component={MatchScreen} />
          <Stack.Screen name="Chat" component={ChatScreen} />
          <Stack.Screen name="Profile" component={UserProfileScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Swipes" component={SwipesScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="Messagerie" component={MessagerieScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
import React from "react";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("TabNavigator");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text style={styles.title}>Welcome to Adog</Text>

      <TouchableOpacity
        onPress={() => handleSubmit()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Start</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  imageLogo: {},
});

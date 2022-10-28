import { useNavigation } from "@react-navigation/native";
import React from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  Text,
  TouchableOpacity,
} from "react-native";

export default function HomeScreen({}) {
  const navigation = useNavigation();

  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text style={styles.title}>Adog !</Text>
      <Text style={styles.title2}>Make your family bigger</Text>

      <TouchableOpacity
        onPress={() => navigation.navigate("SignUpScreen")}
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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: 50,
    color: "#F1890F",
    marginBottom: 30,
  },
  title2: {
    marginBottom: 10,
    fontSize: 20,
    color: "#F1890F",
  },
  imageLogo: {
    width: 300,
    height: 190,
  },
  button: {
    alignItems: "center",
    paddingTop: 15,
    paddingBottom: 15,
    width: "50%",
    marginTop: 40,
    marginBottom: 40,
    backgroundColor: "#F1890F",
    borderRadius: 10,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 18,
  },
});

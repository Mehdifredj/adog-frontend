import React from "react";
import { Image, StyleSheet, SafeAreaView, Text, TouchableOpacity } from "react-native";

export default function HomeScreen({ navigation }) {
  const handleSubmit = () => {
    navigation.navigate("SignUp");
  };
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text style={styles.title}>Adog !</Text>
      <Text style={styles.title2}>Make your family bigger</Text>

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
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  title: {
    fontSize: "60%",
    color: "#F1890F",
    marginBottom: "10%",
  },
  title2: {
    marginBottom: "5%",
    fontSize: "20%",
    color: "#F1890F",
  },
  imageLogo: {
    width: "60%",
    height: "30%",
  },
  button: {
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "3%",
    width: "50%",
    marginTop: "5%",
    marginBottom: "10%",
    backgroundColor: "#F1890F",
    borderRadius: "10%",
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "18%",
  },
});

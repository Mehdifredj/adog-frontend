import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { ScreenContainer } from "react-native-screens";

export default function Match(props) {
  const image = { uri: "https://reactjs.org/logo-og.png" };

  return (
    <TouchableOpacity style={styles.container}>
      
        <ImageBackground
          source={image}
          resizeMode="cover"
          style={styles.image}
        ></ImageBackground>
        <Text style={styles.text}>{props.name}</Text>
        <Text style={styles.text}>{props.age} ans</Text>
      </TouchableOpacity>
   
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    borderWidth: 1,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
    width: "15%",
    height: "60%",
    marginLeft: 5,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: "100%",
  },
  text: {
    color: "orange",
  },
});

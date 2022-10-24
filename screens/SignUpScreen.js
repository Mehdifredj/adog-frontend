import {useState} from'react';
import React from "react";
import {
    Image, KeyboardAvoidingView, Platform,
    StyleSheet, Text, View,
    TextInput, TouchableOpacity} from "react-native";

export default function SignUpScreen() {

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <Image style={styles.image} source={require("../images/logo.jpg")} />
      <Text>sign up Screen</Text>
    </KeyboardAvoidingView>
  );
}



const styles = StyleSheet.create({

  container:{
flex:1,
backgroundColor: "red",
  },


  imageLogo:{

  },

})
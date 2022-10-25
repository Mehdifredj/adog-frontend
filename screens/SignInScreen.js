import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../reducers/user";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  ImageBackground,
  TextInput,
  TouchableOpacity,
} from "react-native";

export default function SignInScreen({ navigation }) {
  const dispatch = useDispatch();

  const [email, setEmail] = useState(""); //initialisation des etats pour l'email et le passxord
  const [password, setPassword] = useState("");

  const handleConnection = () => {
    fetch("http://192.168.43.169:3000/users/signin", {
      // requete fetch avec notre adresse IP personnelle sur la route POST signin
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          dispatch(login({ email: data.email, token: data.token, name: data.name })); // dispatch pour stocker les données dans le reducer
          setEmail("");
          setPassword("");
          navigation.navigate("Filters"); // permet la redirection vers la page userProfile.
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />

      <TextInput
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
        
      />

      <TextInput
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        value={password}
        style={styles.input}
      />

      <TouchableOpacity onPress={() => handleConnection()}>
        <Text style={styles.titleLogoGO}>Go!</Text>
        <Image
          style={styles.imagestyleLogoGo}
          source={require("../images/Logo-GO.jpg")}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },

  imageLogo: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },

  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#F1890F",
    borderBottomWidth: 1,
    fontSize: 18,
  },

  imagestyleLogoGo: {
    height: 150,
    width: 150,
  },

  titleLogoGO: {
    alignItems: "center",
    justifyContent: "center",
    color: "#F1890F",
    fontSize: 20,
    fontWeight: "600",
    marginLeft: 65,
    marginTop: 120,
  },
});

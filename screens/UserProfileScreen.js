import { useState } from "react";
import React from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Switch,
} from "react-native";

export default function UserProfilScreen() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [vaccins, setVaccins] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutMyOwner, setAboutMyOwner] = useState("");

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.imageLogo}
        source={require("../images/user_default.png")}
      />
      <Text style={styles.title}>Hi ! I'm ...</Text>

      <TextInput
        placeholder="name"
        onChangeText={(value) => setName(value)}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="breed"
        onChangeText={(value) => setBreed(value)}
        value={breed}
        style={styles.input}
      />
      <TextInput
        placeholder="age"
        onChangeText={(value) => setAge(value)}
        value={age}
        style={styles.input}
      />
      <TextInput
        placeholder="gender"
        onChangeText={(value) => setGender(value)}
        value={gender}
        style={styles.input}
      />
      <Text style={styles.textButton}>Up-to-date vaccinations</Text>
      <Switch
        value={vaccins}
        onValueChange={(value) => setVaccins(value)}
        trackColor={{ false: "#808080", true: "#F1890F" }}
        ios_backgroundColor="#808080"
      />
      <TextInput
        placeholder="about me"
        onChangeText={(value) => setAboutMe(value)}
        value={aboutMe}
        style={styles.input}
      />
      <TextInput
        placeholder="about my owner"
        onChangeText={(value) => setAboutMyOwner(value)}
        value={aboutMyOwner}
        style={styles.input}
      />
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
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#F1890F",
    borderBottomWidth: 1,
    fontSize: 18,
  },
});

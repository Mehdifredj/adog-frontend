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
import { useDispatch, useSelector } from "react-redux";
import { updateProfil } from "../reducers/user";

export default function UserProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);
  
  const [name, setName] = useState(user.name);
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [vaccins, setVaccins] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutMyOwner, setAboutMyOwner] = useState("");

  const handleRegister = () => {
    fetch(`http://192.168.10.172:3000/users/update/${user.token}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({

        name : name,
        breed: breed,
        age: age,
        gender: gender,
        vaccins: vaccins,
        aboutMe: aboutMe,
        aboutMyOwner: aboutMyOwner,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            updateProfil({
              name: data.name,
              breed: data.breed,
              age: data.age,
              gender: data.gender,
              vaccins: data.vaccins,
              aboutMe: data.aboutMe,
              aboutMyOwner: data.aboutMyOwner,
            })
          );
          navigation.navigate("Filters");
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <Image
        style={styles.imageUser}
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
      <View style={styles.containerToggle}>
        <Text style={styles.textToggle}>Up-to-date vaccinations</Text>
        <Switch
          style={styles.toggle}
          value={vaccins}
          onValueChange={(value) => setVaccins(value)}
          trackColor={{ false: "#dcdcdc", true: "#F1890F" }}
          ios_backgroundColor="#dcdcdc"
        />
        
      </View>

      <View style={styles.containerAbout}>
        <Text style={styles.titleAbout}>About me :</Text>
        <TextInput
          placeholder="Please write something here"
          onChangeText={(value) => setAboutMe(value)}
          value={aboutMe}
          style={styles.about}
          multiline={true}
        />

        <Text style={styles.titleAbout}>About my owner :</Text>
        <TextInput
          placeholder="Please write something here"
          onChangeText={(value) => setAboutMyOwner(value)}
          value={aboutMyOwner}
          style={styles.about}
          multiline={true}
        />
      </View>
      <TouchableOpacity
        style={styles.buttonSubmit}
        activeOpacity={0.8}
        onPress={() => handleRegister()}
      >
        <Text style={styles.textButton}>Submit</Text>
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
  input: {
    width: "80%",
    marginTop: 25,
    borderBottomColor: "#F1890F",
    borderBottomWidth: 1,
    fontSize: 18,
  },
  title: {
    fontSize: 40,
    color: "#F1890F",
    marginTop: 20,
    fontWeight: "800",
  },
  imageUser: {
    width: 200,
    height: 130,
    borderRadius: 100,
  },
  containerToggle: {
    paddingLeft: 90,
    paddingRight: 90,
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  toggle: {
    marginTop: 20,
  },
  textToggle: {
    width: "80%",
    marginTop: 25,
    color: "#F1890F",
    fontSize: 16,
  },
  containerAbout: {
    width: "80%",
  },
  about: {
    marginTop: 10,
    borderColor: "#F1890F",
    borderWidth: 1,
    borderRadius: 15,
    fontSize: 14,
    padding: 10,
  },
  titleAbout: {
    marginTop: 25,
    color: "#F1890F",
    fontSize: 16,
  },
  buttonSubmit: {
    alignItems: "center",
    paddingTop: 12,
    paddingBottom: 12,
    width: "50%",
    marginTop: 40,
    backgroundColor: "#F1890F",
    borderRadius: 10,
    marginBottom: 40,
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: 16,
  },
});

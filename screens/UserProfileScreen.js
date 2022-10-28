import React from "react";
import * as ImagePicker from "expo-image-picker";
import { useState } from "react";
import {
  Image,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Switch,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateProfil, addPhoto } from "../reducers/user";
import FontAwesome from "react-native-vector-icons/FontAwesome";

export default function UserProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value.email);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(0);
  const [gender, setGender] = useState("");
  const [vaccins, setVaccins] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutMyOwner, setAboutMyOwner] = useState("");
  const [image, setImage] = useState(null);

  const handleRegister = () => {
    fetch("http://172.20.10.4:3000/users/update", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: name,
        breed: breed,
        age: age,
        gender: gender,
        vaccins: vaccins,
        aboutMe: aboutMe,
        aboutMyOwner: aboutMyOwner,
        images: image,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.result) {
          dispatch(
            updateProfil({
              name: name,
              breed: breed,
              age: age,
              gender: gender,
              vaccins: vaccins,
              aboutMe: aboutMe,
              aboutMyOwner: aboutMyOwner,
              images: image,
            })
          );
          navigation.navigate("SignIn");
        }
      });
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result.uri);

    if (!result.cancelled) {
      setImage(result.uri);
    }

    const formData = new FormData();

    formData.append("imageFromFront", {
      uri: result.uri,
      name: "photo.jpg",
      type: "image/jpeg",
    });

    fetch("http://172.20.10.4:3000/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        data.result && dispatch(addPhoto(data.url));
      });
  };

  const userImage = useSelector((state) => state.user.value.images);

  const gallery = userImage.map((data, i) => {
    return <Image style={styles.images} key={i} source={{ uri: data }} />;
  });

  return (
    <ScrollView>
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

        <TouchableOpacity style={styles.pick} onPress={pickImage}>
          <Text>
            Pick an image from camera roll <FontAwesome name={"image"} />
          </Text>
        </TouchableOpacity>
        <View style={styles.gallery}>{gallery}</View>

        <TouchableOpacity
          style={styles.buttonSubmit}
          activeOpacity={0.8}
          onPress={() => handleRegister()}>
          <Text style={styles.textButton}>Submit</Text>
        </TouchableOpacity>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: "20%",
    paddingBottom: "35%",
  },
  input: {
    width: "80%",
    marginTop: "7%",
    borderBottomColor: "#F1890F",
    borderBottomWidth: 1,
    fontSize: "18%",
  },
  title: {
    fontSize: "45%",
    color: "#F1890F",
    marginTop: "4%",
    fontWeight: "800",
  },
  imageUser: {
    width: "35%",
    height: "15%",
    marginTop: "8%",
    borderRadius: "100%",
  },
  containerToggle: {
    paddingLeft: "20%",
    paddingRight: "20%",
    flexDirection: "row",
    justifyContent: "center",
    alignContent: "center",
  },
  toggle: {
    marginTop: "10%",
  },
  textToggle: {
    width: "80%",
    marginTop: "12%",
    color: "#F1890F",
    fontSize: "16%",
  },
  containerAbout: {
    width: "80%",
  },
  about: {
    marginTop: "5%",
    borderColor: "#F1890F",
    borderWidth: 1,
    borderRadius: "8%",
    fontSize: "14%",
    paddingTop: "3%",
    paddingBottom: "3%",
    paddingLeft: 10,
    paddingRight: 10,
  },
  titleAbout: {
    marginTop: "8%",
    color: "#F1890F",
    fontSize: "16%",
  },
  pick: {
    marginTop: "8%",
    color: "#F1890F",
  },
  gallery: {
    flex: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    paddingTop: "5%",
  },
  images: {
    width: 200,
    height: 200,
    margin: 10,
  },
  buttonSubmit: {
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "3%",
    width: "50%",
    marginTop: "8%",
    backgroundColor: "#F1890F",
    borderRadius: "8%",
    marginBottom: "10%",
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "16%",
  },
});

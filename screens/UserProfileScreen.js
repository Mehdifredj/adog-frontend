import React from "react";
import { useState, useEffect } from "react";
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
import SelectList from "react-native-dropdown-select-list";
import IP_VARIABLE from "../variable";
import FontAwesome from "react-native-vector-icons/FontAwesome";
import * as ImagePicker from "expo-image-picker";


export default function UserProfileScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [vaccins, setVaccins] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutMyOwner, setAboutMyOwner] = useState("");
  const [image, setImage] = useState(null);
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);

  // permet de récupérer la liste des races de chiens via une api publique
  useEffect(() => {
    fetch("https://api.thedogapi.com/v1/breeds/")
      .then((response) => response.json())
      .then((data) => {
        const resultMap = data.map((dataResult, i) => {
          return dataResult.name;
        });
        setData(resultMap);
      });
  });

  // Permet de charger au lancement de la page les informations du profil garder en BDDD
  useEffect(() => {
    fetch(`http://${IP_VARIABLE}/users/getuser/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        setName(data.name);
        setBreed(data.breed);
        setAge(data.age.toString());
        setGender(data.gender);
        setVaccins(data.vaccins);
        setAboutMe(data.aboutMe);
        setAboutMyOwner(data.aboutMyOwner);
      });
  }, []);

   // fonction qui permet de submit les informations si modifiées
  const handleRegister = () => {
    fetch(`http://${IP_VARIABLE}/users/update/${user.token}`, {
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
        images: image,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
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
              images: data.image,
            })
          );
          navigation.navigate("Filters");
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
    fetch(`http://${IP_VARIABLE}/upload`, {
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
          placeholder="Name"
          onChangeText={(value) => setName(value)}
          style={styles.input}
        />

        <SelectList
          data={data}
          setSelected={setSelected}
          placeholder="Select your Breed"
          borderColor=""
        />

        <TextInput
          keyboardType="numeric"
          placeholder="Age"
          onChangeText={(value) => setAge(value)}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
          onChangeText={(value) => setGender(value)}
          style={styles.input}
        />
        <View style={styles.containerToggle}>
          <Text style={styles.textToggle}>Up-to-date vaccinations</Text>
          <Switch
            style={styles.toggle}
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
            style={styles.about}
            multiline={true}
          />

          <Text style={styles.titleAbout}>About my owner :</Text>
          <TextInput
            placeholder="Please write something here"
            onChangeText={(value) => setAboutMyOwner(value)}
            style={styles.about}
            multiline={true}
          />
        </View>

        <TouchableOpacity style={styles.pick} onPress={pickImage}>
          <Text>Pick an image from camera roll</Text>
          <FontAwesome name={"image"} />
        </TouchableOpacity>
        <View style={styles.gallery}>{gallery}</View>

        <TouchableOpacity
          style={styles.buttonSubmit}
          activeOpacity={0.8}
          onPress={() => handleRegister()}
        >
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
    flexDirection: "row",
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

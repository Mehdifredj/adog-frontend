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
  TouchableWithoutFeedback,
  Switch,
  ScrollView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { updateProfil, login } from "../reducers/user";
import SelectList from "react-native-dropdown-select-list";

export default function UserProfilScreen({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState("");
  const [vaccins, setVaccins] = useState(false);
  const [aboutMe, setAboutMe] = useState("");
  const [aboutMyOwner, setAboutMyOwner] = useState("");
  const [selected, setSelected] = useState("");
  const [data, setData] = useState([]);

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

  // Permet de charger au lancement de la page les informations du profil garder en BDD

  useEffect(() => {
    fetch(`http://192.168.10.173:3000/users/getuser/${user.token}`)
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
          value={name}
          style={styles.input}
        />
        {/* <TextInput
        placeholder="Breed"
        onChangeText={(value) => setBreed(value)}
        value={breed}
        style={styles.input} */}
        <SelectList 
          data={data} 
          setSelected={setSelected} 
          placeholder="Select your Breed"
          borderColor=''
          />

        <TextInput
          keyboardType="numeric"
          placeholder="Age"
          onChangeText={(value) => setAge(value)}
          value={age}
          style={styles.input}
        />
        <TextInput
          placeholder="Gender"
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
    </ScrollView>
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
    marginTop: "11%",
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

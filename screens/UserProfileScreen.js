import { View, Text } from 'react-native'
import React from 'react'

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
    behavior={Platform.OS === "ios" ? "padding" : "height"}>

    <Image style={styles.imageLogo} source={require("../images/user_default.png")} />
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
      style={styles.input}/>
    <TextInput
      placeholder="age"
      onChangeText={(value) => setAge(value)}
      value={age}
      style={styles.input}/>
    <TextInput
      placeholder="gender"
      onChangeText={(value) => setGender(value)}
      value={gender}
      style={styles.input}/>
    <TextInput
      placeholder="about me"
      onChangeText={(value) => setAboutMe(value)}
      value={aboutMe}
      style={styles.input}/>
    <TextInput
      placeholder="about my owner"
      onChangeText={(value) => setAboutMyOwner(value)}
      value={aboutMyOwner}
      style={styles.input}/>
    
    <TouchableOpacity
      onPress={() => handleVaccins()}
      style={styles.button}
      activeOpacity={0.8} >
      <Text style={styles.textButton}>Submit</Text>
    </TouchableOpacity>

    <TouchableOpacity
      onPress={() => handleRegister()}
      style={styles.button}
      activeOpacity={0.8} >
      <Text style={styles.textButton}>Submit</Text>
    </TouchableOpacity>

    <Text style={styles.title2}>Already an account ?</Text>
    <Text>click here :</Text>

    <TouchableOpacity onPress={() => handleSubmit()}>
    <Image source={require('../images/patte.jpg')} style={styles.imagePatte}/>
    </TouchableOpacity>

  </KeyboardAvoidingView>
  )
}
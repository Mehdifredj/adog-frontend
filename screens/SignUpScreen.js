import { useState } from "react";
import { useDispatch } from 'react-redux';
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
} from "react-native";
import { login } from '../reducers/user';

export default function SignUpScreen({navigation}) {

const dispatch = useDispatch();
    
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = () => {
    navigation.navigate('SignIn');
  };

  const handleRegister = () => {
    fetch('http://192.168.10.162:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result) {
          dispatch(login({ email: email }));
          setName('');
          setEmail('');
          setPassword('');
          navigation.navigate('UserProfil');
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text>Welcome !</Text>

      <TextInput
        placeholder="name"
        onChangeText={(value) => setName(value)}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}/>
      <TextInput
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.input}/>

      <TouchableOpacity
        onPress={() => handleRegister()}
        style={styles.button}
        activeOpacity={0.8} >
        <Text style={styles.textButton}>Submit</Text>
      </TouchableOpacity>

      <Text>Already an account ?</Text>
      <Text>click here :</Text>

      <TouchableOpacity onPress={() => handleSubmit()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>go to sign in</Text>
      </TouchableOpacity>

{/* 
      <Image style={styles.imagePatte} source={require("../images/patte.jpg")} /> */}

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageLogo: {
    width: "30%",
    height: "30%",
  },
  imagePatte: {
    width: "10%",
    height: "10%",
  },
  input: {
  width: '80%',
  marginTop: 25,
  borderBottomColor: '#F1890F',
  borderBottomWidth: 1,
  fontSize: 18,
},
button: {
    alignItems: 'center',
    paddingTop: 8,
    width: '50%',
    marginTop: 30,
    backgroundColor: '#F1890F',
    borderRadius: 10,
    marginBottom: 80,
  },
  textButton: {
    color: '#ffffff',
    height: 30,
    fontWeight: '600',
    fontSize: 16,
  },
});

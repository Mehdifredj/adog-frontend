import { useState } from "react";
import { useDispatch } from 'react-redux';
import React from "react";
import { Image, KeyboardAvoidingView, Platform, StyleSheet,
  Text, View, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { login } from '../reducers/user';

export default function SignUpScreen({navigation}) {

const dispatch = useDispatch();

const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");

  const goSignIn = () => {
    navigation.navigate('SignIn');
  };

  const handleRegister = () => {
    fetch('http://192.168.10.203:3000/users/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: name, email: email, password: password }),
    }).then(response => response.json())
      .then(data => {
        if (data.result && EMAIL_REGEX.test(email))
       {
          dispatch(login({ email: email }));
          setName('');
          setEmail('');
          setPassword('');
          navigation.navigate('UserProfile');
        }
        else {
          setEmailError(true);
        }
      });
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}>

      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text style={styles.title}>Welcome !</Text>

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
        {emailError && <Text style={styles.error}>Invalid email address</Text>}
      <TextInput
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        value={password}
        style={styles.input}/>
   
  
      <TouchableOpacity
        onPress={() => handleRegister()}
        style={styles.button}
        activeOpacity={0.8} >
        <Text style={styles.textButton}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.title2}>Already an account ?</Text>
      <Text>click here :</Text>

      <TouchableOpacity onPress={() => goSignIn()}>
      <Image source={require('../images/patte.jpg')} style={styles.imagePatte}/>
      </TouchableOpacity>

    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: "white",
  },
  title: {
    fontSize: 40,
    color: '#F1890F',
    marginTop: 40,
    fontWeight: '800',
  },
  title2: {
    marginBottom: 10,
    fontSize: 20,
  },
  imageLogo: {
    width: 300,
    height: 190,
  },
  imagePatte: {
    marginTop: 15,
    width: 50,
    height: 50,
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
    paddingTop: 12,
    paddingBottom: 12,
    width: '50%',
    marginTop: 40,
    backgroundColor: '#F1890F',
    borderRadius: 10,
    marginBottom: 40,
  },
  textButton: {
    color: '#ffffff',
    fontWeight: '700',
    fontSize: 16,
  },
  error: {
    marginTop: 10,
    color: 'red',
  },
});

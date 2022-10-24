
import React from 'react'
import {useState} from'react';
import { useDispatch } from 'react-redux';
import { login } from '../reducers/user';
import {
    Image, KeyboardAvoidingView, Platform,
    StyleSheet, Text, View,
    TextInput, TouchableOpacity} from "react-native";


export default function SignInScreen({navigation}) {

  const dispatch = useDispatch();

  const [email, setEmail] = useState(''); //initialisation des etats pour l'email et le passxord
  const [password, setPassword] = useState('');


  const handleConnection = () => {

		fetch('http://192.168.10.144:3000/users/signin', { // requete fetch avec notre adresse IP personnelle sur la route POST signin
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ email: email, password: password }),
		}).then(response => response.json())
			.then(data => {
				if (data.result) {
					dispatch(login({ email: email }));   // dispatch pour stocker les données dans le reducer
          setEmail('');
					setPassword('');
          navigation.navigate('UserProfile'); // permet la redirection vers la page userProfile. 
				}
			});
	};

  return (

     <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <Image style={styles.image} source={require('../images/logo.jpg')} />
      <Text style={styles.title}>SignInScreen</Text>

      <TextInput
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}/>

      <TextInput
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        value={password}
        style={styles.input}
      />
       
      <TouchableOpacity onPress={() => handleConnection()} style={styles.button} activeOpacity={0.8}>
        <Text style={styles.textButton}>Go!</Text>
      </TouchableOpacity>
     </KeyboardAvoidingView>
  )
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
    borderRadius:"30%",
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
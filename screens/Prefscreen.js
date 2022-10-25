import { View, Text,StyleSheet,Image,TextInput,Switch } from 'react-native'
import React from 'react'
import { useDispatch } from 'react-redux';
import { useState } from "react";



export default function Prefscreen() {
    const dispatch = useDispatch();

    const [distMin, setDistMin] = useState(0);
    const [distMax, setDistMax] = useState(0);
    const [ageMin, setAgeMin] = useState(0);
    const [ageMax, setAgeMax] = useState(0);
    const [breed, setBreed] = useState("");


    //set toogle true false
    const [isEnabledfemale, setIsEnabledFemale] = useState(false);
    const toggleSwitchFemale = () => setIsEnabledFemale(true);

    const [isEnabledmale, setIsEnabledMale] = useState(false);
    const toggleSwitchMale = () => setIsEnabledMale(true);


  return (
    <View style={styles.container}>
       <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
       <View style={styles.containerDist}>
       <TextInput
        placeholder="Distance Min"
        onChangeText={(value) => setDistMin(value)}
        value={distMin}
        style={styles.input}
        textAlign={'center'}
      />
        <TextInput
        placeholder="Distance Max"
        onChangeText={(value) => setDistMax(value)}
        value={distMax}
        style={styles.input}
        textAlign={'center'}
      />
      </View>
        <View style={styles.containerAge}>
        <TextInput
        placeholder="Age Min"
        onChangeText={(value) => setAgeMin(value)}
        value={ageMin}
        style={styles.input}
        textAlign={'center'}
      />
        <TextInput
        placeholder="Age Max"
        onChangeText={(value) => setAgeMax(value)}
        value={ageMax}
        style={styles.input}
        textAlign={'center'}
      />
       </View>
       <View>
       <TextInput
        placeholder="Breed"
        onChangeText={(value) => setBreed(value)}
        value={breed}
        style={styles.inputBreed}
        textAlign={'center'}
      />
       </View>
       <View>
       <Text style={styles.textButton}>Up-to-date vaccinations</Text>
        <Switch
        value={isEnabledfemale}
        onValueChange={toggleSwitchFemale}
        trackColor={{ false: "#808080", true: "#F1890F" }}
        ios_backgroundColor="#808080"
      />
       <Switch
        value={isEnabledmale}
        onValueChange={toggleSwitchMale}
        trackColor={{ false: "#808080", true: "#F1890F" }}
        ios_backgroundColor="#808080"
      />
       </View>
    </View>
  )
}


const styles = StyleSheet.create({
    container: {
    flex: 1,
    backgroundColor: "white",
    },
    imageLogo: {
        height:'10%',
        width:'18%',
        marginTop:'13%',
        marginLeft:'42%',
    },
    input: {
        width: '38%',
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 18,
      },
      containerDist : {
        marginTop:'5%',
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:'5%',
        marginRight:'7%',
        
      },
      containerAge : {
        flexDirection:'row',
        justifyContent:'space-between',
        marginLeft:'5%',
        marginRight:'7%',
        marginTop:'3%',
      },
      inputBreed: {
        width: '38%',
        marginTop: 25,
        borderBottomColor: '#ec6e5b',
        borderBottomWidth: 1,
        fontSize: 18,
        marginLeft:'30%',
        marginTop:'10%',
      },
   
  });
  
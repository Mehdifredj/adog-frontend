import { Text,StyleSheet, Image, SafeAreaView , TouchableOpacity } from 'react-native'
import React from 'react'

export default function MatchScreen({navigation}) {
  
  return (
    <SafeAreaView style={styles.container}>
        <SafeAreaView style={styles.containerview}>
        <Image source= {require("../images/sparkle-confetti.gif")} style={styles.confettigif}
         />
        <Text style={styles.match}> IT'S A MATCH ! </Text>
        </SafeAreaView>
    
     
      <Image source= {require("../images/husky-and-shiba-二哈萌柴2微信表情.gif")} 
      style={styles.gif}
     />
     <TouchableOpacity onPress={() => navigation.navigate("Messagerie")}>
        <Image
          source={require("../images/patte-orange.png")}
          style={styles.imagePatte}
        />
      </TouchableOpacity>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
    },

    containerview:{

    marginBottom: "10%",
    },
    match : {
        position: "absolute",
        top:"35%",
        color:"#F1890F",
        fontSize:'50%',
        marginLeft:'10%',
       
    },
    gif:{
        height:200,
        width:250,
        marginLeft:"20%",
        marginBottom:"20%",
    },
    
    confettigif:{
        height:300,
        width:400,
    }, 
    imagePatte:{
        marginTop: "5%",
        width: 60,
        height: 60,
        marginLeft:"40%",
       
    }
});
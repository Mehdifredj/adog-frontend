import { View, Text,StyleSheet,Image } from 'react-native'
import React from 'react'

export default function Prefscreen() {
  return (
    <View style={styles.container}>
       <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
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
        marginTop:'11%',
        marginLeft:'42%',
    }
  });
  
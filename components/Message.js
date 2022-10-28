import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

export default function Message(props) {
  const navigation = useNavigation();

  const handleMessage = () => {
    console.log("test");
    navigation.navigate("ChatScreen");
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleMessage()}
        activeOpacity={0.1}
        style={styles.message}
      >
        <View style={styles.photo}></View>
        <View style={styles.lastmessage}>
          <Text style={styles.namelastmessage}>{props.name} </Text>
          <Text style={styles.namelastmessage}>{props.age} ans</Text>

          <Text>J'aime beaucoup ton chien 🐶</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.delete}>X</Text>
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  message: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 40,
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "orange",
    height: 100,
    width: "90%",
  },
  photo: {
    marginLeft: "5%",
    width: 65,
    height: 65,
    borderRadius: 300 / 2,
    borderWidth: 1,
  },
  lastmessage: {
    margin: "5%",
    height: "70%",
    width: "55%",
    display: "flex",
  },
  namelastmessage: {
    color: "blue",
    fontWeight: "bold",
  },
  delete: {
    color: "red",
  },
});

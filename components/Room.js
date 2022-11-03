import { StyleSheet, Text, TouchableOpacity, View, Image } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { addOtherUserName, addRoom } from "../reducers/user";
import { useDispatch } from "react-redux";

export default function Room(props) {
  const dispatch = useDispatch();
  const navigation = useNavigation();

  console.log("props", props);

  const handleGoRoom = () => {
    dispatch(addRoom(props.idRoom)); // dispatch pour stocker les données dans le reducer
    dispatch(addOtherUserName(props.name));
    navigation.navigate("Chat");
  };

  return (
    <>
      <TouchableOpacity
        onPress={() => handleGoRoom()}
        activeOpacity={0.1}
        style={styles.messageCard}
      >
        <Image
          style={styles.photo}
          source={require("../images/user_default1.png")}
        />

        <View style={styles.textCard}>
          <Text style={styles.name}>{props.name}</Text>
          <Text style={styles.content}>
            Trop mignon ton chien ! On pourrait prévoir une rencontre ? 🐶
          </Text>
        </View>
      </TouchableOpacity>
    </>
  );
}

const styles = StyleSheet.create({
  messageCard: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 20,
    marginTop: "5%",
    borderWidth: 1,
    borderColor: "#F1890F",
    height: 120,
    width: "95%",
  },
  photo: {
    marginLeft: "5%",
    width: 65,
    height: 65,
    borderRadius: 300 / 2,
    borderWidth: 1,
  },
  textCard: {
    margin: "5%",
    height: "70%",
    width: "65%",
    display: "flex",
  },
  name: {
    color: "#F1890F",
    fontWeight: "bold",
  },
  content: {
    marginTop: "5%",
    marginBottom: "7%",
    color: "black",
  },
});

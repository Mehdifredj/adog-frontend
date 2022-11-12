import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import IP_VARIABLE from "../variable";

import { useSelector } from "react-redux";

export default function MessagerieScreen() {

  const [conversations, setConversations] = useState([]);
  const user = useSelector((state) => state.user.value);


  useEffect(() => {
    fetch(`http://${IP_VARIABLE}/messages/mesconversations/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        console.log('TESTTABLEAU', data)
        setConversations(data.rooms);
      });
  }, []);

  const listeDesRooms = conversations.map((data, i) => {
   
    let otherUserName;
    let idRoom = data._id;


    if (user.name === data.userOne.name) {
      otherUserName = data.userTwo.name;
    } else {
      otherUserName = data.userOne.name;
    }

    return <Room key={i} name={otherUserName} idRoom={idRoom} />;
  });

  let listeDeConversations;

  if (conversations.length !== 0) {
    listeDeConversations = (
      <ScrollView contentContainerStyle={styles.messagerie}>
        {listeDesRooms}
      </ScrollView>
    );
  } else {
    listeDeConversations = (
      <View style={styles.messagerieVide}>
        <Text>Désolé vous n'avez pas encore de conversations</Text>
      </View>
    );
  }

  return (
 
    <View style={styles.container}>
      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text style={styles.title}>Hello {user.name} !</Text>
      {listeDeConversations}
    </View>
 
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
  },
  imageLogo: {
    marginTop: "15%",
    width: "30%",
    height: "15%",
  },
  title: {
    color: "#F1890F",
    fontSize: "20%",
    fontWeight: "600",
    marginTop: "3%",
  },
  messagerie: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    height: "75%",
  },
  messagerieVide: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    height: "75%",
  },
});

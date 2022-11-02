import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Room from "../components/Room";
import IP_VARIABLE from "../variable";
import { addRoom } from "../reducers/user";

import { useDispatch, useSelector } from "react-redux";

export default function MessagerieScreen({ navigation }) {
  const [conversations, setConversations] = useState([]);

  const user = useSelector((state) => state.user.value);

  console.log(user)

  //console.log('state', user);

  // useEffect - qui récupère les datas

  useEffect(() => {
    fetch(
      `http://${IP_VARIABLE}/messages/mesconversations/${user.token}`
    )
      .then((response) => response.json())
      .then((data) => {
        // console.log('fetch', data.images[0]);
        //   console.log("Log data côté FRONT", data.rooms);
        setConversations(data.rooms);
      });
  }, []);

  // console.log("conversation", conversations);

  const listeDesRooms = conversations.map((data, i) => {
    let otherUserName;
    let idRoom = data._id;

    if (user.firstname === data.userOne.name) {
      otherUserName = data.userTwo.name;
    } else {
      otherUserName = data.userOne.name;
    }

    return <Room key={i} name={otherUserName} idRoom={idRoom} />;
  });

  let test = true;

  let listeDeConversations = (
    <View style={styles.messagerieVide}>
      <Text>Désolé pas de conversations</Text>
    </View>
  );

  if (test) {
    listeDeConversations = (
      <ScrollView contentContainerStyle={styles.messagerie}>
        {listeDesRooms}
      </ScrollView>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.blocklogo}>
        <Image style={styles.logo} source={require("../images/logo.jpg")} />
      </View>
      <View>
        <Text style={styles.title}>
          Hello {user.firstname} - voici la liste des conversations avec les
          utilisateurs auxquels vous pouvez accéder :
        </Text>
      </View>
      <View style={{ width: "100%" }}></View>

      {listeDeConversations}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderWidth: 1,
    borderColor: "orange",
  },
  blocklogo: {
    height: "10%",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-end",
    alignItems: "center",
  },

  matchtitle: {
    marginTop: "3%",
    color: "orange",
    alignSelf: "center",
  },
  containerMatch: {
    height: "100%",
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-arround",
  },
  title: {
    color: "orange",
    alignSelf: "center",
    fontWeight: "bold",
  },
  messagerie: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    height: "75%",
  },
  messagerieVide: {
    display: "flex",
    alignContent: "center",
    alignItems: "center",
    height: "75%",
  },
  logo: {
    height: "45%",
    width: "20%",
    marginBottom: "3%",
  },
});

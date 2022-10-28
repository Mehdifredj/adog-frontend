import { StyleSheet, Text, View, Image, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import Match from "../components/Match";
import Message from "../components/Message";
import BACKEND_IP from "../variable";

export default function MessagerieScreen({}) {
  const [Matchs, setMatchs] = useState([]);
  const [Conversations, setConversations] = useState([])

  useEffect(() => {
    fetch(`${BACKEND_IP}/match/5qDvJnUDcRyZhC9fSDO4-zwCB4cY2Abg`)
      .then((response) => response.json())
      .then((data) => {
       
        setMatchs(data.mymatch);
      });

    fetch(`${BACKEND_IP}/messages/listmessage/5qDvJnUDcRyZhC9fSDO4-zwCB4cY2Abg`)
      .then((response) => response.json())
      .then((data) => {
      
        setConversations(data.conversations);
      });
  }, []);

  console.log('log de conversation le seter',Conversations)
  // Method .map on Matchs
  const matchs = Matchs.map((data, i) => {
    return <Match key={i} name={data.name} age={data.age} />;
  });

  const conversations = Conversations.map((data, i) => {
    return <Message key={i} name={data.name} age={data.age} />;
  });

  return (
    <View style={styles.container}>
      <View style={styles.blocklogo}>
        <Image style={styles.logo} source={require("../images/logo.jpg")} />
      </View>
      <View>
        <Text style={styles.title}>Your Matchs</Text>
      </View>
      <ScrollView
        horizontal={true}
        contentContainerStyle={styles.containerMatch}
      >
        {matchs}
      </ScrollView>
      <View>
        <Text style={styles.title}>Vos messages</Text>
      </View>
      <ScrollView contentContainerStyle={styles.messagerie}>
        {conversations}
      </ScrollView>
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
  logo: {
    height: "45%",
    width: "20%",
    marginBottom: "3%",
  },
});

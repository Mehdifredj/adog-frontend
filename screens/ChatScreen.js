import React from "react";
import { useEffect, useState } from "react";
import Pusher from "pusher-js/react-native";
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch, useSelector } from "react-redux";
import IP_VARIABLE from "../variable";
import { deleteRoom } from "../reducers/user";

const pusher = new Pusher("9f99e2de0211a1e7849d", { cluster: "eu" });

const ChatScreen = ({ navigation }) => {
  /* Information écrite pour le moment en dure, mais par la suite elle seront stocké dans le store
     lorsque l'on cliquera sur la conversation depuis la page précédente */

  const dispatch = useDispatch();

  const [messages, setMessages] = useState([]);
  const [messageText, setMessageText] = useState("");

  const user = useSelector((state) => state.user.value);
  const idRoom = user.room; //id room
  const token = user.token; //token

  console.log('idRoom au moment du clic',idRoom);
  console.log('token',token);

  const messagesComponents = messages.map((message, i) => {
    return (
      <View
        key={i}
        style={[
          styles.messageWrapper,
          {
            ...(message.name.name === user.userName
              ? styles.messageSent
              : styles.messageRecieved),
          },
        ]}
      >
        <View
          style={[
            styles.message,
            {
              ...(message.name.name === user.userName
                ? styles.messageSentBg
                : styles.messageRecievedBg), //background
            },
          ]}
        >
          <Text style={styles.messageText}>{message.content}</Text>
        </View>
        <Text style={styles.timeText}>
          {new Date(message.date).getHours()}:
          {String(new Date(message.date).getMinutes()).padStart(2, "0")}
        </Text>
      </View>
    );
  });

  const handleReceiveMessage = (data) => {
    // console.log("message pusher received!", data);
    if (idRoom === data.roomId) {
      setMessages((messages) => [...messages, data]);
    }
  };

  useEffect(() => {
    fetch(`http://${IP_VARIABLE}/messages/sync/${idRoom}`)
      .then((response) => response.json())
      .then((data) => {
        setMessages(data.messages);
      });
    const subscription = pusher.subscribe("messagechannel");
    subscription.bind("pusher:subscription_succeeded", () => {
      subscription.bind("inserted", handleReceiveMessage);
    });

    return () => {
      pusher.unsubscribe();
      pusher.unbind();
    };
  }, []);

  const handleLeave = () => {
    dispatch(deleteRoom());
    navigation.navigate("TabNavigator", { screen: "Messagerie" });
  };

  const handleSendMessage = () => {
    if (!messageText) {
      return;
    }
    // a voir si on l'apelerais pas autrement plutard
    const body = {
      idRoom: idRoom, // vien du reducer
      content: messageText,
      token: token, // token de l'utilisateur du reducer
    };

    fetch(`http://${IP_VARIABLE}/messages/new/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    setMessageText("");
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.banner}>
        <MaterialIcons
          name="keyboard-backspace"
          color="#ffffff"
          size={24}
          onPress={() => handleLeave()}
        />
        <Text style={styles.greetingText}>
          Conversation avec {user.otherusername} 🐶
        </Text>
      </View>

      <View style={styles.inset}>
        <ScrollView style={styles.scroller}>{messagesComponents}</ScrollView>

        <View style={styles.inputContainer}>
          <TextInput
            onChangeText={(value) => setMessageText(value)}
            value={messageText}
            style={styles.input}
            autoFocus
          />
          <TouchableOpacity
            onPress={() => handleSendMessage()}
            style={styles.sendButton}
          >
            <MaterialIcons name="send" color="#ffffff" size={24} />
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#000",
  },
  inset: {
    flex: 1,
    borderTopLeftRadius: 50,
    borderTopRightRadius: 50,
    backgroundColor: "#ffffff",
    width: "100%",
    paddingTop: 20,
    position: "relative",
    borderTopColor: "#ffe099",
    borderLeftColor: "#ffe099",
    borderRightColor: "#ffe099",
    borderTopWidth: 4,
    borderRightWidth: 0.1,
    borderLeftWidth: 0.1,
  },
  banner: {
    width: "100%",
    height: "15%",
    paddingTop: 20,
    paddingLeft: 20,
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  greetingText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
    marginLeft: 15,
  },
  message: {
    paddingTop: 12,
    paddingBottom: 12,
    paddingRight: 20,
    paddingLeft: 20,
    borderRadius: 24,
    alignItems: "flex-end",
    justifyContent: "center",
    maxWidth: "65%",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  messageWrapper: {
    alignItems: "flex-end",
    marginBottom: 20,
  },
  messageRecieved: {
    alignSelf: "flex-start",
    alignItems: "flex-start",
  },
  messageSent: {
    alignSelf: "flex-end",
    alignItems: "flex-end",
  },
  messageSentBg: {
    backgroundColor: "#d6fff9",
  },
  messageRecievedBg: {
    backgroundColor: "#ffad99",
  },
  messageText: {
    color: "#506568",
    fontWeight: "400",
  },
  timeText: {
    color: "#506568",
    opacity: 0.5,
    fontSize: 10,
    marginTop: 2,
  },
  inputContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "center",
    justifySelf: "flex-end",
    alignContent: "flex-start",
    marginBottom: 30,
    marginTop: "auto",
    background: "transparent",
    paddingLeft: 20,
    paddingRight: 20,
  },
  input: {
    backgroundColor: "#f0f0f0",
    width: "80%",
    padding: 14,
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  sendButton: {
    borderRadius: 50,
    padding: 16,
    backgroundColor: "#ffe099",
    marginLeft: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 6.41,
    elevation: 1.2,
  },
  buttonText: {
    color: "#ffffff",
    fontWeight: "800",
    textTransform: "uppercase",
  },
  scroller: {
    paddingLeft: 20,
    paddingRight: 20,
  },
});

export default ChatScreen;

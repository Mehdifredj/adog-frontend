import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Image, KeyboardAvoidingView, Platform,
  ScrollView,
  StyleSheet, Text, TextInput, TouchableOpacity } from "react-native";
import { login } from "../reducers/user";
import IP_VARIABLE from "../variable";

export default function SignUpScreen({ navigation }) {
  const dispatch = useDispatch();

  const EMAIL_REGEX =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [messagealert, setMessagealert] = useState("");

  const handleRegister = () => {
    if (name === "" || password === "" || email === "") {
      setMessagealert("Attention un des champs n'est pas rempli");
      return;
    }

    if (!EMAIL_REGEX.test(email)) {
      setMessagealert("Attention le format de ladresse email est incorrect");
      return
    }
    fetch(`http://${IP_VARIABLE}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name: name, email: email, password: password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result && EMAIL_REGEX.test(email)) {
          dispatch(login({ email: email, token: data.token, name: data.name }));
          setName("");
          setEmail("");
          setPassword("");
          setMessagealert('');
          navigation.navigate("Profile");

        } else if (
          !data.result &&
          data.message === "This email is already used"
        ) {
          setMessagealert("Cette adresse email est déja utilisée");
        }
      });
  };

  return (

    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >

      <Image style={styles.imageLogo} source={require("../images/logo.jpg")} />
      <Text style={styles.title}>Welcome !</Text>

      <TextInput
        placeholder="name"
        onChangeText={(value) => setName(value)}
        value={name}
        style={styles.input}
      />
      <TextInput
        placeholder="email"
        onChangeText={(value) => setEmail(value)}
        value={email}
        style={styles.input}
      />
      
      <TextInput
        placeholder="password"
        onChangeText={(value) => setPassword(value)}
        secureTextEntry={true}
        value={password}
        style={styles.input}
      />

<Text style={styles.messagealert}>{messagealert}</Text>

      <TouchableOpacity
        onPress={() => handleRegister()}
        style={styles.button}
        activeOpacity={0.8}
      >
        <Text style={styles.textButton}>Submit</Text>
      </TouchableOpacity>

      <Text style={styles.title2}>Already an account ?</Text>
      <Text>click here :</Text>

      <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
        <Image
          source={require("../images/patte.jpg")}
          style={styles.imagePatte}
        />
      </TouchableOpacity>
    </KeyboardAvoidingView>

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
    width: "60%",
    height: "25%",
  },
  title: {
    fontSize: "45%",
    color: "#F1890F",
    marginTop: "2%",
    fontWeight: "800",
  },
  title2: {
    marginBottom: "3%",
    fontSize: "18%",
  },
  input: {
    width: "80%",
    marginTop: "8%",
    borderBottomColor: "#F1890F",
    borderBottomWidth: 1,
    fontSize: "18%",
  },
  button: {
    alignItems: "center",
    paddingTop: "3%",
    paddingBottom: "3%",
    width: "50%",
    marginTop: "10%",
    backgroundColor: "#F1890F",
    borderRadius: "10%",
    marginBottom: "10%",
  },
  textButton: {
    color: "#ffffff",
    fontWeight: "700",
    fontSize: "16%",
  },
  error: {
    marginTop: "3%",
    color: "red",
  },
  imagePatte: {
    marginTop: "5%",
    width: 60,
    height: 60,
  },
});

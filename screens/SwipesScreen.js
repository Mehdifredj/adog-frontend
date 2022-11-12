import React from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  Dimensions,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Swiper from "react-native-deck-swiper";
import IP_VARIABLE from "../variable";

//--------------------------------------------------------------------------------------------

export default function SwipesScreen({ navigation }) {
  //const dispatch = useDispatch();

  const user = useSelector((state) => state.user.value);
  //const [token, setToken] = useState("");
  const [cardsData, setCardsData] = useState([]);
  // Permet d'afficher les cards contenant toutes les informations des users au swipe.
  useEffect(() => {
    fetch(`http://${IP_VARIABLE}/users/allusers/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data récupérées du get", data);

        const cardsData = data.map((data) => {
          // permet de maper sur la colection users dans la base de donées (Tableau contenant toutes les infos users qui s'appelle data)

          const name = data.name;
          const age = data.age;
          const gender = data.gender;
          const images = data.images[0];
          const breed = data.breed;
          const token = data.token;
          const idUser = data._id;
          return { name, breed, age, gender, images, token, idUser };
        });
        setCardsData(cardsData);
        // on recupère toutes les data des users de notre base de données
      });
  }, []);

  const handleRight = (event) => {      // event permet de rentrer en contact avec l'object sur lequel on intervenir
   
    fetch(`http://${IP_VARIABLE}/users/updatelike/${user.token}`, {
      
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: cardsData[event].idUser,  // permet de récupérer l'id du user de la carte liké
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.result) { // condition generé par la route updatelike 
          navigation.navigate("Match");
        }
      });
    onSwiped("right");
  };

  //--------------------------------------------------------------------------------------------

  //code conscerant la geolocalisation:
  // Demande d'accord du User de le geolocalier
  // const [currentPosition, setCurrentPosition] = useState(null);

  // useEffect(() => {
  //   (async () => {
  //     const { status } = await Location.requestForegroundPermissionsAsync();

  //     if (status === "granted") {
  //       Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
  //         setCurrentPosition(location.coords);
  //       });
  //     }
  //   })();
  // }, []);

  //------------------------------
  //swipes
  const [index, setIndex] = useState(0); // initialisation de l'etat index
  const onSwiped = (type) => {
    // fonction onSwiped pour faire défiler les cards l'une après l'autre en fonction de leur index
    setIndex(index + 1);
    // console.log(on swiped ${type});
  };

  // on map sur cardsData ( notre etat initial qu'on a set) : le taleau cardsData contient toutes les data des users.
  const cards = cardsData.map((data, i) => {
    return (
      <View key={i}>
        <View>
          <Image source={{ uri: data.images }} style={styles.image} />
          <View style={styles.containertext}>
            <Text style={styles.nametext}>{data.name} </Text>
            <Text style={styles.breedtext}>{data.breed} </Text>
            <Text style={styles.genderagetext}>
              {data.age} ans {data.gender}
            </Text>
            {cards}
          </View>
        </View>
      </View>
    );
  });
  // Swip
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpg")} />
      <SafeAreaView style={styles.containerCard}>
        <Swiper
          cards={cards}
          animateOverlayLabelsOpacity
          animateCardOpacity
          disableTopSwipe
          disableBottomSwipe
          infinite
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "#ec6ebl5b",
                  color: "white",
                  fontsize: 15,
                  justifyContent: "center",
                  marginLeft: "60%",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-end",
                  justifyContent: "flex-start",
                  marginTop: "10%",
                },
              },
            },
            right: {
              title: "YEAH",
              style: {
                label: {
                  backgroundColor: "transparent",
                  color: "white",
                  justifyContent: "center",
                  fontsize: 15,
                  marginRight: "60%",
                },
                wrapper: {
                  flexDirection: "column",
                  alignItems: "flex-start",
                  justifyContent: "flex-start",
                  marginTop: "10%",
                },
              },
            },
          }}
          renderCard={(card) => {
            // console.log("card:", card)
            return <View style={styles.card}>{card}</View>;
          }}
          onSwiped={(cardIndex) => {
            //console.log(cardIndex);
          }}
          onSwipedRight={(event) => {
            // console.log("tete", event);
            handleRight(event);
          }}
          onSwipedLeft={() => onSwiped("left")}
          onSwipedAll={() => {
            //console.log("onSwipedAll");
          }}
          cardIndex={0}
          backgroundColor={"white"}
          stackSize={3}
        ></Swiper>
      </SafeAreaView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  logo: {
    height: "10%",
    width: "18%",
    marginBottom: "8%",
    marginLeft: "42%",
  },
  containerCard: {
    flex: 1,
  },
  image: {
    width: 350,
    height: 460,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  containertext: {
    marginLeft: "2%",
  },
  card: {
    flex: 0.7,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  nametext: {
    color: "black",
    fontSize: "30%",
    marginTop: "5%",
  },
  breedtext: {
    color: "grey",
    fontSize: "20%",
    marginBottom: "3%",
  },
  genderagetext: {
    color: "grey",
    fontSize: "17%",
    marginBottom: "25%",
  },
});

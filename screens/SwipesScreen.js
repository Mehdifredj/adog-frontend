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
    fetch(`http://${IP_VARIABLE}/users/allUsers/${user.token}`)
      .then((response) => response.json())
      .then((data) => {
        // console.log("data récupérées du get", data);

        const cardsData = data.map((data) => {
          // permet de maper sur la colection users dans la base de donées (Tableau contenant toutes les infos users qui s'appelle data)

          const name = data.name;
          const age = data.age;
          const gender = data.gender;
          const images = data.images[0];
          const token = data.token;
          const idUser = data._id;
          return { name, age, gender, images, token, idUser };
        });
        setCardsData(cardsData);
        //console.log('test',cardsData); // on recupère toutes les data des users de notre base de données
      });
  }, []);

  const handleRight = (event) => {
    //console.log("testdeEVENT", event); // event permet de rentrer en contact avec l'object sur lequel on intervenir
    fetch(`http://${IP_VARIABLE}/users/updateLike/${user.token}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: cardsData[event].idUser,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log("testFRONT", data);
        if (data.result) {
          navigation.navigate("Match");
        }
      });
    onSwiped("right");
    //console.log(cardsData[event]);
  };

  //--------------------------------------------------------------------------------------------

  //code conscerant la geolocalisation:
  // Demande d'accord du User de le geolocalier
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === "granted") {
        Location.watchPositionAsync({ distanceInterval: 10 }, (location) => {
          setCurrentPosition(location.coords);
        });
      }
    })();
  }, []);

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

          <Text style={styles.text1}>
            {data.name}, {data.breed}, {data.age}, {data.gender}
          </Text>
          <Text style={styles.text2}>{data.distance}</Text>
          {cards}
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
          backgroundColor={"#F1890F"}
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
    marginTop: "5%",
    marginLeft: "42%",
  },
  containerCard: {
    flex: 1,
  },
  image: {
    width: 375,
    height: 460,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  card: {
    flex: 0.7,
    borderRadius: 20,
    justifyContent: "center",
    backgroundColor: "white",
  },
  text1: {
    color: "black",
    fontSize: "20%",
    marginTop: "8%",
    marginLeft: "5%",
  },
  text2: {
    color: "grey",
    fontSize: "18%",
    marginTop: "2%",
    marginLeft: "5%",
  },
});

import React from "react";
import {
  Image,
  StyleSheet,
  SafeAreaView,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import Swiper from "react-native-deck-swiper"; //Import du module Swiper

//   const images = [
// {url: require('../images/pic1.jpeg')},
// {url:require('../images/pic2.jpeg')}
// ]
const Card = ({ card }) => <View style={styles.cardStyle}></View>;
export default function SwipesScreen() {
  // Demande d'accor du User de le geolocalier
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
  const [index, setIndex] = useState(0);
  const onSwiped = (type) => {
    setIndex(index + 1);
    console.log(`on swiped ${type}`);
  };

  // Swip
  return (
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={require("../images/logo.jpg")} />
      <SafeAreaView style={styles.containerCard}>
        <Swiper
          cards={["1", "2", "3", "4", "5", "6"]}
          disableBottomSwipe
          disableTopSwipe
          animateOverlayLabelsOpacity
          animateCardOpacity
          infinite
          overlayLabels={{
            left: {
              title: "NOPE",
              style: {
                label: {
                  backgroundColor: "#ec6e5b",
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
              title: "YES",
              style: {
                label: {
                  backgroundColor: "#8FBC8F",
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
            return (
              <View style={styles.card}>
                <Text style={styles.text}>{card}</Text>
              </View>
            );
          }}
          onSwiped={(cardIndex) => {
            console.log(cardIndex);
          }}
          onSwipedLeft={() => onSwiped("left")}
          onSwipedRight={() => onSwiped("right")}
          onSwipedTop={() => onSwiped("top")}
          onSwipedBottom={() => onSwiped("bottom")}
          onSwipedAll={() => {
            console.log("onSwipedAll");
          }}
          cardIndex={0}
          backgroundColor={"#ec6e5b"}
          stackSize={3}
        >
          <TouchableOpacity
            onPress={() => {
              console.log("oulala");
            }}
            title="Press me"
          ></TouchableOpacity>
        </Swiper>
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
  card: {
    flex: 0.55,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
    justifyContent: "center",
    backgroundColor: "white",
    resizeMode: "contain",
    height: "20%",
  },
  text: {
    textAlign: "center",
    fontSize: 50,
    backgroundColor: "transparent",
  },
});

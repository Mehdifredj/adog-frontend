import React, { Component } from 'react'
import { Text, View, StyleSheet, } from 'react-native'
import { addPlace } from '../reducers/user';
import MapView,{Marker} from 'react-native-maps';
import * as Location from 'expo-location';

import { useEffect, useState } from 'react';
export default function MapScreen() {
    const [currentPosition, setCurrentPosition] = useState(null);
    const [tempCoordinates, setTempCoordinates] = useState(null);
   
    const [newPlace, setNewPlace] = useState('');


useEffect(() => {
        (async () => {
          const { status } = await Location.requestForegroundPermissionsAsync();
    
          if (status === 'granted') {
            Location.watchPositionAsync({ distanceInterval: 10 },
              (location) => {
                setCurrentPosition(location.coords);
              });
          }
        })();
      }, []);
    
      useEffect(() => {
        fetch(`http://192.168.1.75:3000/places/`)
        .then(response => response.json())
        .then(dataPlace => {
        dispatch(allPlaces(dataPlace.place));
      });
      }, []);

      const handleLongPress = (e) => {
        setTempCoordinates(e.nativeEvent.coordinate);
        setModalVisible(true);
      };

      const handleNewPlace = () => {
        dispatch(addPlace({ 
          name: newPlace, 
          latitude: tempCoordinates.latitude, 
          longitude: tempCoordinates.longitude
         }));
    
         fetch('http://192.168.1.75:3000/places', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
          email: user.email, 
          name: newPlace,
          latitude: tempCoordinates.latitude,
          longitude: tempCoordinates.longitude,
       }),
      }).then(response => response.json())
      .then(data => {
      if (data.result) {
    };
    });
        
    };

   

return(
<MapView
 initialRegion={{
   latitude: 48.866667,
   longitude:2.333333  ,
   latitudeDelta: 0.0922,
   longitudeDelta: 0.0421,
 }}
 style={{ flex: 1 }}
 mapType="hybrid"
>
<Marker onLongPress={(e) => handleLongPress(e)} pinColor={'orange'} coordinate={{ latitude: 48.866667, longitude:2.333333 }} style={styles.map} />
</MapView>

);
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
    },
    map: {
      flex: 1,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modalView: {
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    input: {
      width: 150,
      borderBottomColor: '#ec6e5b',
      borderBottomWidth: 1,
      fontSize: 16,
    },
    button: {
      width: 150,
      alignItems: 'center',
      marginTop: 20,
      paddingTop: 8,
      backgroundColor: '#ec6e5b',
      borderRadius: 10,
    },
    textButton: {
      color: '#ffffff',
      height: 24,
      fontWeight: '600',
      fontSize: 15,
    },
  });
  
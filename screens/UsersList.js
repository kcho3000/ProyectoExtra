import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";

import firebase from "../database/firebase";
import { usarEstado } from "../hook";


const Peliculascreen = (props) => {
  const [Peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    firebase.db.collection("Peliculas").onSnapshot((querySnapshot) => {
      console.log("entro query normal")
      const Peliculas = [];
      querySnapshot.docs.forEach((doc) => {
        const { Director,Fecha,Nombre } = doc.data();
        Peliculas.push({
          id: doc.id,
          Director,
          Fecha,
          Nombre,
        });
      });
      setPeliculas(Peliculas);
      setLoading(false);
    });
  }, []);
    
  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {Peliculas.map((user) => {
          return (
            <View>
            <ListItem
              key={user.id}
              bottomDivider
              onPress={() => {
                  props.navigation.navigate("UserDetailScreen", {
                    PeliculaId: user.id,
                  });
              }}
            >
              <ListItem.Chevron />
              <Avatar
                source={{
                  uri:
                    "https://cdn-icons-png.flaticon.com/512/2459/2459778.png"
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{user.Nombre}</ListItem.Title>
                <ListItem.Subtitle>{user.Director} </ListItem.Subtitle>
                <ListItem.Subtitle>{user.Fecha} </ListItem.Subtitle>
              </ListItem.Content>
            </ListItem>
            </View>
          );
        })}
       
       
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  scroll:{
  },
  container:{
    flex: 1,
    padding: 1,
    top: 15
  },
  fixToText: {
   position:'absolute',
   bottom: 0, 
   alignSelf: "flex-end",
    borderRadius: 100,
    backgroundColor: "#1DB6F7",
    marginHorizontal: "1%",

    textAlign: "center",
    flexDirection: 'row',
  },
  color: {
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 100,
    backgroundColor: "red"
  },
  loader: {
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    position: "absolute",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default Peliculascreen;

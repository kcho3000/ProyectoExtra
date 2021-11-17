import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";


import { usarEstado } from "../hook";


const Peliculastop = (props) => {
  const [Peliculas, setPeliculas] = useState([]);

 
    
    function postPeliculas() {
      const response =  fetch("https://imdb-api.com/en/API/Top250Movies/k_v4fq9pap", {
      method: 'GET',
      headers: {'Content-Type': 'application/json'}
      }).then((response) => response.json())
    .then((responseJson) => {
       console.log(responseJson);setPeliculas(responseJson.items);
    })
    .catch((error) => {
      //Erroralert(JSON.stringify(error));
      console.error(error);
    });
    }
  
    useEffect(()=>{
      postPeliculas()
    },[]);
    
  

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scroll}>
        {Peliculas.map((user) => {
          return (
            <View>
            <ListItem
              
              
            >
              <ListItem.Chevron />
              <Avatar
                source={{
                  uri:
                  user.image
                }}
                rounded
              />
              <ListItem.Content>
                <ListItem.Title>{user.title}Nombre</ListItem.Title>
                <ListItem.Subtitle>{user.year} Fecha de salida</ListItem.Subtitle>
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

export default Peliculastop;
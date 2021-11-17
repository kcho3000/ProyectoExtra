import React, { useState, useEffect } from "react";
import { StyleSheet, View, TouchableOpacity, Text, ActivityIndicator } from "react-native";
import { ListItem, Avatar, Icon } from "react-native-elements";
import { ScrollView } from "react-native-gesture-handler";
import { usarEstado } from "../hook";
import firebase from "../database/firebase";

const UserListxNombre = (props) => {
  const seteo = usarEstado (state => state.seteo)
  const nombre = usarEstado (state => state.nombre)
  
  const [Peliculas, setPeliculas] = useState([]);
  const [loading, setLoading] = useState(true);

  
  
    useEffect(() => {
    setLoading(true);
      firebase.db.collection("Peliculas").where("Nombre", "==", nombre)
      .get()
      .then((querySnapshot) => {
        
        const Peliculas = [];
        querySnapshot.docs.forEach((doc) => {
          const { Nombre, Director, Fecha, } = doc.data();
          
          Peliculas.push({
            id: doc.id,
            Nombre,
            Director,
            Fecha,
            
          });
        });
        setPeliculas(Peliculas);
        console.log(users)
      });
    setLoading(false);
    }, [nombre]);

    if (loading) {
      return (
        <View style={styles.loader}>
          <ActivityIndicator size="large" color="#9E9E9E" />
        </View>
      );
    }

  return (
    <View>
    <ScrollView>
    <View>
      {Peliculas.map((user) => {
     
      //if(user.id!=undefined){
        //console.log('entro')
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
              <ListItem.Subtitle>{user.Director}</ListItem.Subtitle>
              <ListItem.Subtitle>{user.Fecha}</ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
          </View>
        );
        }
      )}
     
    </View>
    </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  texto: {
    fontSize: 20,
    paddingLeft: 20,
    fontWeight: "bold"
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

export default UserListxNombre;

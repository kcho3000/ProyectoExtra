import React, { useState } from "react";
import {
  Button,
  View,
  StyleSheet,
  TextInput,
  ScrollView,
  Picker,
  Text
} from "react-native";

import firebase from "../database/firebase";

const AddUserScreen = (props) => {
  const initalState = {
    Nombre: '',
    Director: '',
    Fecha: '',
    
  };

  const [state, setState] = useState(initalState);

  const setValues = (value, Nombre) => {
    setState({ ...state, [Nombre]: value });
  };

  const createNewPacient = async () => {
    if (state.nombre === "") {
      alert("¡Nombre no proporcionado!");
    } else {
      try {
        await firebase.db.collection("Peliculas").add({
          Nombre: state.Nombre,
          Fecha: state.Fecha,
          Director: state.Director,
          
        });

        props.navigation.navigate("UsersList");
      } catch (error) {
        console.log(error)
      }
    } 
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Nombre:" placeholderTextColor="black"
          onChangeText={(value) => setValues(value, "Nombre")}
          value={state.Nombre}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Director:" placeholderTextColor="black"
          onChangeText={(value) => setValues(value, "Director")}
          value={state.Director}
        />
      </View>
      <View style={styles.inputGroup}>
        <TextInput placeholder="Año:" placeholderTextColor="black"
          onChangeText={(value) => setValues(value, "Fecha")}
          value={state.Fecha}
        />
      </View>
      <View style={styles.inputGroup}>
        <Button title="Añadir pelicula" onPress={() => createNewPacient()} />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 35,
  },
  inputGroup: {
    flex: 1,
    padding: 0,
    marginBottom: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
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
  picker: {
    height: 30,
    width: 30
  },
  textStyle: {
    opacity: 20
  }
});

export default AddUserScreen;

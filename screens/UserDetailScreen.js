import React, { useEffect, useState } from "react";
import {
  ScrollView,
  Button,
  View,
  Alert,
  ActivityIndicator,
  StyleSheet,
  Picker,
  Text
} from "react-native";
import { TextInput } from "react-native-gesture-handler";

import firebase from "../database/firebase";

const PeliculaDetailScreen = (props) => {
  const initialState = {
    id: "",
    Nombre: '',
    Director: '',
    Fecha: ''
  };

  const [Pelicula, setPelicula] = useState(initialState);
  const [loading, setLoading] = useState(true);

  const handleTextChange = (value, prop) => {
    setPelicula({ ...Pelicula, [prop]: value });
  };

  const getPeliculaById = async (id) => {
    const dbRef = firebase.db.collection("Peliculas").doc(id);
    const doc = await dbRef.get();
    const Pelicula = doc.data();
    setPelicula({ ...Pelicula, id: doc.id });
    setLoading(false);
  };

  const deletePelicula = async () => {
    setLoading(true)
    const dbRef = firebase.db
      .collection("Peliculas")
      .doc(props.route.params.PeliculaId);
    await dbRef.delete();
    setLoading(false)
    props.navigation.navigate("UsersList");
  };

  const openConfirmationAlert = () => {
    Alert.alert(
      "Borrar Pelicula",
      "¿seguro?",
      [
        { text: "Si", onPress: () => deletePelicula() },
        { text: "No", onPress: () => console.log("canceled") },
      ],
      {
        cancelable: true,
      }
    );
    console.log(Pelicula.id)
  };

  const updatePelicula = async () => {
    const PeliculaRef = firebase.db.collection("Peliculas").doc(Pelicula.id);
    await PeliculaRef.set({
      Nombre: Pelicula.Nombre,
     Director: Pelicula.Director,
      Fecha: Pelicula.Fecha,
      
    });
    setPelicula(initialState);
    props.navigation.navigate("UsersList");
  };

  useEffect(() => {
    
    getPeliculaById(props.route.params.PeliculaId);

  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputGroup}>
        <Text style={styles.TextStyle}>Nombre del Pelicula</Text>
        <TextInput
          placeholder="Nombre"
          value={Pelicula.Nombre}
          onChangeText={(value) => handleTextChange(value, "Nombre")}
        />
      </View>
      <View  style={styles.inputGroup}>
        <Text style={styles.TextStyle}>Director</Text>
        <TextInput
          placeholder="Director"
          value={Pelicula.Director}
          onChangeText={(value) => handleTextChange(value, "Director")}
        />
      </View>
      <View  style={styles.inputGroup}>
        <Text style={styles.TextStyle}>Fecha</Text>
        <TextInput
          placeholder="Fecha"
          value={Pelicula.Fecha}
          onChangeText={(value) => handleTextChange(value, "Fecha")}
        />
      </View>
      
      <View style={styles.btn}>
      <Button title="Actualizar" onPress={() => updatePelicula()} color="#19AC52" />
      <Button
        style={styles.btn1} 
          title="Borrar Pelicula"
          onPress={() => openConfirmationAlert()}
          color="red"
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10
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
  inputGroup: {
    marginBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#cccccc",
  },
  btn: {
    marginTop: 5,
    marginBottom: 15,
    padding:2
  },
  btn1: {
    marginTop: 20
  },
  TextStyle: {
    fontWeight: 'bold'
  }
});

export default PeliculaDetailScreen;

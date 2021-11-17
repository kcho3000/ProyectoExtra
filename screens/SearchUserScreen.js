import React, { useState,useEffect} from "react";
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image
} from "react-native";

import {TextInput} from 'react-native-paper'
import { Icon } from 'react-native-elements'

import { usarEstado } from "../hook";

const AddUserScreen  = (props) =>{

  const seteo = usarEstado (state => state.seteo)

  return (
    <ScrollView>
      <View style={styles.view}>
    <Image style={styles.logo} source={require('../assets/lupa.png')}/>
        <TextInput
          placeholder="Nombre de una pelicula" 
          style={styles.input}
          onChangeText={(value) => seteo(value)}
        />
        <TouchableOpacity style={styles.Button1}
          bottomDivider
          onPress={() => props.navigation.navigate("UsersListxNombre")}
          >
            <View style={styles.viewTouchables}>
              <Icon name="search" size={50} color="black"/>
              <Text style={styles.TextStyle2}>
                Nombre
              </Text>
          </View>
        </TouchableOpacity>
        
       
        <TouchableOpacity  style={styles.Button3} onPress={() => props.navigation.navigate("UsersList")}>
            <Text style={styles.TextStyle}>
              Lista de peliculas
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.Button1}
          bottomDivider
          onPress={() => props.navigation.navigate("Peliculastop")}
          >
            <View style={styles.viewTouchables}>
              <Text style={styles.TextStyle2}>
              Top 250 peliculas
              </Text>
          </View>
        </TouchableOpacity>
        </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  /*container: {
    flex: 1,
    padding:10
  },*/
  viewTouchables:{
    flexDirection:'row',
    paddingHorizontal:35
    
  },
  logo:{
    width: "50%",
    height: 225,
    marginTop:30,
    marginBottom:20
},
view:{
    flex:1,
    alignItems: 'center',
    marginTop: 50
},
  input: {
      borderWidth: 1,
      width: "75%",
      height: 50,
      marginTop: 20,
      borderBottomColor: "blue"
  },
  Button1: {
    width: 264,
    height:50,
    marginTop:18,
    flexDirection:'row',
    borderRadius: 30,
    paddingHorizontal:30,
    backgroundColor: "#FF93F7",
    textAlign: "center"
  },
  Button3: {
    width: 264,
    height: 50,
    marginTop:40,
    borderRadius: 30,
    paddingHorizontal:50,
    backgroundColor: "#1DB6F7",
    flexDirection:'row',
    justifyContent: "center"
  },

  ButtonView:{
    flex: 1,
    padding: 25,
    alignItems: "center",
    justifyContent:'space-between',
  },
  TextStyle:{
    color:'#FFFFFF',
    textAlign:'center',
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center"
  },
  TextStyle2:{
    color:'#FFFFFF',
    textAlign:'center',
    fontSize: 20,
    textAlignVertical: "center",
    textAlign: "center",
    justifyContent: "center"
  }
});

export default AddUserScreen;

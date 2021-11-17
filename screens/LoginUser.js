import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Alert,
    TouchableOpacity,
    ActivityIndicator
  } from 'react-native';
  import {TextInput} from 'react-native-paper'
  import { Icon } from 'react-native-elements'
  import {validateEmail} from "../database/validation";
  import firebase from '../database/firebase';
import { useNavigation } from "@react-navigation/native";
import { usarEstado } from "../hook";
import { useEffect } from "react";
const LoginUser = (props) =>{
  const { changeForm } = props;
  const seteoEmail = usarEstado (state => state.seteoEmail)
  const navigation = useNavigation()

  const [formData, setFormData] = useState('');
  const [formError, setFormError] = useState({});
  const [loading, setLoading] = useState(false);

  const login = () => {
  
    setLoading(true);

      let error ={};
      var cadena = formData.email;

      if(cadena.slice(cadena.length -1 , cadena.length) == " "){
        cadena = cadena.slice(0, -1);
        console.log("Email:" + cadena);
        seteoEmail(cadena);
      }

          firebase.auth.signInWithEmailAndPassword(cadena,formData.password)
          .then(()=>{
              console.log("Sesión Iniciada.");
              Alert.alert(
                "Sesión iniciada",
                "Iniciaste sesión correctamente.",
                [
                  { text: "Ok", onPress: () => setLoading(false) },
                ],
                {
                  cancelable: true,
                }
              );
              navigation.navigate('Inicio');
          })
          .catch((err)=>{
              setFormError({
                  email:true,
                  password:true
              });
              openAlert();
              console.log(err)
          });
  setFormError(error);
  };

  const openAlert = () => {
    Alert.alert(
      "ERROR",
      "Datos de usuario incorrectos.",
      [
        { text: "Ok", onPress: () => setLoading(false) },
      ],
      {
        cancelable: true,
      }
    );
  };

  const onChange=(e,type)=>{
      setFormData({...formData,[type]:e.nativeEvent.text});
  };

  useEffect(() => {
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#9E9E9E" />
      </View>
    );
  }
    return (
    <>
      <TextInput
          placeholder= "Correo electrónico"
          style={[styles.input,formError.email]}
          onChange={(e)=>onChange(e,"email")}
          onChangeText={(value) => seteoEmail(value)}
      />
      <TextInput
          placeholder= "Contraseña"
          secureTextEntry={true}
          style={[styles.input,formError.password]}
          onChange={(e)=>onChange(e,"password")}
      />
        <TouchableOpacity style={styles.Button1} onPress={login}>< Text style={styles.TextStyle}>
              Iniciar Sesión
            </Text></TouchableOpacity>
        <TouchableOpacity style={styles.Button2} onPress={changeForm} >< Text style={styles.TextStyle2}>
              Registrarse
            </Text></TouchableOpacity>
      </>
    )
    
}

const styles = StyleSheet.create({
  input: {
      borderWidth: 1,
      width: "75%",
      height: 50,
      marginTop: 20,
      borderBottomColor: "blue"
  },
  Button1: {
    width: 180,
    height:50,
    marginTop:30,
    flexDirection:'row',
    borderRadius: 30,
    paddingHorizontal:30,
    backgroundColor: "#42B147",
    textAlign: "center",
    justifyContent: "center"
  },
  Button2: {
    width: 180,
    height: 50,
    borderRadius: 30,
    paddingHorizontal:30,
    marginTop:15,
    backgroundColor: "#1DB6F7",
    flexDirection:'row',
    justifyContent: "center"
  },
  ButtonView: {
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
})

export default LoginUser;
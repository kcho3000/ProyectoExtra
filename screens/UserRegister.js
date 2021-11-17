import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    TouchableOpacity,
    ScrollView,
    Alert
  } from 'react-native';
  import { validateEmail } from '../database/validation';
  import firebase from "../database/firebase";
  import {TextInput} from 'react-native-paper';
  import { Icon } from 'react-native-elements';
  //import { Icon } from '@expo/vector-icons';

const Uservalidaciones = (props) => {
  const { changeForm } = props;
  const [formData, setFormData] = useState(defaultValue);
  const [formError, setFormError] = useState({});
  const initalState = {
    nombre: '',
    email: '',
    telefono: '',
    direccion: '',
    intM: ''
  };
  const [state, setState] = useState(initalState);
  const setValues = (value, nombre) => {
    setState({ ...state, [nombre]: value });
  };
  const validaciones = async () => {
    console.log("Registrando...")
    let error = {};

    if(!formData.email || !formData.password || !formData.confirmPass){
      if (!formData.email) { 
        openAlert("escribeEmail");
        error.email = true;
      }
      if (!formData.password) {
        openAlert("escribeContra");
        error.password = true;
      }
      if (!formData.confirmPass) {
        openAlert("contraNoCoincide")
        error.confirmPass = true;
      }
    }
    else if (state.email == "") { 
      openAlert("escribeEmail");
      error.email = true;
    }
    else if(!validateEmail(formData.email)){
      error.email = true;
      openAlert("email");
      //console.log('Email mal escrito...')
    }
    else if(formData.password.length < 6){
      error.password = true;
      openAlert("pass");
      //console.log('Contraseña debe tener al menos 6 caracteres.')
    }
    else if(formData.password === ""){
      openAlert("escribeContra");
    }
    else if(formData.password != formData.confirmPass){
      openAlert("contraNoCoincide");
    }
    else if (state.email === ""  ||state.password ===""||state.confirmPass==="" ) {
      openAlert("demas");
    }
    else {
      registroEmail();
    }
    setFormError(error);
  }
  
  const openAlert = (datoIncorrecto) => {
    if(datoIncorrecto == "email"){
      Alert.alert(
        "ERROR",
        "Email inválido.",
        [
          { text: "Ok", onPress: () => console.log("Alert 'email' cerrado.") },
        ],
        {
          cancelable: true,
        }
      );
    }
    else if(datoIncorrecto == "pass"){
      Alert.alert(
        "ERROR",
        "La contraseña debe tener al menos 6 caracteres.",
        [
          { text: "Ok", onPress: () => console.log("Alert 'contraseña' cerrado.") },
        ],
        {
          cancelable: true,
        }
      );
    }
    else if(datoIncorrecto == "demas"){
      Alert.alert(
        "ERROR",
        "Todos los datos son obligatorios.",
        [
          { text: "Ok", onPress: () => console.log("Alert 'datos obligatorios' cerrado.") },
        ],
        {
          cancelable: true,
        }
      );
    }
    else if(datoIncorrecto == "contraNoCoincide"){
      Alert.alert(
        "ERROR",
        "Las contraseñas no coinciden.",
        [
          { text: "Ok", onPress: () => console.log("Alert 'pass no coinciden' cerrado.") },
        ],
        {
          cancelable: true,
        }
      );
    }
    else if(datoIncorrecto == "escribeContra"){
      Alert.alert(
        "ERROR",
        "Por favor, escribe una contraseña.",
        [
          { text: "Ok", onPress: () => console.log("Alert 'sin pass' cerrado.") },
        ],
        {
          cancelable: true,
        }
      );
    }
    else if(datoIncorrecto == "escribeEmail"){
      Alert.alert(
        "ERROR",
        "Por favor, proporciona tu email.",
        [
          { text: "Ok", onPress: () => console.log("Alert 'sin email' cerrado.") },
        ],
        {
          cancelable: true,
        }
      );
    }
  };

  const registroEmail = () => {
    firebase.auth.createUserWithEmailAndPassword(formData.email, formData.password)
    .then(() => {
      console.log("Cuenta creada con éxito.")
      createNewUser();
    }).catch(() => {
      setFormError({
        email: true,
        password: true,
        confirmPass: true
      });
    });
  }

  const createNewUser = async () => {
    var cadena = state.email;
    if(cadena.slice(cadena.length -1 , cadena.length) == " "){
      cadena = cadena.slice(0, -1);
      //console.log("Email:" + cadena);
      seteoEmail(cadena);
    }
      try {
        await firebase.db.collection("usuarios").add({
          nombre: state.nombre,
          email: cadena,
          telefono: state.telefono,
          direccion: state.direccion,
          intM: state.intM
        });
        Alert.alert(
          "Cuenta creada con éxito.",
          "Presiona el botón 'Inicia sesión' para iniciar sesión",
          [
            { text: "Ok", onPress: () => console.log("Alert 'cuenta creada' cerrado.") },
          ],
          {
            cancelable: true,
          }
        );
        console.log("Usuario registrado.")
        //props.navigation.navigate("Auth");
      } catch (error) {
        console.log(error)
      }
  };
  return (
    <>
   
    <View style={styles.item}>
      <View style={styles.iconContent}>
        <Icon style={styles.icon}  name='contact-mail' color='#26A69A'  />
      </View>
      <View style={styles.infoContent}>
      <TextInput
          style={[styles.input,formError.email && styles.errorInput]}
          placeholder="Correo electrónico"
          placeholderTextColor="#969696"
          onChange = {(e)=>setFormData({...formData, email:e.nativeEvent.text})}
          onChangeText={(value) => setValues(value, "email")}
          value={state.email}
      />
      </View>
    </View>
    <View style={styles.item}>
      <View style={styles.iconContent}>
        <Icon style={styles.icon}  name='vpn-key' color='#26A69A'/>
      </View>
      <View style={styles.infoContent}>
      <TextInput
          style={[styles.input,formError.password && styles.errorInput]}
          placeholder="Contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange = {(e)=>setFormData({...formData, password:e.nativeEvent.text})}
      />
      </View>
    </View>
    <View style={styles.item}>
      <View style={styles.iconContent}>
        <Icon style={styles.icon}  name='vpn-key' color='#26A69A'  />
      </View>
      <View style={styles.infoContent}>
      <TextInput
          style={[styles.input,formError.confirmPass && styles.errorInput]}
          placeholder="Repetir contraseña"
          placeholderTextColor="#969696"
          secureTextEntry={true}
          onChange = {(e)=>setFormData({...formData, confirmPass:e.nativeEvent.text})}
      />
      
      </View>
    </View>
     
        <TouchableOpacity style={styles.Button1} onPress={()=>{validaciones();}}>
            <Text style={styles.TextStyle}>Regístrate</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.Button2} onPress={changeForm}>
            <Text style={styles.TextStyle}>Iniciar sesión</Text>
        </TouchableOpacity>
      </>
     
  )

}

function defaultValue() {
  return { 
    email: {},
    password: {},
    confirmPass: {}
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:10,
    flex: 1,
    padding: 0,
    marginBottom: 15,
    marginTop: 50,
    textAlign:'center',
  
  },
  input: {
      borderWidth: 1,
      width:"85%",
      height:30,
      borderBottomColor: "blue"
  },
  Button1: {
    width: 180,
    height:50,
    marginTop:15,
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
    marginTop:10,
    backgroundColor: "#1DB6F7",
    flexDirection:'row',
    justifyContent: "center"
  },
  ButtonView: {
    flex: 1,
    padding: 40,
    alignItems: "center",
    justifyContent:'space-between',
  },
  TextStyle:{
    color:'#FFFFFF',
    textAlign:'center',
    fontSize: 19,
    textAlignVertical: "center"
  },
  item:{
    flexDirection : 'row',
  },
  infoContent:{
    flex: 3,
    alignItems:'flex-start',
    justifyContent: 'flex-start'
  },
  iconContent:{
    alignItems:'flex-start',
    paddingLeft:25
  },
  icon:{
    width:35,
    height:35,
    marginTop:5,
  },
  info:{
    fontSize:16,
    marginTop:30,
    color: "black",
  },
  errorInput:{
      borderColor: "#940c0c"
  }

})

  export default Uservalidaciones;
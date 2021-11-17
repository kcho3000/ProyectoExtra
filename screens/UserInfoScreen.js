import React, { useEffect, useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    Image,
    Button
  } from 'react-native';
  import { Icon } from 'react-native-elements'
  import { usarEstado } from "../hook";
  import firebase from "../database/firebase";

const userInfoScreen = (props) =>
{
  const email = usarEstado (state => state.email)
  console.log("email: " + email);
  const [users, setusers] = useState([]);
  useEffect(() => {
    
  }, );
  
    const logout = ()=>{
      firebase.auth.signOut();
      props.navigation.navigate("Auth");
    
    }
    return (
        
              <View style={ styles.info  }>
              <Button color="#9B181C" title = "cerrar sesión" onPress={logout}></Button>
              </View>
        
      );
      
}

const styles = StyleSheet.create({
    header:{
      backgroundColor: "#B100CF",
    },
    headerContent:{
      padding:30,
      alignItems: 'center',
    },
    avatar: {
      width: 130,
      height: 130,
      borderRadius: 63,
      borderWidth: 4,
      borderColor: "white",
      marginBottom:10,
    },
    name:{
      fontSize:22,
      color:"#000000",
      fontWeight:'600',
    },
    userInfo:{
      fontSize:16,
      color:"#778899",
      fontWeight:'600',
    },
    body:{
      backgroundColor: "#DEDEDE",
      height:350,
      alignItems:'center',
    },
    item:{
      flexDirection : 'row',
    },
    infoContent:{
      flex: 4,
      alignItems:'flex-start',
      paddingRight:20,
      justifyContent: 'flex-start'
    },
    iconContent:{
      flex:1,
      alignItems:'flex-start',
      paddingLeft:10
    },
    icon:{
      width:60,
      height:60,
      marginTop:10,
    },
    info:{
      fontSize:20,
      marginTop:600,
      color: "black",
    }
  });
export default userInfoScreen;
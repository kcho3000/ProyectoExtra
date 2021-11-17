import { StatusBar } from "expo-status-bar";
import React , { useEffect, useState } from "react";
import { StyleSheet, LogBox } from "react-native";
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import firebase from './database/firebase';


// Navigation
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


// Components
import CreateUserScreen from "./screens/CreateUserScreen";
import UserDetailScreen from "./screens/UserDetailScreen";
import UsersList from "./screens/UsersList";
import UsersListxNombre from "./screens/UserListxNombre";
import SearchUserScreen from './screens/SearchUserScreen';
import UserInfoScreen from './screens/UserInfoScreen';
import LoginUser from './screens/LoginUser'
import UserRegister from "./screens/UserRegister";
import Peliculastop from "./screens/Top250movies";
import Auth from './screens/Auth'


LogBox.ignoreAllLogs();
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function MyStack(){
  return (<Stack.Navigator  >
    <Stack.Screen name="Auth" options={{
    title: 'Inicio'
  }} component={Auth} />
    <Stack.Screen name="Inicio" component={Inicio}   options={{
    headerShown: false
  }}/>
    <Stack.Screen name="UserDetailScreen" options={{
    title: 'Detalles de Pelicula'
  }} component={UserDetailScreen} />
  <Stack.Screen name="Peliculastop" options={{
    title: 'Top 250'
  }} component={Peliculastop} />
    <Stack.Screen 
    name="UsersListxNombre" options={{
    title: 'Resultados por nombre'
  }} component={UsersListxNombre} />
   
  
    </Stack.Navigator>);
}

function Inicio() {
  return (
    <Tab.Navigator
      tabBarOptions={{
        activeTintColor: '#26A69A',
        inactiveTintColor: 'gray'
      }}
    >
       <Tab.Screen
        name="SearchUserScreen"
        component={SearchUserScreen}
        options={{ tabBarLabel: "Buscar", tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="magnify" color={color} size={26}/>
          ), }}
      />
      <Tab.Screen
        name="UsersList"
        component={UsersList}
        options={{ tabBarLabel: "Mis Pelis", tabBarIcon: ({color}) => (
          <MaterialCommunityIcons name="movie-open" color={color}  size={26}/>
          ), }}
      />
      <Tab.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{ tabBarLabel:"Agregar", tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="plus-circle-outline" color={color} size={26}/>
          ), }}
      />
     <Tab.Screen
        name="UserInfoScreen"
        component={UserInfoScreen}
        options={{ tabBarLabel:"Salir", tabBarIcon: ({ color }) => (
          <MaterialCommunityIcons name="exit-run" color={color} size={26}/>
          ), }}
      />



      
       
    </Tab.Navigator>
  );
}

export default function App() {
  const [user,setUser] = useState(undefined);

  useEffect(()=>{
    firebase.auth.onAuthStateChanged((response)=>{
      setUser(response);
    })
  },[]);
//console.log(user)
  if(user === undefined) return null;

  

  return (
    <NavigationContainer>
      <MyStack />
      
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

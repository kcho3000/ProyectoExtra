import React, {useState} from 'react';
import {View,StyleSheet, Text, Image, Button, ScrollView} from 'react-native';
import LoginUser from './LoginUser';
import UserRegister from './UserRegister';

export default function Auth(){
    const [isLogin,setIsLogin] = useState(true);

    const changeForm = ()=>{
        setIsLogin(!isLogin);
    }

    return(
        
    <ScrollView>
        <View style={styles.view}>
            <Image style={styles.logo} source={require('../assets/inicio.png')}/>
            {isLogin ?(
                <LoginUser changeForm={changeForm}/>
            ):(
                <UserRegister changeForm={changeForm}/>
            )}
        </View>
    </ScrollView>
    );
}

const styles = StyleSheet.create({
    view:{
        flex:1,
        alignItems: 'center',
    },
    logo:{
        width: "50%",
        height: 200,
        marginTop:30,
        marginBottom:20
    }
})
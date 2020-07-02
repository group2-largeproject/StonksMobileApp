import * as React from 'react';
import react, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import{ useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030'

function LoginScreen({ navigation }) {

    const[error, setError] = useState('');
    const[userName, setUserName] = useState('');
    const[passWord, setPassword] = useState('');

    const clickHandler = () => {
        setError('login success!');
    }

    const clickHandler2 = () => {
            setError('Registration success!');
        }

    function CheckName(){
        if(userName=='jesus'){
            navigation.navigate('Home');
        }
        else setError('Wrong user name or password: '+ userName);
    }

    return (

        <View style={title.container}>

        <Image 
            source={require('./stocks.png')} 
            style={title.image}
        >
            
        </Image>

        <Text 
                style={title.titleCard}>STONKS
                
        </Text>

        <StatusBar style = "auto"/>

        <TextInput
            style={title.input}
            keyboardType = 'email-address'
            placeholder='e.g John Doe'
            onChangeText={userName => setUserName(userName)}
        />

        <TextInput
            style={title.input}
            keyboardType = 'default'
            placeholder='e.g PassWord'
            textContentType={'password'}
            secureTextEntry />

        <View style={title.ButtonContainer}>
            <Button 
                title="Login"
                onPress={CheckName}
            />
        </View>

        <TouchableOpacity style ={
            title.registerButton}
            onPress={clickHandler2}

        >
            <Text>New User? Register here!</Text>
        </TouchableOpacity>

        <Text style={title.status}>{error}</Text>
    
      </View>
    );
  }

  const title = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: _BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleCard: {
        color: _GRAY,
        fontWeight: 'bold',
        fontSize: 64,
        fontStyle: 'italic',
    },

    image: {
        flex: 1,
        resizeMode: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '100%'
    },

    ButtonContainer: {
        marginTop: 0,
        width: 150,
        height: 50,
    },

    registerButton: {
            marginTop: 0,
            marginLeft: 90,
            width: 250,
            height: 20,
        },

    status: {
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 32,
    },

    input: {
        borderWidth: 1,
        width: 250,
        borderColor: _GRAY,
        backgroundColor: 'white',
        padding: 8,
        margin: 10,
    }
});

  export default LoginScreen;
import * as React from 'react';
import react, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import{ useState } from 'react';
import { useIsFocused } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function LoginScreen({ navigation }) {

    const[error, setError] = useState('');
    const[username, setusername] = useState('');
    const[password, setPassword] = useState('');

    const isFocused = useIsFocused();

    const clickHandler = () => {
        setError('login success!');
    }

    const clickHandler2 = () => {
            navigation.navigate('Register');
        }

    const clickHandler3 = () => {
            navigation.navigate('Forgotpassword');
        }

    function CheckName(){
        if(username=='Jesus'&& password=='Pass'){
            navigation.navigate('Home', {userId: 40, User: username});
        }
        else setError('Invalid user name or password!');
    }

    return (
        <View style={title.container}>

        <Image 
            source={require('./StonksMainLogo.png')} 
            style={title.image}
        >
            
        </Image>

        <StatusBar style = "auto"/>

        <TextInput
            
            style={title.input}
            keyboardType = 'email-address'
            placeholder='e.g John Doe'
            onChangeText={username => setusername(username)}
        />

        <TextInput
            clearTextOnFocus={true}
            style={title.input}
            keyboardType = 'default'
            placeholder='e.g PassWord'
            textContentType={'password'}
            secureTextEntry 
            onChangeText={password => setPassword(password)}
        />

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

        <TouchableOpacity style ={
            title.ForgotButton}
            onPress={clickHandler3}
        >
            <Text> Forgot Password?</Text>
        </TouchableOpacity>

        <Text style={title.status}>{error}</Text>
    
      </View>
    );
  }

  const title = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: _GRAY,
        alignItems: 'center',
        justifyContent: 'center'
    },

    titleCard: {
        color: _BLUE,
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
        borderRadius: 5,
        borderColor: 'red',
        width: 150,
        height: 50,
    },

    registerButton: {
            marginTop: 0,
            marginLeft: 90,
            width: 250,
            height: 20,
    },

    ForgotButton: {
        marginTop: 5,
        marginLeft: 150,
        width: 250,
        height: 20,
    },


    status: {
        paddingTop: 5,
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: 18,
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
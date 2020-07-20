import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function validateEmail(inputText){
	var mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
	if(inputText.match(mailformat)){
	    return true;
	}
	else{
	    return false;
    }
}

function Register(){

    const BASE_URL = 'https://cop4331-large-group2.herokuapp.com/';
    const navigation = useNavigation();
    const[message, setMessage] = useState('');
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[confirmpassword, setconfirmPassword] = useState('');

    const clickHandler = () => {
        navigation.navigate('Login');
    }

    const doRegister = async event => 
    {
        event.preventDefault();     
        if( username == '' || password == '' || firstname == '' || lastname== '' || email=='' ){
            setMessage('Please fill all fields!');
        }
        else if(password.length<6){
            setMessage('Password must be longer than 8 digits!')
        }
        else if(confirmpassword!==password){
            setMessage('passwords do not match!');
        }
        else if(!validateEmail(email)){
            setMessage('Enter a valid Email!');
        }

        else{
            var js = 
            '{ "username":"' + username + 
            '","password":"' + password +
            '", "email":"' +  email +
            '", "firstName":"' + firstname +
            '", "lastName":"' + lastname
            +'"}';
            
            const response = await fetch(BASE_URL + 'register',
            {
                method: 'POST',
                headers: new Headers({'Content-Type':'application/json'}),
                body:js,
            })
            
            if(response.status ==200 ) {
                setMessage('Email send to' + email + 'Please check you inbox to sign in');
            }
            else(setMessage('Errors: ' + response.statusText));
        }
    }


    return (
        <View style={title.container}>
            <Text 
                style={title.titleCard}>Create Account
            </Text>
        
            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Firstname'
                onChangeText={firstname => setFirstname(firstname)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Lastname'
                onChangeText={lastname => setLastname(lastname)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Username'
                onChangeText={username => setUsername(username)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'email-address'
                placeholder='Email'
                onChangeText={email => setEmail(email)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Password'
                textContentType='password'
                secureTextEntry
                onChangeText={password => setPassword(password)}
            />                                                          

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Confirm Password'
                textContentType='password'
                secureTextEntry
                onChangeText={confirmpassword => setconfirmPassword(confirmpassword)}
            />
            <View style={title.ButtonContainer}>
                <Button 
                    title="Register"
                    onPress= {doRegister}
                />
            </View>
            <View style={title.ButtonContainer}>
                <Button 
                    title="Back to Login"
                    onPress= {clickHandler}
                />
            </View>

            <Text 
                style={title.message}>{message}
            </Text>
        </View>
        );
    }
export default Register;

const title = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 5,
        backgroundColor: _GRAY,
        alignItems: 'center',
        justifyContent: 'center'
    },
        input: {
            borderWidth: 1,
            width: 250,
            borderColor: _GRAY,
            backgroundColor: 'white',
            padding: 8,
            margin: 10,
        },
        
        titleCard: {
            color: _BLUE,
            fontWeight: 'bold',
            fontSize: 24,
            fontStyle: 'italic',
        },
    
        message: {
            color: 'red',
            fontWeight: 'bold',
            fontSize: 20,
            fontStyle: 'italic',
        },

        ButtonContainer: {
            marginTop: 0,
            borderRadius: 5,
            borderColor: 'red',
            width: 150,
            height: 50,
        },
    });
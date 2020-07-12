import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function Register(){

    const[error, setError] = useState('');
    const[firstname, setFirstname] = useState('');
    const[lastname, setLastname] = useState('');
    const[username, setUsername] = useState('');
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[Cpassword, setCPassword] = useState('');


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
            keyboardType = 'default'
            placeholder='Email'
            onChangeText={email => setEmail(email)}
        />

        <TextInput
            style={title.input}
            keyboardType = 'default'
            placeholder='Password'
            onChangeText={password => setPassword(password)}
        />

        <TextInput
            style={title.input}
            keyboardType = 'default'
            placeholder='Confirm Password'
            onChangeText={Cpassword => setCPassword(Cpassword)}
        />
        <LogButton ScreenName= "Login" />

        <Text 
                style={title.titleCard}>{error}
        </Text>
        </View>
    );
}
export default Register;

function LogButton({ScreenName}){
    const navigation = useNavigation();
    return(
      <Button
        title= 'SignUp'
        onPress={() => navigation.navigate(ScreenName)}
      />
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
    

        ButtonContainer: {
            marginTop: 0,
            borderRadius: 5,
            borderColor: 'red',
            width: 150,
            height: 50,
        },
    });
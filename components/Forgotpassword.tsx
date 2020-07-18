import * as React from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';


function Forgotpassword() {
    const[email, setEmail] = useState('');
    const[username, setuserName] = useState('');
    const[message, setMessage] = useState('');
    const navigation = useNavigation();
    const BASE_URL = 'https://cop4331-large-group2.herokuapp.com/';

    const clickHandler = () => {
        navigation.navigate('Login');
    }

    const doRecover = async (event: { preventDefault: () => void; }) => 
        {
            event.preventDefault();     
            if( email == '' ){
            alert('Please enter a valid email!');
            }
            else{
            var js = 
            '{ "username":"' + username +
            '","email":"' + email 
            +'"}';
            
            const response = await fetch(BASE_URL + 'api/forgot',
            {
                method: 'POST',
                headers: new Headers({'Content-Type':'application/json'}),
                body:js,
            })
            .catch((error) => setMessage(error))
            var res = JSON.parse(response.status);
            if(res==200){
                setMessage('Email send, please login again');
            }
            else(setMessage('Error: ' +res));
            }
    }

    return (
        <View style={title.container}>
            <Text style= {title.TextStyle}>Enter your email, </Text>
            <Text style= {title.TextStyle}>a temporary password will be send to your email. </Text>

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Username'
                onChangeText={username => setuserName(username)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'email-address'
                placeholder='Email'
                onChangeText={email => setEmail(email)}
            />

            <View style={title.ButtonContainer}>
                <Button 
                    title="Send Link"
                    onPress= {doRecover}
                />
            </View>

            <View style={title.ButtonContainer}>
                <Button 
                    title="Back to login"
                    onPress= {clickHandler}
                />
            </View>
            <Text style= {title.TextStyle}>{message}</Text>
        </View>

    );
}
export default Forgotpassword;


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

        ButtonContainer: {
            marginTop: 5,
            paddingTop: 0,
            borderRadius: 5,
            borderColor: 'red',
            width: 150,
            height: 50,
        },

        TextStyle: {
            color: _BLUE,
            alignContent: 'center',
            fontWeight: 'bold',
            fontSize: 12,
            fontStyle: 'italic',
        },
    })

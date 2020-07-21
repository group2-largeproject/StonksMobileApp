import * as React from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';


function Reset() {
    const[email, setEmail] = useState('');
    const[password, setPassword] = useState('');
    const[Cpassword, setCPassword] = useState('');
    const[message, setMessage] = useState('');
    const navigation = useNavigation();
    const BASE_URL = 'https://cop4331-large-group2.herokuapp.com/';

    const clickHandler = () => {
        navigation.navigate('Login');
    }

    const doUpdate = async (event: { preventDefault: () => void; }) => 
        {
            event.preventDefault();     
            if( email == '' || password =='' || Cpassword == '' ){
            alert('Please enter fill all fields!');
            }
            else if(password!=Cpassword){
                alert('Passwords do not match!')
            }
            else{
                var js = 
                '{ "email":"' + email +
                '","password":"' + password 
                +'"}';
                
                const response = await fetch(BASE_URL + 'api/reset',
                {
                    method: 'POST',
                    headers: new Headers({'Content-Type':'application/json'}),
                    body:js,
                })
                .catch((error) => setMessage(error))
                var res = JSON.parse(await response.text());
                if(res.error== ''){
                    setMessage('Password changed successfully!')
                }
                else(setMessage('Error: ' +res.error));
                }
            }

    return (
        <View style={title.container}>
            <Text style= {title.TextStyle}> Enter you email address to change your password </Text>
            <Text style= {title.TextStyle}> if you have recently forgotten and have a temporary one</Text>

            <TextInput
                style={title.input}
                keyboardType = 'email-address'
                placeholder='Enter email'
                onChangeText={email => setEmail(email)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='Enter Password'
                secureTextEntry
                onChangeText={password => setPassword(password)}
            />

            <TextInput
                style={title.input}
                keyboardType = 'default'
                placeholder='confirm Password'
                secureTextEntry
                onChangeText={Cpassword => setCPassword(Cpassword)}
            />

            <View style={title.ButtonContainer}>
                <Button 
                    title="Update Password"
                    onPress= {doUpdate}
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
export default Reset;


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

import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useNavigation } from '@react-navigation/native';
import { useRef } from 'react';
import{ useState } from 'react';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

const[error, setError] = useState('');
const[userName, setUserName] = useState('');
const[passWord, setPassword] = useState('');

function Register(){
    return (
        <View style={title.container}>
            <Text>
                style={title.titleCard}>STONKS
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
            fontSize: 64,
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

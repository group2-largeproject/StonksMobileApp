import * as React from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';


function Forgotpassword() {
    const[email, setEmail] = useState('');
    const[error, setError] = useState('');

    return (
        <View style={title.container}>
            <Text style= {title.TextStyle}>Enter your email, </Text>
            <Text style= {title.TextStyle}>a message will be send to you to recover your password. </Text>
            
     

        <TextInput
            style={title.input}
            keyboardType = 'email-address'
            placeholder='Email'
            onChangeText={email => setEmail(email)}
        />

        <LogButton Screen= "Passwordrecovery"/>

        </View>

    );

    function LogButton({Screen}){
        const navigation = useNavigation();
        return(
            <View style={title.ButtonContainer}>
                <Button 
                    title= 'Send Link'
                    onPress={() => {
                        if(emailcheck(email)){
                            navigation.navigate(Screen);
                        }
                        else(alert('Email Does not exist!'));
                    }
                }>
                </Button>
            </View>
        );
      }
    
      function emailcheck(emaildata){
        if(emaildata =='Test')
            return 1;
        else return 0;
      }
    
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
            fontSize: 13,
            fontStyle: 'italic',
        },
    })

import * as React from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';


function Passwordreset(){
    const[password, setPassword] = useState('');
    const[confirmation, setConfirmation] = useState('');
    const[error, setError] = useState('');

   

    return(
        <View style={title.container}>
                <Text style= {title.TextStyle}>Enter New Password </Text>

        <TextInput
            style={title.input}
            keyboardType = 'default'
            secureTextEntry
            placeholder='Enter new password'
            onChangeText={password => setPassword(password)}
        />
        <TextInput
            style={title.input}
            keyboardType = 'default'
            secureTextEntry
            placeholder='confirm new password'
            onChangeText={confirmation => setConfirmation(confirmation)}
        />

        <LogButton />
        <LoginButton ScreenName = "Login"/>

        <Text style={title.TextStyle}>{error}</Text>

        </View>
    );

    
    function LogButton(){
        const navigation = useNavigation();
        return(
            <View style={title.ButtonContainer}>
                <Button
                    title= 'Reset Password'
                    onPress={() => {
                        if(password!==confirmation){
                            setError('Passwords do not match!')
                        }
                        else(setError('Passwords changed successfully!'));  
                    }              
                }>
                </Button>
            </View>
        );
    }

    function LoginButton({ScreenName}){
        const navigation = useNavigation();
        return(
        <View style={title.ButtonContainer}>
            <Button
                title= 'Back to Login'
                onPress={() => navigation.navigate(ScreenName)}
            />
          </View>
        );
      }
}
export default Passwordreset;

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
            fontSize: 11,
            fontStyle: 'italic',
        },
    })

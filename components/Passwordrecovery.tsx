import * as React from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function Passwordrecovery() {
    const[code, setCode] = useState('');

    return (
        <View style={title.container}>
            <Text style= {title.TextStyle}>Enter recovery code: {code} </Text>

        <TextInput
            style={title.input}
            keyboardType = 'default'
            placeholder=''
            onChangeText={code => setCode(code)}
        />

        <LogButton Screen= "Passwordreset" />
       
        </View>

    );

    function LogButton({Screen}){
        const navigation = useNavigation();
        return(
            <View style={title.ButtonContainer}>
                <Button
                    title= 'Reset Password'
                    onPress={() => {
                        if(checkCode(code)==1){
                            navigation.navigate(Screen);
                        }
                        else(alert('Wrong code'));  
                    }              
                }>
                </Button>
            </View>
        );
    }
    
    function checkCode(data){
        if(data =="1234")
            return 1;
        else return 0;
      }
}
export default Passwordrecovery;

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

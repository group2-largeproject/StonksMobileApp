import * as React from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import{ useState } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, ActivityIndicator, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import { State } from 'react-native-gesture-handler';
import { useNavigation, NavigationContainer } from '@react-navigation/native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';
const BASE_URL = 'https://cop4331-large-group2.herokuapp.com/';
//login: childishgambino p4ssw0rd1

const storeData = async (value) => {
    try {
      await AsyncStorage.setItem('@user', value)
    } catch (e) {
      console.log(e);
    }
    console.log('Login saved: ' + value);
  }

export default class LoginScreen extends React.Component <{},any>{
  
    static navigationOptions = { title: 'Login' } 
    state: { 
        loginPassword: string, 
        loginUsername: string,
        message: string,
        error: string,
        isloading: boolean,
        ready: boolean,
        data: []
      } 
      
    constructor(props: Props) { 
        super(props); 
        this.state = { 
            isloading: true,
            loginUsername: 'childishgambino',
            loginPassword: 'p4ssw0rd1', 
            message: '',
            error: '',
            ready: false,
            data: []
        };
       
    } 

    handleUserChange = (data) => {
        this.setState({loginUsername: data})
    }
    handlePasswordChange = (data) => {
        this.setState({loginPassword: data})
    }
    handleReadystate = () => {
        this.setState({ready: true})
        console.log('ready state changed');
    }

    doLogin = async event => 
    {
        event.preventDefault();     
        if( this.state.loginUsername == '' || this.state.loginPassword == '' ){
        alert('Please fill out all fields!');
        }
        else{
            var js = 
            '{ "username":"' + this.state.loginUsername + 
            '","password":"' + this.state.loginPassword 
            +'"}';
            
            const response = await fetch(BASE_URL + 'api/login',
            {
                method: 'POST',
                headers: new Headers({'Content-Type':'application/json'}),
                body:js,
            })
            .catch((error) => this.setState({error: error}))
            .finally(() => this.setState({setLoading:false}));
            var res = JSON.parse(await response.text());
            this.setState({message: res.error})
            if(res.error==''){
                storeData(this.state.loginUsername);
                console.log(res.email);
                {this.props.navigation.navigate('Home', {screen: 'Feed'})}
            }
        }
    }   

    render() {
        const { data} = this.state;

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
                    placeholder='e.g johndoe@mail.com'
                    value = {this.state.loginUsername}
                    onChangeText = { this.handleUserChange }
                />

                <TextInput
                    clearTextOnFocus={true}
                    style={title.input}
                    keyboardType = 'default'
                    placeholder='e.g PassWord'
                    textContentType={'password'}
                    secureTextEntry={true}
                    value = {this.state.loginPassword}
                    onChangeText = { this.handlePasswordChange }
                />

                <View style={title.ButtonContainer}>
                    <Button 
                        title="Login"
                        onPress = {this.doLogin}
                    />
                </View>

                <TouchableOpacity style ={
                    title.registerButton}
                    onPress = { ()=> {this.props.navigation.navigate('Register')}}
                >
                <Text> No Account? Register here! </Text>
                </TouchableOpacity>

                <TouchableOpacity style ={
                    title.ForgotButton}
                    onPress = { ()=> {this.props.navigation.navigate('Forgotpassword')}}
                >
                <Text> Forgot Password?</Text>
                </TouchableOpacity>
                <Text style= {title.status}> {this.state.message}  </Text>

            </View>
        );
    }
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

    loader:{
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'flex-end',
        position:'absolute',
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
        color: 'red',
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
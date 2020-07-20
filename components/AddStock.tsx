import * as React from 'react';
import react, {Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-community/async-storage';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';
var _BLUE2 = '#1e88e5';
const BASE_URL = 'https://cop4331-large-group2.herokuapp.com/';

export default class AddStock extends React.Component <{},any>{
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      username: '',
      stock: '',
     };
   }

  handleUserChange = async () => {
    try {
      this.setState({ username: await AsyncStorage.getItem('@user')})
      if(this.state.username !== null) {
        console.log('found: ' + this.state.username)
      }
    } catch(e) {
      console.log(e);
    }  
  }

  componentDidMount(){
    this.handleUserChange();
  }
  handleStockChange = (data) => {
    this.setState({stock: data})
  }

  addStock = async event => 
    {
        var js = 
        '{ "username":"' + this.state.username + 
        '","stock":"' + this.state.stock 
        +'"}';
        
        const response = await fetch(BASE_URL + 'api/addStock',
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
            alert('Stock added!');
        }
        else(console.log(this.state.message));
    }

    deleteStock = async event => 
    {
        event.preventDefault();     
        if( this.state.loginUsername == '' || this.state.loginPassword == '' ){
        alert('Please fill out all fields!');
        }
        else{
            var js = 
            '{ "username":"' + this.state.username + 
            '","stock":"' + this.state.stock 
            +'"}';
            
            const response = await fetch(BASE_URL + 'api/deleteStock',
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
                alert('Stock removed!');
            }
            else(console.log('Delete Err for: ' + this.state.username + ' ' + this.state.message));
    }
  }

  render(){
    return (
        <View style={title.container}>
            
            <Text style={title.text}>Manage Stocks for {this.state.username} </Text>
            <TextInput
                    
                    style={title.input}
                    keyboardType = 'default'
                    placeholder='e.g CDAY'
                    value = {this.state.stock}
                    onChangeText = { this.handleStockChange }
              />
              <View style={title.ButtonContainer}>
                    <Button 
                        title="ADD"
                        onPress = {this.addStock}
                    />
                </View>
                <View style={title.ButtonContainer}>
                    <Button 
                        title="Remove"
                        onPress = {this.deleteStock}
                    />
                </View>
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
  
    logoffbutton: {
      paddingTop: 25,
      paddingLeft: 5,
      alignItems: 'flex-start',
      flexDirection:'row-reverse',
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

      marginTop: 0,
      borderRadius: 5,
      borderColor: 'red',
      width: 150,
      height: 50,
  },
    text: {
      flex: 0,
      fontSize: 18,
      height: 60,
      color: _BLUE,
      paddingTop: 25,
      paddingLeft: 5,
      justifyContent: 'flex-start'
    }
  })

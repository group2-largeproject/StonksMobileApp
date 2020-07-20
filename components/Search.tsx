import * as React from 'react';
import react, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { SearchBar } from 'react-native-elements';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';

import { 
  StyleSheet, 
  FlatList, 
  Text, 
  View, 
  Button, 
  TextInput, 
  TouchableOpacity, 
  ActivityIndicator,
 } from 'react-native';

var _BLUE = '#2196f3';
var _BLUE2 = '#1e88e5';
var _GRAY = '#303030';

export default class Search extends react.Component <{},any> {
  arrayholder: never[];

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        search: '',
        username: '',
        dataSource:[]
       };
       this.arrayholder = [];
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

    renderSeparator = () => {
      return (
        <View
          style={{
            height: 1,
            width: '86%',
            backgroundColor: '#CED0CE',
            marginLeft: '14%',
          }}
        />
      );
    };

    handleSearchChange = (data) => {
      this.setState({search: data})
    }

      //https://jsonplaceholder.typicode.com/users
     componentDidMount(){
      this.handleUserChange();
      fetch("https://dumbstockapi.com/stock?exchanges=NYSE")
      .then(res => res.json())
      .then((res)=> {
        this.setState({
         loading: false,
         dataSource: res
        })
        this.arrayholder = res.responseJson;
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      }

     

      searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.ticker.toUpperCase()} ${item.name.toUpperCase()}`;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          data: newData,
        });
      };
    

      FlatListItemSeparator = () => {
        return (
          <View 
            style={{
              height: .5,
              width:"100%",
              backgroundColor:"rgba(0,0,0,0.5)",
            }}
          />
        );
      }

      renderHeader = () => {
        return (
          <SearchBar
            placeholder="Type Here..."
            lightTheme
            round
            onChangeText={text => this.searchFilterFunction(text)}
            autoCorrect={false}
            value={this.state.value}
          />
        );
      };

      renderItem=(data)=>
        <TouchableOpacity 
          style={styles.list}
          onPress = { ()=> {this.props.navigation.navigate('AddStock')}}
        >
            <Text style={styles.lightText}>{data.item.name}</Text>
            <Text style={styles.lightText}>{data.item.ticker}</Text>
            
        </TouchableOpacity>
        
        render(){
          if(this.state.loading){
            return( 
              <View style={styles.loader}> 
                <ActivityIndicator size="large" color="#0c9"/>
              </View>
          )}
            return(
            <View style={styles.container}>
              
              <View style={styles.logoffbutton}>
                <LogButton ScreenName= "Login" /> 
              </View>
              <Text style={styles.text}> Search Stocks for {this.state.username} </Text>
              <TextInput
                    
                    style={styles.input}
                    keyboardType = 'default'
                    placeholder='e.g CDAY'
                    value = {this.state.search}
                    onChangeText = { this.handleSearchChange }
                />
              <View style={styles.listWindow}>
                <FlatList
                    data= {this.state.dataSource}
                    initialNumToRender = {10}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.ticker.toString()}
                />
              </View>
            </View>
          )
        }
      }
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: _BLUE,
      paddingTop: 0,
    },
    input: {
      borderWidth: 1,
      width: 250,
      borderColor: _GRAY,
      backgroundColor: 'white',
      padding: 8,
      margin: 10,
  },
    loader:{
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: _GRAY
    },
    logoffbutton: {
      flex: 0,
      paddingTop: 25,
      color: _GRAY,
      paddingLeft: 5,
      alignItems: 'flex-start',
      flexDirection:'row-reverse',
    },
    text:{
      paddingTop: 25,
      flex: 0,
      position: 'absolute',
      fontSize: 18,
      color: _GRAY,
      
    },
    listWindow: {
      flex: 0,
      height: 500,
    },
    list:{
      paddingVertical: 4,
      margin: 5,
      flexGrow: 1,
      backgroundColor: _BLUE2
    },
    lightText:{
      fontSize: 12,
      alignItems: 'flex-start',
    }
  });

function LogButton({ScreenName}){
    const navigation = useNavigation();
    return(
      <Button
        title= 'Logoff'
        onPress={() => navigation.navigate(ScreenName)}
      />
    );
  }

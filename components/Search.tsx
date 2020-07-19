import * as React from 'react';
import react, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
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
    
  static navigationOptions = ({ navigation }) => {
    return {
      title: "Source Listing",
      headerStyle: {backgroundColor: "#fff"},
      headerTitleStyle: {textAlign: "center",flex: 1}
     };
    };

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        dataSource:[]
       };
     }

     componentDidMount(){
      fetch("https://jsonplaceholder.typicode.com/users")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         loading: false,
         dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      }

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

      renderItem=(data)=>
        <TouchableOpacity style={styles.list}>
          <Text style={styles.lightText}>{data.item.name}</Text>
          <Text style={styles.lightText}>{data.item.email}</Text>
          <Text style={styles.lightText}>{data.item.company.name}</Text>
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
              <Text style={styles.text}> Search Stocks </Text>
              <View style={styles.listWindow}>
                <FlatList
                    data= {this.state.dataSource}
                    initialNumToRender = {9}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {item=> this.renderItem(item)}
                    keyExtractor= {item=>item.id.toString()}
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
      fontSize: 24,
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

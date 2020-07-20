import * as React from 'react';
import react, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation, useRoute  } from '@react-navigation/native';
import{ useState } from 'react';
import {
  LineChart,
  BarChart,
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart
} from "react-native-chart-kit";

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
import { BorderlessButton } from 'react-native-gesture-handler';

var _BLUE = '#2196f3';
var _BLUE2 = '#1e88e5';
var _GRAY = '#303030';
var _GRAY2 = '#003030';
const BASE_URL = 'https://cop4331-large-group2.herokuapp.com/';

const getData = async () => {
  try {
    const value = await AsyncStorage.getItem('@user')
    if(value !== null) {
      console.log('found: ' + value)
    }
  } catch(e) {
    console.log(e);
  }
}

interface Props {
  navigation: any
}

export default class Feed extends react.Component <{},any> {

    constructor(props) {
      super(props);
      this.state = {
        username: '',
        message: '',
        loading: true,
        dataSource:[]
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
    /* dummy api
     componentDidMount(){
      this.handleUserChange();
      fetch("https://reactnative.dev/movies.json")
      .then(response => response.json())
      .then((responseJson)=> {
        this.setState({
         loading: false,
         dataSource: responseJson
        })
      })
      .catch(error=>console.log(error)) //to catch the errors if any
      }
      */

    async componentDidMount() 
      {
        this.handleUserChange();
        var js = 
        '{"username":"' + this.state.username 
          +'"}';
        try{
          const response = await fetch(BASE_URL + 'api/getData',
          {
              method: 'POST',
              headers: new Headers({'Content-Type':'application/json'}),
              body:js,
          })
          var res = JSON.parse(await response.text());
          this.setState({
            loading: false,
            dataSource: res
            })
          if( res.error !=  '' )
            {
                console.log(this.state.username + ' ' + res.error);
                //returns error user doesnt exist, and the rest of data becomes undefined
            }
          }
          catch(e){
            console.log(e.toString());
          }
      }

      FlatListItemSeparator = () => {
        return (
          <View 
            style={{
              height: .5,
              width:"100%",
              backgroundColor:_BLUE,
            }}
          />
        );
      }

      renderItem=(data)=>
        <TouchableOpacity style={styles.list}>
          <Text style={styles.lightText}>{data.item.values}</Text>
          <Text style={styles.lightText}>{data.item.stocks}</Text>
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
              <Text style={styles.text}>welcome, {this.state.username} </Text>
             
              <LineChart
                data={{
                  labels: [
                    this.state.dataSource.dates[0],
                    //this.state.dataSource.movies[1].title,
                    //this.state.dataSource.movies[2].title,
                    //this.state.dataSource.movies[3].title,
                    //this.state.dataSource.movies[4].title,
                  ],
                  datasets: [
                    {
                      data: [1000, 2000, 3000, 
                        //this.state.dataSource.values[0],
                        //this.state.dataSource.movies[1].releaseYear,
                        //this.state.dataSource.movies[2].releaseYear,
                        //this.state.dataSource.movies[3].releaseYear,
                        //this.state.dataSource.movies[4].releaseYear,
                      ]
                    }
                  ]
                }}
                width={350} // from react-native
                height={200}
                yAxisLabel=""
                yAxisSuffix=""
                yAxisInterval={1} // optional, defaults to 1
                chartConfig={{
                  backgroundColor: _GRAY,
                  backgroundGradientFrom: _GRAY,
                  backgroundGradientTo: _GRAY,
                  decimalPlaces: 0, // optional, defaults to 2dp
                  color: (opacity = 1) => _BLUE,
                  labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                  style: {
                    borderRadius: 16
                  },
                  propsForDots: {
                    r: '0',
                    strokeWidth: "2",
                    stroke: _BLUE2
                  }
                }}
                bezier
                style={{
                  marginVertical: 8,
                  borderRadius: 16
                }}
              />
              <Text style={styles.text2}> My Stocks {this.state.dataSource.stocks[0]}</Text>
                
              <View style={styles.listWindow}>
                <FlatList
                    data= {this.state.dataSource.stocks}
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
      backgroundColor: _GRAY,
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
      paddingBottom: 10,
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
      color: _BLUE2,
      
    },
    text2:{
      flex: 0,
      paddingBottom: 10,
      paddingTop: 10,
      position: 'relative',
      fontSize: 24,
      color: _BLUE2,
      
    },
    list:{
      paddingVertical: 4,
      margin: 5,
      flexGrow: 0,
      height: 60,
      width: 350,
      backgroundColor: _BLUE2
    },
    listWindow: {
      flex: 0,
      paddingTop: 0,
      height: 300,
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
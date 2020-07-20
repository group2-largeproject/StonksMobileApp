import * as React from 'react';
import react, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import { useNavigation } from '@react-navigation/native';  
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
  SafeAreaView,
  SectionList
 } from 'react-native';
import { BorderlessButton } from 'react-native-gesture-handler';
import DrawerLayout from 'react-native-gesture-handler/DrawerLayout';

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
    static navigationOptions = { title: 'Feed' } 
    constructor(props) {
      super(props);
      this.state = {
        username: '',
        message: '',
        loading: true,
        isFetching: false,
        dataStocks:[],
        dataDates: [],
        dataValues: [],
        chartData: []
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
      return this.state.username; 
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

      setDate = () => {
        var date = new Date();
        return(date.getMonth()+1 + '/' + date.getDate() + '/' + date.getFullYear())
      }  

      async componentDidMount(){
       this.handleUserChange();

      }

      
      async componentDidUpdate(prevProps, prevState)
      {
        if(this.state.username !== prevState.username){
          console.log('user is: ' + this.state.username);
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
              dataStocks: res.stocks,
              dataDates: res.dates,
              dataValues: res.values,
  
            })

            if( res.error !=  '' )
              {
                  console.log(this.state.username + ': ' + res.error);
                  //returns error user doesnt exist, and the rest of data becomes undefined
              }
          }
          catch(e){
            console.log(e.toString());
          }
        }
      }
          
        
        
   
      Item = ({ title }) => (
        <View style={styles.item}>
          <Text style={styles.lightText}>{title}</Text>
        </View>
      );
      
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
        <Text style={styles.lightText}>     {data.index+1}.                        {data.item}</Text>
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
            <Text style={styles.text}>Welcome, {this.state.username} </Text>
            
            <LineChart
              data={{
                labels: [
                  this.state.dataDates[this.state.dataDates.length-4],
                  this.state.dataDates[this.state.dataDates.length-3],
                  this.state.dataDates[this.state.dataDates.length-2],
                  this.state.dataDates[this.state.dataDates.length-1],
                ],
                datasets: [
                  {
                    data: [ 
                      this.state.dataValues[this.state.dataDates.length-4],
                      this.state.dataValues[this.state.dataDates.length-3],
                      this.state.dataValues[this.state.dataDates.length-2],
                      this.state.dataValues[this.state.dataDates.length-1],
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
            <Text style={styles.text2}> Stock profit of {this.state.dataValues[this.state.dataValues.length-1]} as of:</Text>
            <Text style={styles.text2}> {this.setDate()} </Text>
            <View style={styles.listWindow}>
                <FlatList
                    data= {this.state.dataStocks}
                    ItemSeparatorComponent = {this.FlatListItemSeparator}
                    renderItem= {(item) => this.renderItem(item)
                     
                    }
                    keyExtractor= {(index)=> index.toString()}
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
      paddingBottom: 2,
      paddingTop: 0,
      alignSelf: 'center',
      fontSize: 24,
      color: _BLUE2,
      
    },
    item: {
      backgroundColor: _BLUE,
      padding: 20,
      marginVertical: 8
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
      fontSize: 18,
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
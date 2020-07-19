import * as React from 'react';
import react, {Component} from 'react';
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


interface Props {
  navigation: any
}

function MyText() {
  const route = useRoute();

  return <Text>hi</Text>;
}

export default class Feed extends react.Component <{},any> {

    constructor(props) {
      super(props);
      this.state = {
        loading: true,
        dataSource:[]
       };
     }

     componentDidMount(){
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
          <Text style={styles.lightText}>{data.item.title}</Text>
          <Text style={styles.lightText}>{data.item.releaseYear}</Text>
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
              <Text style={styles.text}>Stats for</Text>
             
              <LineChart
                data={{
                  labels: [
                    this.state.dataSource.movies[0].title,
                    this.state.dataSource.movies[1].title,
                    this.state.dataSource.movies[2].title,
                    this.state.dataSource.movies[3].title,
                    this.state.dataSource.movies[4].title,
                  ],
                  datasets: [
                    {
                      data: [
                        this.state.dataSource.movies[0].releaseYear,
                        this.state.dataSource.movies[1].releaseYear,
                        this.state.dataSource.movies[2].releaseYear,
                        this.state.dataSource.movies[3].releaseYear,
                        this.state.dataSource.movies[4].releaseYear,
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
              <Text style={styles.text2}> My Stocks </Text>
              <View style={styles.listWindow}>
                <FlatList
                    data= {this.state.dataSource.movies}
                  
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
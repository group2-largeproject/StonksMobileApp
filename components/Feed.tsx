import * as React from 'react';
import react, {Component} from 'react';
import { useNavigation, useRoute  } from '@react-navigation/native';
import{ useState, useEffect } from 'react';
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

const Item = ({ title, year}) => (
  <View style={styles.list}>
    <Text style={styles.lightText}>{title}</Text>
    <Text style={styles.lightText}>{year}</Text>
  </View>
);


export default function Feed({route, navigation}){
  const {user} = route.params;
  const [data, setData] = useState(['i']);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    fetch('https://reactnative.dev/movies.json')
      .then((response) => response.json())
      .then((json) => setData(json.movies))
      .catch((error) => console.error(error))
      .finally(() => setLoading(false));
  }, []);

  const renderItem = ({ item }) => (
    <Item title={item.title}
           year={item.releaseYear} />
  );
  
  
    return(
      
    <View style={styles.container}>
      
      <View style={styles.logoffbutton}>
        <LogButton ScreenName= "Login" /> 
      </View>
      <Text style={styles.text}>Stats for user {user}</Text>
      {isLoading ? <ActivityIndicator/> : (
        <LineChart
          data={{
            labels: [
              data[0].title,
              'two',
              'three',
              'four',
              'five',
            ],
            datasets: [
              {
                data: [
                  1,
                  2,
                  3,
                  4,
                  5
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
      )}
      <Text style={styles.text2}> My Stocks </Text>
      <View style={styles.listWindow}>
      
        <View style={styles.listWindow}>
        {isLoading ? <ActivityIndicator/> : (
          <FlatList
              data={data}
              keyExtractor={item => item.id}
              renderItem={renderItem}
            />
        )}
        </View>
      </View>
    </View>
    
  )
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
      alignItems: 'flex-start',
      backgroundColor: _BLUE2
    },
    listWindow: {
      flex: 0,
      paddingTop: 0,
      height: 300,
    },
    lightText:{
      fontSize: 14,
      alignItems: 'center',
      color: _GRAY,
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
import * as React from 'react';
import react, {Component} from 'react';
import { useNavigation } from '@react-navigation/native';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function Stats({ route, navigation }) {
    
    return (
        <View style={title.container}>
            
            <View style={title.logoffbutton}>
              <LogButton ScreenName= "Login" />
            </View>
            <Text style={title.text}>Showing you some statistics </Text>
        </View>
    );
}

function LogButton({ScreenName}){
    const navigation = useNavigation();
    return(
      <Button
        title= 'Logoff'
        onPress={() => navigation.navigate(ScreenName)}
      />
    );
  }

  const title = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: _BLUE,
    },
  
    logoffbutton: {
      paddingTop: 25,
      paddingLeft: 5,
      alignItems: 'flex-start',
      flexDirection:'row-reverse',
    },
  
    text  :{
      fontSize: 18,
      height: 60,
      paddingLeft: 5,
    }
  })

export default Stats;
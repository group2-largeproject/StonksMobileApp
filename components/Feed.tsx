import * as React from 'react';
import react, {Component} from 'react';
import { useRef } from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import Login from './Login';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function Feed() {
    
    return (
        <View style={title.container}>
            <Text>this is the feed </Text>
            <LogButton ScreenName= "Login" />
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
        paddingTop: 5,
        backgroundColor: _BLUE,
        alignItems: 'center',
        justifyContent: 'center'
    },
})


export default Feed;
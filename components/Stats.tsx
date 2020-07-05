import * as React from 'react';
import react, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import{ useState } from 'react';
import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {createDrawerNavigator} from '@react-navigation/drawer';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

function Stats({ route, navigation }) {
    
    return (
        <View style={title.container}>
            <Text>Showing you some statistics </Text>
        </View>
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

export default Stats;
import * as React from 'react';
import react, {Component} from 'react';
import { StatusBar } from 'expo-status-bar';
import { useRef } from 'react';
import{ useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { StyleSheet, Text, View, Button, TextInput, TouchableOpacity, ImageBackground, Image } from 'react-native';
import {createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Feed from './Feed';
import Stats from './Stats';
import Search from './Search';

var _BLUE = '#2196f3';
var _GRAY = '#303030';

const Drawer = createDrawerNavigator();

function LogoffButton(props){
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList{...props}/>
      <DrawerItem label = "Logoff" onPress={()=> navigation.navigate('Stats', {Screen: 'Stats'}) }/>
    </DrawerContentScrollView>
  )
}

function HomeScreen({ navigation, route }) {

    const { userId } = route.params;
    const { User } = route.params;
  
    return (
      <Drawer.Navigator 
        drawerContentOptions={{
          activeTintColor: _GRAY,
          itemStyle: {marginVertical: 20},
        }}
        drawerStyle={{
          backgroundColor: _BLUE,
          width: 150,
        }}
        drawerContent={props=><LogoffButton{...props} />}
      >
        <Drawer.Screen name="Feed" component = {Feed} />
        <Drawer.Screen name="Stats" component = {Stats} />
        <Drawer.Screen name="Search" component = {Search} />
      </Drawer.Navigator>
    );
}
export default HomeScreen;
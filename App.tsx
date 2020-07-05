import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Login from './components/Login';
import Feed from './components/Feed';
import Stats from './components/Stats';
import Search from './components/Search';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const _BLUE = '#2196f3';
const _GRAY = '#303030';

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login"
        headerMode = 'none'
      >
        <Stack.Screen 
          name="Login" 
          component={Login}
        />
        <Stack.Screen name="Home" component={HomeScreen} options={{title: 'Logoff'}} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

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

function LogoffButton(props){
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList{...props}/>
        <DrawerItem 
          label = "Logoff" 
          onPress={()=> alert('Logoff')}
        />
    </DrawerContentScrollView>
  )
}
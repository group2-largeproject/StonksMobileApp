import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import {createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Login from './components/Login';
import Feed from './components/Feed';
import Stats from './components/Stats';
import Search from './components/Search';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';
import Passwordrecovery from './components/Passwordrecovery';
import Passwordreset from './components/Passwordreset';

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
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{title: 'Logoff',
          gestureEnabled:false
          }}
        />

        <Stack.Screen
          name="Register"
          component={Register}
          options={{title: 'Registration',
          gestureEnabled: true
        }}
        />

        <Stack.Screen
          name="Forgotpassword"
          component={Forgotpassword}
          options={{title: 'Forgotpassword',
          
        }}
        />

        <Stack.Screen
          name="Passwordrecovery"
          component={Passwordrecovery}
          options={{title: 'Passwordrecovery',
          
        }}
        />

        <Stack.Screen
          name="Passwordreset"
          component={Passwordreset}
          options={{title: 'Passwordreset',
          
        }}
        />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;

function HomeScreen() {
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
      drawerContent={props=><DrawerButton {...props} />}
    >
      <Drawer.Screen name="Feed" component = {Feed} />
      <Drawer.Screen name="Stats" component = {Stats} />
      <Drawer.Screen name="Search" component = {Search} />
    </Drawer.Navigator>
  );
}

function DrawerButton( props ){
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList{...props}/>
        <DrawerItem 
          label = "Logoff" 
          onPress={()=> alert('some command')}
        />
    </DrawerContentScrollView>
  )
}
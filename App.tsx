import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator, DrawerItemList, DrawerItem, DrawerContentScrollView} from '@react-navigation/drawer';
import Login from './components/Login';
import Feed from './components/Feed';
import Search from './components/Search';
import AddStock from './components/AddStock';
import Register from './components/Register';
import Forgotpassword from './components/Forgotpassword';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const _BLUE = '#2196f3';
const _GRAY = '#303030';

function App(){
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
            name="Home" 
            component={HomeScreen} 
            options={{title: 'Logoff',
            gestureEnabled:false
            }}
          />
          
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
export default App;

function HomeScreen({route}) {
  const { user } = route.params;
  
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
      
    >
      <Drawer.Screen 
        name="Feed" 
        component = {Feed}  
      />

      <Drawer.Screen 
        name="AddStock" 
        component = {AddStock} 
      />

    </Drawer.Navigator>
  );
}


//<Drawer.Screen name="Stats" component = {Stats} />

function DrawerButton( props, ScreenName ){
  const navigation = useNavigation();
  return (
    <DrawerContentScrollView {...props}>
      <DrawerItemList{...props}/>
        <DrawerItem 
          label = "button" 
          onPress={()=> alert('')}
        />
    </DrawerContentScrollView>
  )
}
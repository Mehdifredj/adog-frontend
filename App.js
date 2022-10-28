import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import FontAwesome from 'react-native-vector-icons/FontAwesome';
import user from './reducers/user';

<<<<<<< HEAD
import HomeScreen from './screens/HomeScreen';
import SignUpScreen from './screens/SignUpScreen';
import SignInScreen from './screens/SignInScreen';
import UserProfileScreen from './screens/UserProfileScreen';
import Prefscreen from './screens/Prefscreen';
=======
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';

import user from './reducers/user';


import FiltersScreen from './screens/FiltersScreen';
>>>>>>> 3819dca0a46e4e162bfd8562a900750528ebb448
import SwipesScreen from './screens/SwipesScreen';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import ChatScreen from './screens/ChatScreen';
import UserProfileScreen from './screens/UserProfileScreen';


const store = configureStore({
  reducer: { user },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ color, size }) => {
        let iconName = '';

        if (route.name === 'Swipes') {
          iconName = 'heart';
        } else if (route.name === 'Chat') {
          iconName = 'comments'; 
        } else if(route.name ==='Profile'){
          iconName = 'paw'; 
        }else if(route.name==='Filters'){
          iconName='sliders';
        }
        return <FontAwesome name={iconName} size={size} color={color} />;
      },
      tabBarActiveTintColor: '#F1890F',
      tabBarInactiveTintColor: '#9c9c9c',
      headerShown: false,
    })}>
<<<<<<< HEAD
      <Tab.Screen name="Chat" component={SignInScreen} />
      <Tab.Screen name="My Profile" component={UserProfileScreen}/>
      <Tab.Screen name="PrefScreen" component={Prefscreen}/>
=======
       <Tab.Screen name="SignUp" component={SignUpScreen} />
       <Tab.Screen name="SignIn" component={SignInScreen} />
      <Tab.Screen name="Filters" component={FiltersScreen}/>
>>>>>>> 3819dca0a46e4e162bfd8562a900750528ebb448
      <Tab.Screen name="Swipes" component={SwipesScreen}/>
       <Tab.Screen name="Chat" component={ChatScreen} /> 
       <Tab.Screen name="Profile" component={UserProfileScreen} />
    

    </Tab.Navigator>
  );
};

export default function App() {
  return (
     <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{ headerShown: false }}>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
     </Provider>
  );
}

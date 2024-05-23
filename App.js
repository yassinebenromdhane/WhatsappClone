import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Auth from './Screens/Authentification';
import Home from './Screens/Home';
import Chat from './Screens/Chat';
import Signup from './Screens/Signup';

const Stack = createNativeStackNavigator();

export default function App() {
  return <NavigationContainer>
    <Stack.Navigator>
      <Stack.Screen name="Authentification" component={Auth} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Signup" component={Signup} />
      <Stack.Screen name="Chat" component={Chat} />
    </Stack.Navigator>
  </NavigationContainer>;
}
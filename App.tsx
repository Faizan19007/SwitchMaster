import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import MainScreen from './src/screens/MainScreen'
import MsgScreen from './src/screens/MsgScreen'
import HomeScreen from './src/screens/HomeScreen';

export type RootStackParamList = {
  HomeScreen: undefined,
  MainScreen: undefined,
  MsgScreen: { address: string  }
}

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='HomeScreen'>
        <Stack.Screen name='HomeScreen' component={HomeScreen}/>
        <Stack.Screen name='MainScreen' component={MainScreen} />
        <Stack.Screen name='MsgScreen' component={MsgScreen} />
      </Stack.Navigator>

    </NavigationContainer>
  );
}
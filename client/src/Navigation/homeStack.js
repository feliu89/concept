import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../Screens/home';
import NoteDescription from '../Components/NoteDescription';

const Stack = createStackNavigator();

export default function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='NoteDescription' component={NoteDescription} />
    </Stack.Navigator>
  );
}

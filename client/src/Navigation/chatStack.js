import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Chat from '../Screens/chat';

const Stack = createStackNavigator();

export default function ChatStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name='Chat' component={Chat} />
    </Stack.Navigator>
  );
}

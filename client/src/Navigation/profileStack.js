import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Profile from '../Screens/profile';

const Stack = createStackNavigator();

export default function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  );
}

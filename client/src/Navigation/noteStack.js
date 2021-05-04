import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Note from '../Screens/note';

const Stack = createStackNavigator();

export default function NoteStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name='Note' component={Note} />
    </Stack.Navigator>
  );
}

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Favourites from '../Screens/favourites';

const Stack = createStackNavigator();

export default function FavouritesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTintColor: 'white',
        headerStyle: { backgroundColor: 'tomato' },
      }}
    >
      <Stack.Screen name='Favourites' component={Favourites} />
    </Stack.Navigator>
  );
}

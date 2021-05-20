import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';
import HomeStack from '../Navigation/homeStack';
import NoteStack from '../Navigation/noteStack';
import ProfileStack from '../Navigation/profileStack';

const Tab = createBottomTabNavigator();

export default function BottomNav() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        tabBarOptions={{ activeTintColor: 'tomato', inactiveTintColor: 'grey' }}
      >
        <Tab.Screen
          name='Home'
          component={HomeStack}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({ color, size }) => {
              return <Feather name='home' size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='Note'
          component={NoteStack}
          options={{
            tabBarLabel: 'Note',
            tabBarIcon: ({ color, size }) => {
              return <Feather name={'plus-circle'} size={size} color={color} />;
            },
          }}
        />
        <Tab.Screen
          name='Profile'
          component={ProfileStack}
          options={{
            tabBarLabel: 'Profile',
            tabBarIcon: ({ color, size }) => {
              return <Feather name={'smile'} size={size} color={color} />;
            },
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

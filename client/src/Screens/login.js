import React, { useState, useEffect, useContext } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext, useAuth, Store } from '../Providers/auth';

export default function login({ setUserLoggedIn }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { dispatch } = useContext(AuthContext);

  const loginHandler = async () => {
    try {
      const result = await fetch(`${BASE_URL}/login`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          // email,
          // password,
          email: 'feliu.arnau@gmail.com',
          password: '123',
        }),
      });
      const jwtToken = result.headers.map.authorization;
      await AsyncStorage.setItem('@jwtToken', jwtToken);
      dispatch({ type: 'LOGIN' });
    } catch (error) {}
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: 'tomato',
      }}
    >
      <Image
        source={require('../../assets/images/logo.png')}
        style={{ width: 100, height: 100 }}
      />
      {/* <TouchableOpacity style={styles.button} onPress={getKeyHandler}>
        <Text style={styles.buttonText}>Get Key</Text>
      </TouchableOpacity> */}
      <TextInput
        value={email}
        onChangeText={setEmail}
        placeholder='Login'
        style={styles.inputField}
      ></TextInput>
      <TextInput
        value={password}
        onChangeText={setPassword}
        placeholder='Password'
        secureTextEntry={true}
        style={styles.inputField}
        type='password'
      ></TextInput>
      <TouchableOpacity style={styles.button} onPress={loginHandler}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputField: {
    margin: 10,
    padding: 10,
    width: '80%',
    borderWidth: 2,
  },
  button: {
    paddingHorizontal: 30,
    paddingVertical: 10,
    borderRadius: 10,
    backgroundColor: 'blue',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

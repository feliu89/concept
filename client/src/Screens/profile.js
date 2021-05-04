import React, { useState, useContext } from 'react';
import {
  Text,
  SafeAreaView,
  View,
  Image,
  StyleSheet,
  Button,
} from 'react-native';
import { AuthContext, useAuth, Store } from '../Providers/auth';

export default function Profile({ navigation }) {
  const [user, setUser] = useState({
    id: 1,
    name: 'Arnau',
    lastName: 'Feliu',
    social: '@arfeliu',
    language: 'Spanish',
    address: 'Barcelona, Spain',
  });

  const { dispatch } = useContext(AuthContext);

  return (
    <SafeAreaView style={styles.centered}>
      <View style={styles.container}>
        <View style={styles.imageCircle}>
          <Image
            style={styles.imageCircle}
            source={require('../../assets/images/me.jpg')}
          />
        </View>
        <View style={styles.containerInline}>
          <Text style={styles.h1}>
            {user.name} {user.lastName}
          </Text>
          <Text style={styles.h2}>{user.social}</Text>
        </View>
        <Button title='logout' onPress={() => dispatch({ type: 'LOGOUT' })} />
        <View style={styles.containerInline}>
          <Text style={styles.p}>Main language: {user.language}</Text>
          <Text style={styles.p}>Address: {user.address}</Text>
        </View>
        <View style={styles.endline}></View>
      </View>
    </SafeAreaView>
  );
}

const colorGrey = 'grey';
const colorTomato = 'tomato';

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    textAlign: 'center',
  },
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 10,
    marginTop: 50,
    flex: 1,
  },
  containerInline: {
    paddingVertical: 20,
    flex: 1,
  },
  imageCircle: {
    height: 200,
    width: 200,
    borderRadius: 200,
    borderWidth: 2,
    borderColor: colorTomato,
    justifyContent: 'center',
    alignItems: 'center',
  },
  h1: {
    fontSize: 30,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  h2: {
    fontSize: 20,
    fontStyle: 'italic',
    textAlign: 'center',
  },
  p: {
    color: colorGrey,
    textAlign: 'center',
  },
  endline: {
    width: '60%',
    borderBottomWidth: 2,
    borderRadius: 50,
    borderColor: colorGrey,
  },
});

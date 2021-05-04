/* eslint-disable no-fallthrough */
import AsyncStorage from '@react-native-async-storage/async-storage';

const setLogin = async () => {
  try {
    // await AsyncStorage.setItem('@userData', userData);
  } catch (e) {
    console.log(e);
  }
};

const setLogout = async () => {
  try {
    // await AsyncStorage.removeItem('@userData');
  } catch (e) {
    console.log(e);
  }
};

const Reducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      setLogin();
      return { ...state, signedIn: true };
    case 'LOGOUT':
      setLogout();
      return { ...state, signedIn: false };
    default:
      return state;
  }
};

export default Reducer;

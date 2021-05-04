import React, { createContext, useReducer, useContext } from 'react';
import Reducer from './reducer';

const initialState = {
  signedIn: false,
};

export const AuthContext = createContext(initialState);

export const useAuth = () => {
  return useContext(AuthContext);
};

export const Store = ({ children }) => {
  const [state, dispatch] = useReducer(Reducer, initialState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};

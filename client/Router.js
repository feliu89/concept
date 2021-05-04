import React, { useContext } from 'react';
import { AuthContext } from './src/Providers/auth';
import BottomNav from './src/Navigation/bottomNav';
import Login from './src/Screens/login';

export default function Router() {
  const { state } = useContext(AuthContext);

  return state.signedIn ? <BottomNav /> : <Login />;
}

import React, { useState } from 'react';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Router from './Router';
import { Store } from './src/Providers/auth';

const getFonts = () => {
  Font.loadAsync({
    'maven-regular': require('./assets/fonts/MavenPro-Regular.ttf'),
    'maven-bold': require('./assets/fonts/MavenPro-Bold.ttf'),
    'maven-extrabold': require('./assets/fonts/MavenPro-ExtraBold.ttf'),
  });
};

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  return fontsLoaded ? (
    <Store>
      <Router />
    </Store>
  ) : (
    <AppLoading
      startAsync={getFonts}
      onFinish={() => setFontsLoaded(true)}
      onError={console.warn}
    />
  );
}

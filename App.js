import React from 'react';
// import {
//   PaperProvider,
//   MD3LightTheme as DefaultTheme,
// } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import MainScreen from './app/screens/MainScreen';

export default function App() {
  return (
    <SafeAreaProvider>
      <MainScreen />
    </SafeAreaProvider>
  );
}

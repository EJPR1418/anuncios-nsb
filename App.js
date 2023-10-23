import React from "react";
import {
  PaperProvider,
  MD3LightTheme as DefaultTheme,
} from "react-native-paper";

import MainScreen from "./app/screens/MainScreen";

const theme = {
  ...DefaultTheme,
  // Specify custom property
  myOwnProperty: true,
  // Specify custom property in nested object
  colors: {
    ...DefaultTheme.colors,
    myOwnColor: "blue",
  },
};

export default function App() {
  return (
    <PaperProvider theme={{ theme }}>
      <MainScreen />
    </PaperProvider>
  );
}

import React from "react";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import HomeScreen from './app/screens/HomeScreen';
import DetailsScreen from './app/screens/DetailsScreen';
import SettingsScreen from "./app/screens/SettingsScreen";

const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();

function StackNavigator() {
 return(
    <Stack.Navigator>
      <Stack.Screen name="Inicio" component={HomeScreen} options={{title: 'Eventos'}}/>
      <Stack.Screen name="Detalles" component={DetailsScreen} options={{title: 'Detalles de Evento'}}/>
      {/* <Stack.Screen name="Profile" component={Profile} />
      <Stack.Screen name="Settings" component={Settings} /> */}
    </Stack.Navigator>
 );
}

function TabNavigator() {
  return(
    <Tab.Navigator>
      <Tab.Screen name="Inicio" component={StackNavigator} />
      <Tab.Screen name="Ajustes" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <TabNavigator/>
    </NavigationContainer>

  );
}


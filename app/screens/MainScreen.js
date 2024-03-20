import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';
import { Text, Icon } from '@rneui/themed';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './HomeScreen';
import EventCreateScreen from './EventCreateScreen';
import EventDetailsScreen from './EventDetailsScreen';
import SettingsScreen from './SettingsScreen';
import ProfileScreen from './ProfileScreen';
import LoginScreen from './LoginScreen';
import LogoutScreen from './LogoutScreen';
import RegisterScreen from './RegisterScreen';

import MapComponent from '../components/MapComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
// import auth from '@react-native-firebase/auth';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const Root = () => {
  return (
    <Drawer.Navigator detachInactiveScreens={false}>
      <Drawer.Screen
        name='Inicio'
        component={HomeScreen}
        options={{
          title: 'Inicio',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name='home'
              type='material'
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Perfil'
        component={ProfileScreen}
        options={{
          title: 'Perfil',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name='person'
              type='material'
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      <Drawer.Screen
        name='Ajustes'
        component={SettingsScreen}
        options={{
          title: 'Ajustes',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name='settings'
              type='material'
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
      {/* <Drawer.Screen
        name='Crear_Evento'
        component={EventCreateScreen}
        options={{
          title: 'Crear Evento',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name='settings'
              type='material'
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      /> */}
      <Drawer.Screen
        name='Salir'
        component={LogoutScreen}
        options={{
          title: 'Salir',
          drawerIcon: ({ focused, size }) => (
            <Icon
              name='logout'
              type='material'
              size={size}
              color={focused ? '#7cc' : '#ccc'}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

const MainScreen = () => {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState(null);

  // Handle user state changes
  const onAuthStateChangedHandler = (user) => {
    setUser(user);
    if (initializing) {
      setInitializing(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, onAuthStateChangedHandler);

    return unsubscribe;
    // const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    // return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) {
    return (
      <View style={styles.container}>
        <ActivityIndicator />
      </View>
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        {/* Set Login as the initial route */}
        {user ? (
          <Stack.Screen
            name='Root'
            component={Root}
            options={{ headerShown: false }}
          />
        ) : (
          <>
            <Stack.Screen
              name='Login'
              component={LoginScreen}
              options={{ headerShown: false }}
            />
          </>
        )}

        {/* <Stack.Screen
          name='Login'
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Root'
          component={Root}
          options={{ headerShown: false }}
        /> */}
        <Stack.Screen
          name='Register'
          component={RegisterScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name='Detalles_Evento'
          component={EventDetailsScreen}
          options={{ title: 'Detalles de Evento' }}
        />
        <Stack.Screen
          name='Crear_Evento'
          component={EventCreateScreen}
          options={{ title: 'Crear Evento' }}
        />
        <Stack.Screen
          name='Mapa'
          component={MapComponent}
          options={{ title: 'Mapa' }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

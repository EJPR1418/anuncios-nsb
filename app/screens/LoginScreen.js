import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Image, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Formik } from 'formik';
import * as yup from 'yup';
import { login, emailVerification, logout } from '../firebase/helpers';
import { ref as dRef, get } from 'firebase/database';
import { db } from '../firebase/firebase';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electronico invalido.')
    .required('Email es requerido'),
  password: yup.string().required('Contraseña es requerida'),
});

const LoginScreen = () => {
  const navigation = useNavigation();
  const [isUserRegistered, setIsUserRegistered] = useState(false);

  const checkIfUserExistsInDatabase = async (userId) => {
    const userRef = dRef(db, `nsb/users/${userId}`);
    const snapshot = await get(userRef);
    if (snapshot.exists()) {
      setIsUserRegistered(true);
    }
  };

  const onSubmit = async (values) => {
    try {
      const user = await login(values.email, values.password);
      if (user) {
        if (!user.emailVerified) {
          await emailVerification();
          await logout();
        } else {
          // Check if user exists in the database
          // Replace this logic with your own database check
          await checkIfUserExistsInDatabase(user.uid);

          if (isUserRegistered) {
            navigation.navigate('Root'); // User exists, navigate to root screen
          } else {
            navigation.navigate('Register'); // User doesn't exist, navigate to register screen
          }
        }
      }
    } catch (error) {
      if (
        error.code === 'auth/invalid-credential' ||
        error.code === 'auth/wrong-password'
      ) {
        alert('Correo electronico o codigo invalido. Intente de nuevo.');
      } else if (error.code === 'auth/too-many-requests') {
        alert('Mucho intentos invalidos. Intente mas tarde.');
      } else {
        alert('Error: ' + error.message);
      }
    }
  };

  return (
    <Formik
      initialValues={{ email: '', password: '' }}
      onSubmit={onSubmit}
      validationSchema={loginSchema}
    >
      {({
        handleChange,
        handleBlur,
        handleSubmit,
        values,
        errors,
        touched,
      }) => (
        <View style={styles.container}>
          {/* <Text h4>Ave Frate!</Text> */}
          <Image
            source={require('../assets/escudo_nsb.jpg')}
            style={styles.logo}
          />
          <Input
            placeholder='Correo Electronico'
            onChangeText={handleChange('email')}
            onBlur={handleBlur('email')}
            value={values.email}
          />
          {touched.email && errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}
          <Input
            placeholder='Contraseña'
            secureTextEntry
            onChangeText={handleChange('password')}
            onBlur={handleBlur('password')}
            value={values.password}
          />
          {touched.password && errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}
          <Button title='Ingresar' onPress={handleSubmit} />
          <Text style={styles.forgotPassword}>Olvido Contraseña?</Text>
        </View>
      )}
    </Formik>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 50,
  },
  forgotPassword: {
    color: 'blue',
    marginTop: 10,
  },

  errorText: {
    color: 'red',
    alignSelf: 'flex-start',
    marginLeft: 10,
    fontSize: 12,
  },
});

export default LoginScreen;

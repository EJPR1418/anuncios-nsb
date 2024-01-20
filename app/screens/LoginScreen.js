import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Image, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native'; // Import the useNavigation hook
import { Formik } from 'formik';
import * as yup from 'yup';
import { login, emailVerification, logout } from '../firebase/helpers';

const loginSchema = yup.object().shape({
  email: yup
    .string()
    .email('Correo electronico invalido.')
    .required('Email es requerido'),
  password: yup.string().required('Contraseña es requerida'),
});

const LoginScreen = () => {
  const navigation = useNavigation();

  const onSubmit = async (values) => {
    try {
      const user = await login(values.email, values.password);
      if (user) {
        if (!user.emailVerified) {
          await emailVerification();
          await logout();
        }
        // navigation.navigate('Root');
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

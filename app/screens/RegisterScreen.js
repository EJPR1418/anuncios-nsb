import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { auth } from '../firebase/firebase';

const RegisterScreen = () => {
  const navigation = useNavigation();

  const validationSchema = yup.object().shape({
    email: yup.string().email('Invalid email').required('Email is required'),
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .required('Password is required'),
  });

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        // Register the user with Firebase Authentication
        await auth().createUserWithEmailAndPassword(
          values.email,
          values.password
        );

        // Navigate to the desired screen after successful registration
        navigation.navigate('Home'); // Replace 'Home' with your target screen name
      } catch (error) {
        formik.setFieldError('error', error.message);
      }
    },
  });

  return (
    <View style={styles.container}>
      <Text h4>Register</Text>
      <Input
        placeholder='Email'
        keyboardType='email-address'
        autoCapitalize='none'
        value={formik.values.email}
        onChangeText={formik.handleChange('email')}
        onBlur={formik.handleBlur('email')}
        errorMessage={formik.touched.email && formik.errors.email}
      />
      <Input
        placeholder='Password'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        errorMessage={formik.touched.password && formik.errors.password}
      />
      {formik.errors.error && (
        <Text style={styles.errorText}>{formik.errors.error}</Text>
      )}
      <Button title='Register' onPress={formik.handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
});

export default RegisterScreen;

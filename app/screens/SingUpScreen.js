import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Image, Text, ThemeProvider } from '@rneui/themed';
import PropTypes from 'prop-types';
import { Formik } from 'formik';

const theme = {
  Input: {
    inputContainerStyle: {
      marginVertical: 10,
    },
  },
  Button: {
    containerStyle: {
      marginVertical: 20,
    },
  },
};

const SignUpScreen = ({ navigation }) => {
  const navigate = () => {
    navigation.navigate('LoginScreen');
  };
  return (
    <ThemeProvider theme={theme}>
      <Formik
        initialValues={{
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
        }}
        onSubmit={(values) => console.log(values)}
      >
        {({ handleChange, handleBlur, handleSubmit, values }) => (
          <View style={styles.container}>
            <Image
              source={{ uri: 'https://placekitten.com/200/200' }}
              style={styles.logo}
            />
            <Input
              placeholder='Full Name'
              onChangeText={handleChange('fullName')}
              onBlur={handleBlur('fullName')}
              value={values.fullName}
            />
            <Input
              placeholder='Email'
              keyboardType='email-address'
              onChangeText={handleChange('email')}
              onBlur={handleBlur('email')}
              value={values.email}
            />
            <Input
              placeholder='Password'
              secureTextEntry
              onChangeText={handleChange('password')}
              onBlur={handleBlur('password')}
              value={values.password}
            />
            <Input
              placeholder='Confirm Password'
              secureTextEntry
              onChangeText={handleChange('confirmPassword')}
              onBlur={handleBlur('confirmPassword')}
              value={values.confirmPassword}
            />
            <Button title='Sign Up' onPress={handleSubmit} />
            <Text style={styles.loginText}>Already have an account? Login</Text>
          </View>
        )}
      </Formik>
    </ThemeProvider>
  );
};

SignUpScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  loginText: {
    color: 'blue',
    marginTop: 10,
  },
});

export default SignUpScreen;

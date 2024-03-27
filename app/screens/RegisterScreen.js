import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { logout } from '../firebase/helpers';
import { ref as dRef, set } from 'firebase/database';
import { auth, db } from '../firebase/firebase';

import DropdownComponent from '../components/DropdownComponent';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [birthday, setBirthday] = useState(new Date());

  const validationSchema = yup.object().shape({
    password: yup
      .string()
      .min(6, 'Password must be at least 6 characters')
      .matches(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{6,}$/,
        'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character'
      )
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), null], 'Passwords must match')
      .required('Confirm password is required'),
    name: yup.string().required('Name is required'),
    initials: yup.string(),
    lastName: yup.string().required('Last Name is required'),
    birthday: yup
      .string()
      .matches(
        /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/(19|20)\d{2}$/,
        'Birthday must be in the format MM-DD-YYYY'
      )
      .required('Birthday is required'),
    phoneNumber: yup
      .string()
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits')
      .required('Phone number is required'),
    fraternity: yup.string().required('Fraternity is required'),
    yearOfInitiation: yup
      .string()
      .matches(/^\d{4}$/, 'Invalid year')
      .required('Year of Initiation is required'),
  });

  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
      name: '',
      initials: '',
      lastName: '',
      birthday: '',
      phoneNumber: '',
      membership: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      const { password, confirmPassword, ...remainingValues } = values;
      const membership = 'active';
      const editedBy = auth.currentUser.uid;
      const editedDate = new Date();

      const postValues = {
        ...remainingValues,
        membership,
        editedBy,
        editedDate,
      };

      console.log(postValues);

      // Add logic to add data to the database
      // const userRef = dRef(db, `nsb/users/${auth.currentUser.uid}`);
      // try {
      //   await auth.currentUser.updatePassword(password);
      //   await set(userRef, postValues);
      //   console.log('Data added successfully.');
      // } catch (error) {
      //   console.error('Error adding data:', error);
      // }

      // Uncomment and modify the following block for user registration logic
      // try {
      //   // Register the user with Firebase Authentication
      //   await auth().createUserWithEmailAndPassword(values.email, values.password);
      //   // Navigate to the desired screen after successful registration
      //   navigation.navigate('Root'); // Replace 'Home' with your target screen name
      // } catch (error) {
      //   formik.setFieldError('error', error.message);
      // }
    },
  });

  return (
    <View style={styles.container}>
      <Text style={{ alignSelf: 'center', marginBottom: 30 }} h4>
        Quien eres?
      </Text>
      <Input
        placeholder='Nombre'
        value={formik.values.name}
        onChangeText={formik.handleChange('name')}
        onBlur={formik.handleBlur('name')}
        errorMessage={formik.touched.name && formik.errors.name}
      />
      <Input
        placeholder='Segundo Nombre'
        value={formik.values.initials}
        onChangeText={formik.handleChange('initials')}
        onBlur={formik.handleBlur('initials')}
        errorMessage={formik.touched.initials && formik.errors.initials}
      />
      <Input
        placeholder='Apellidos'
        value={formik.values.lastName}
        onChangeText={formik.handleChange('lastName')}
        onBlur={formik.handleBlur('lastName')}
        errorMessage={formik.touched.lastName && formik.errors.lastName}
      />
      <Input
        placeholder='Fecha de Nacimiento (MM/DD/YYYY)'
        value={formik.values.birthday}
        onChangeText={formik.handleChange('birthday')}
        onBlur={formik.handleBlur('birthday')}
        errorMessage={formik.touched.birthday && formik.errors.birthday}
      />
      <Input
        placeholder='Número de Teléfono'
        keyboardType='phone-pad'
        value={formik.values.phoneNumber}
        onChangeText={formik.handleChange('phoneNumber')}
        onBlur={formik.handleBlur('phoneNumber')}
        errorMessage={formik.touched.phoneNumber && formik.errors.phoneNumber}
      />
      <Input
        placeholder='Nueva Contraseña'
        secureTextEntry
        value={formik.values.password}
        onChangeText={formik.handleChange('password')}
        onBlur={formik.handleBlur('password')}
        errorMessage={formik.touched.password && formik.errors.password}
      />
      <Input
        placeholder='Confirmar Contraseña'
        secureTextEntry
        value={formik.values.confirmPassword}
        onChangeText={formik.handleChange('confirmPassword')}
        onBlur={formik.handleBlur('confirmPassword')}
        errorMessage={
          formik.touched.confirmPassword && formik.errors.confirmPassword
        }
      />
      <View style={styles.containerSeparator}>
        <View>
          <Button
            title='Registrar'
            buttonStyle={{
              backgroundColor: '#002366',
              borderRadius: 20,
              marginBottom: 10,
            }}
            onPress={formik.handleSubmit}
          />
        </View>
        {/* <View>
          <Button
            title='Cancelar'
            buttonStyle={{
              backgroundColor: 'red',
              borderRadius: 20,
            }}
            onPress={async () => {
              await logout();
              navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
            }}
          />
        </View> */}
      </View>

      {formik.errors.error && (
        <Text style={styles.errorText}>{formik.errors.error}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  containerSeparator: {
    marginTop: 20,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
  },
  buttonContainer: {
    flex: 1,
  },
});

export default RegisterScreen;

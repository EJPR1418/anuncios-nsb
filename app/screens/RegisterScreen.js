import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Input, Button, Text } from '@rneui/themed';
import { useNavigation } from '@react-navigation/native';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { logout } from '../firebase/helpers';
import { ref as dRef, onValue } from 'firebase/database';
import { db } from '../firebase/firebase';

import DropdownComponent from '../components/DropdownComponent';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const [birthday, setBirthday] = useState(new Date());
  // const [fraternityList, setFraternityList] = useState([]);

  // useEffect(() => {
  //   let unsubscribeFraternities;

  //   try {
  //     unsubscribeFraternities = onValue(
  //       dRef(db, 'nsb/fraternities/'),
  //       (snapshot) => {
  //         const dataVal = snapshot.val();
  //         if (dataVal) {
  //           const dataArr = Object.keys(dataVal).map((key) => ({
  //             id: key,
  //             ...dataVal[key],
  //           }));

  //           //console.log(dataArr);
  //           setFraternityList(dataArr);
  //         } else {
  //           setFraternityList([]);
  //         }
  //       }
  //     );
  //   } catch (error) {
  //     console.error('Error setting up Firebase listener:', error);
  //   }

  //   return () => {
  //     try {
  //       if (unsubscribeFraternities) {
  //         unsubscribeFraternities();
  //       }
  //     } catch (error) {
  //       console.error('Error unsubscribing from Firebase listener:', error);
  //     }
  //   };
  // }, []);

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
      fraternity: '',
      yearOfInitiation: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      console.log(values);
      // try {
      //   // Register the user with Firebase Authentication
      //   await auth().createUserWithEmailAndPassword(
      //     values.email,
      //     values.password
      //   );

      //   // Navigate to the desired screen after successful registration
      //   navigation.navigate('Root'); // Replace 'Home' with your target screen name
      // } catch (error) {
      //   formik.setFieldError('error', error.message);
      // }
    },
  });

  return (
    <View style={styles.container}>
      <Text h4>Register</Text>
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
      <Input
        placeholder='Primer Nombre'
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
      {/* <DateTimePicker
        value={birthday}
        onDateChange={(date) => setBirthday(date)}
        mode='date'
        placeholder='Select birthday'
        confirmBtnText='Confirm'
        cancelBtnText='Cancel'
      /> */}
      {/* <Input
        placeholder='Year of Initiation'
        keyboardType='numeric'
        value={formik.values.yearOfInitiation}
        onChangeText={formik.handleChange('yearOfInitiation')}
        onBlur={formik.handleBlur('yearOfInitiation')}
        errorMessage={
          formik.touched.yearOfInitiation && formik.errors.yearOfInitiation
        }
      /> */}
      {/* <DropdownComponent
        editable={false}
        data={fraternityList}
        selected={formik.values.fraternity}
        onSelect={(fraternity) => {
          formik.setFieldValue('fraternity', fraternity);
        }}
        placeholder='Seleccione'
        isSearch={true}
      />
      {formik.errors.type && formik.touched.type && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{formik.errors.fraternity}</Text>
        </View>
      )} */}
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
        <View>
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
        </View>
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

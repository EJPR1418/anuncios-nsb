import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Icon, Button, Overlay } from '@rneui/themed';
import PropTypes from 'prop-types';

import MapComponent from '../components/MapComponent';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebase/firebase';
// import auth from '@react-native-firebase/auth';

const LogoutScreen = ({ navigation }) => {
  const [isVisible, setIsVisible] = useState(false);

  const handleLogout = () => {
    auth
      .signOut()
      .then(() => {
        navigation.reset({ index: 0, routes: [{ name: 'Login' }] });
      })
      .catch((error) => {
        console.error('Error logging out:', error);
      });
  };

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text style={styles.questionText}>
          Are you sure you want to logout?
        </Text>
        <View style={{ flex: 1 }}>
          <Button
            title='Salir'
            buttonStyle={styles.button}
            onPress={handleLogout}
          />
        </View>
      </View>
    </View>
  );
};

LogoutScreen.propTypes = {
  navigation: PropTypes.object.isRequired, // PropTypes for navigation prop
};
const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
  },
  button: {
    width: 100,
  },
  cancelButton: {
    backgroundColor: 'red',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'center',
  },
});

export default LogoutScreen;

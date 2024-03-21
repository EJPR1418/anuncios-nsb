import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, Card } from '@rneui/themed';

const ProfileComponent = ({ user }) => {
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>Nombre</Card.Title>
        <Card.Divider />
        <View style={styles.userInfo}>
          <Avatar
            rounded
            size='large'
            source={{
              uri: 'https://firebasestorage.googleapis.com/v0/b/newsigmabeta.appspot.com/o/events%2Fescudo_nsb.jpg?alt=media&token=d79d4e0e-d98c-4e80-9aa0-00abf856d384',
            }}
          />
          <View style={styles.details}>
            <Text style={styles.name}>nombre</Text>
            <Text style={styles.email}>email</Text>
            <Text style={styles.bio}>Bio</Text>
          </View>
        </View>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  details: {
    marginLeft: 10,
  },
  name: {
    fontWeight: 'bold',
    fontSize: 18,
  },
  email: {
    fontSize: 16,
    color: 'grey',
  },
  bio: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default ProfileComponent;

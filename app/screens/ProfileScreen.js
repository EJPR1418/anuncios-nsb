import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Avatar, Text, Card } from '@rneui/themed';
import { ref as dRef, get } from 'firebase/database';
import { db, auth } from '../firebase/firebase';

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [extraUserInfo, setExtraUserInfo] = useState(null);

  useEffect(() => {
    const user = auth.currentUser;
    console.log(user);
    if (user) {
      setUser(user);

      // Fetch extra user info from the database
      const userRef = dRef(db, `nsb/users/${user.uid}`);
      get(userRef)
        .then((snapshot) => {
          if (snapshot.exists()) {
            setExtraUserInfo(snapshot.val());
          }
        })
        .catch((error) => {
          console.error('Error fetching extra user info:', error);
        });
    }
  }, []);

  if (!user || !extraUserInfo) {
    return null; // Or display a loading indicator
  }
  return (
    <View style={styles.container}>
      <Card>
        <Card.Title>{user.displayName}</Card.Title>
        <Card.Divider />
        <View style={styles.userInfo}>
          <Avatar
            rounded
            size='large'
            source={{
              uri: user.photoURL,
            }}
          />
          <View style={styles.details}>
            <Text style={styles.email}>{user.email}</Text>
            {/* Display extra user info */}
            <Text style={styles.extraInfo}>
              Fraternity: {extraUserInfo.birthday}
            </Text>
            <Text style={styles.extraInfo}>Role: {extraUserInfo.role}</Text>
            {/* Add more extra user info fields as needed */}
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
  email: {
    fontSize: 16,
    color: 'grey',
  },
  extraInfo: {
    marginTop: 5,
    fontSize: 14,
  },
});

export default ProfileComponent;

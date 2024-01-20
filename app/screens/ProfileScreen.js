import * as React from 'react';
import { StyleSheet, SafeAreaView } from 'react-native';
import { List } from 'react-native-paper';

function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <List.Item
        title='Cuenta'
        left={(props) => <List.Icon {...props} icon='folder' />}
        onPress={{}}
      />
      <List.Item
        title='Reportes'
        left={(props) => <List.Icon {...props} icon='folder' />}
        onPress={{}}
      />
      <List.Item
        title='Reportes'
        left={(props) => <List.Icon {...props} icon='folder' />}
        onPress={{}}
      />
      <List.Item
        title='Logout'
        left={(props) => <List.Icon {...props} icon='folder' />}
        onPress={{}}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
});

export default ProfileScreen;

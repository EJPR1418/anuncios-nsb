import React, { useState } from "react";
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import {
  Card,
  Title,
  Text,
  Button,
  Paragraph,
  Avatar,
  List,
  PaperProvider,
} from 'react-native-paper';


function HomeScreen({ navigation }) {
    const LeftContent = props => <Avatar.Icon {...props} icon="folder" />
 return(
    <ScrollView>
      <View style={styles.container}>
      <TouchableOpacity  onPress={() => navigation.navigate('Detalles')}>
        <Card>
          <Card.Title title="Evento 1" subtitle="Card Subtitle2" left={LeftContent} />
          {/* <Card.Content>
            <Text variant="titleLarge" title="Card Title"></Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content> */}
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        </Card>
      </TouchableOpacity>
    </View>
    </ScrollView>
 );
}

const styles = StyleSheet.create({ 
  container: {
    paddingTop: 20,
  },
  background: {
    backgroundColor: 'white'
  },
});

export default HomeScreen;
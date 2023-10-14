import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DatePickerModal } from 'react-native-paper-dates';
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

function DetailsScreen(props) {
    const { title, content } = props?.route?.params;
    return (
    <Card>
      <Card.Title title="Evento 1" variant="titleLarge"/>
      <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
      <Card.Content>
        <Text variant="titleLarge" title="Card Title"></Text>
        <Text variant="bodyMedium">Card content</Text>
      </Card.Content>
    </Card>
      // <List.Section>
      //   <List.Subheader>Title</List.Subheader>
      //   <List.Item />
      // </List.Section>
    );
  };

export default DetailsScreen;
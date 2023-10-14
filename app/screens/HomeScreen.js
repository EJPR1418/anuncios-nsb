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
import MainContainer from "../components/MainContainer";

function HomeScreen({ navigation }) {
    const [date, setDate] = React.useState(undefined);
    const [open, setOpen] = React.useState(false);
    const onDismissSingle = React.useCallback(() => {
      setOpen(false);
    }, [setOpen]);
    
    const onConfirmSingle = React.useCallback(
      (params) => {
        setOpen(false);
        setDate(params.date);
      },
      [setOpen, setDate]
    );
 return(
    <ScrollView>
        <View style={{ justifyContent: 'center', flex: 1, alignItems: 'center' }}>
            <Button onPress={() => setOpen(true)} uppercase={false} mode="outlined">
        Pick single date
        </Button>
        <DatePickerModal
        locale="en"
        mode="single"
        visible={open}
        onDismiss={onDismissSingle}
        date={date}
        onConfirm={onConfirmSingle}
      />
      </View>
      <MainContainer/>
    </ScrollView>
 );
}

export default HomeScreen;
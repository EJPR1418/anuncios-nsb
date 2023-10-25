import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Platform } from 'react-native';
import { Text, TextInput, TouchableOpacity } from 'react-native-paper';
import DateTimePicker from '@react-native-community/datetimepicker';

function CalendarInputComponent() {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [startDate, setStartDate] = React.useState('');

  let isEditable = false;

  const toggleDatePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == 'set') {
      const currentDate = selectedDate;
      setDate(currentDate);
      if (Platform.OS === 'android') {
        toggleDatePicker();
        setStartDate(currentDate.toLocaleDateString('en-US'));
      }
    } else {
      toggleDatePicker();
    }
  };

  const confirmIOSDate = () => {
    setDate(date.toDateString());
    toggleDatePicker();
  };
  return (
    <View>
      {showPicker && (
        <DateTimePicker
          mode='date'
          display='spinner'
          value={date}
          onChange={onChange}
        />
      )}
      {showPicker && Platform.OS === 'ios' && (
        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'space-around',
          }}
        >
          <TouchableOpacity style={{}} onPress={toggleDatePicker}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={confirmIOSDate}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showPicker && (
        <Pressable onPress={toggleDatePicker} disabled={!isEditable}>
          <TextInput
            mode='outlined'
            variant='bodyMedium'
            style={styles.textInput}
            placeholder='Fecha'
            value={startDate}
            onChangeText={setStartDate}
            editable={false}
            onPressIn={toggleDatePicker}
          ></TextInput>
        </Pressable>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
  },
  container: {
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  flexContainer: {
    justifyContent: 'flex-end',
  },
  background: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  textInput: {
    flex: 1, // Distribute available space equally among children
    margin: 5,
  },
});

export default CalendarInputComponent;

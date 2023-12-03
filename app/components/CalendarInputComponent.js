import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import { TextInput, IconButton } from 'react-native-paper';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';

function CalendarInputComponent({
  mode,
  value,
  onDateChange,
  label,
  editable,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisibility(Platform.OS === 'ios'); // Hide the picker on iOS immediately
    setDate(currentDate);
    onDateChange(currentDate);
  };
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    hideDatePicker();

    if (date) {
      onDateChange(date);
    }
  };
  const formattedValue = value
    ? mode === 'time'
      ? value.toLocaleTimeString('en-US', {
          hour: 'numeric',
          minute: 'numeric',
          hour12: true,
        })
      : value.toLocaleDateString('en-US')
    : '';

  const _icon = mode == 'date' ? 'calendar' : 'calendar-clock';
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 2 }}>
          <TextInput
            label={label}
            mode='outlined'
            value={formattedValue}
            editable={false}
          />
        </View>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <IconButton
            icon={_icon}
            size={30}
            style={{
              backgroundColor: '#ADD8E6',
              borderRadius: 10,
            }}
            onPress={showDatePicker}
          />
        </View>
      </View>
      {isDatePickerVisible && (
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode={mode}
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
          onChange={onChange}
        />
      )}
    </View>
  );
}

CalendarInputComponent.propTypes = {
  mode: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired, // Value should be a Date object
  onDateChange: PropTypes.func.isRequired, // Callback function for date change
  label: PropTypes.string.isRequired, // Label for the input
  editable: PropTypes.bool,
};

const styles = StyleSheet.create({
  searchSection: {
    flex: 1,
    flexDirection: 'row',
  },
});

export default CalendarInputComponent;

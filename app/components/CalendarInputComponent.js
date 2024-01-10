import React, { useState } from 'react';
import { View, Platform, StyleSheet } from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import PropTypes from 'prop-types';
import { Input, Icon } from '@rneui/themed';
import { format } from 'date-fns';

function CalendarInputComponent({
  mode,
  value,
  onDateChange,
  label,
  editable,
}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [date, setDate] = useState(new Date());

  const formatDate = (currentDate) => {
    return mode === 'time'
      ? format(currentDate, 'hh:mm a')
      : format(currentDate, 'MM/dd/yyyy');
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setDatePickerVisibility(Platform.OS === 'ios'); // Hide the picker on iOS immediately

    onDateChange(formatDate(currentDate));
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
      // const fDate = formatDate(date);
      onDateChange(formatDate(date));
    }
  };

  const _icon = mode == 'date' ? 'event' : 'schedule';
  return (
    <View>
      <View style={{ flexDirection: 'row' }}>
        <View style={{ flex: 2 }}>
          <Input
            label={label}
            value={value}
            editable={false}
            inputStyle={{ borderBottomWidth: 0 }} // Hides the bottom border
            rightIcon={
              <Icon
                name={_icon}
                type='material' // Adjust the icon library if needed
                size={30}
                color='black'
                onPress={showDatePicker}
              />
            }
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
  onDateChange: PropTypes.func.isRequired,
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

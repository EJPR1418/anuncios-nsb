
import React, { useState } from "react";
import { Button, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";

function CalendarComponent() {
  console.log('ENTREEE');
  const [isDatePickerVisible, setDatePickerVisibility] = useState(true);
 
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.warn("A date has been picked: ", date);
    hideDatePicker();
  };

  return (
    <View>
      {/* <Button title="Show Date Picker" onPress={showDatePicker} /> */}
      <DateTimePickerModal 
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
      />
    </View>
  );
};

export default CalendarComponent;
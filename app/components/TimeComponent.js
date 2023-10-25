import React, { useState } from "react";
import { View, StyleSheet, Pressable, Platform } from "react-native";
import { Text, TextInput, TouchableOpacity } from "react-native-paper";
import DateTimePicker from "@react-native-community/datetimepicker";

function TimeComponent() {
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [startTime, setStartTime] = React.useState("");

  let isEditable = false;

  const toggleTimePicker = () => {
    setShowPicker(!showPicker);
  };

  const onChange = ({ type }, selectedDate) => {
    if (type == "set") {
      const currentTime = selectedDate;
      setTime(currentTime);
      if (Platform.OS === "android") {
        toggleTimePicker();
        setStartTime(
          currentTime.toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })
        );
      }
    } else {
      toggleTimePicker();
    }
  };

  const confirmIOSTime = () => {
    setTime(time.toTimeString());
    toggleTimePicker();
  };
  return (
    <View>
      {showPicker && (
        <DateTimePicker
          mode="time"
          display="clock"
          value={time}
          onChange={onChange}
        />
      )}
      {showPicker && Platform.OS === "ios" && (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
          }}
        >
          <TouchableOpacity style={{}} onPress={toggleTimePicker}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={{}} onPress={confirmIOSTime}>
            <Text style={styles.buttonText}>OK</Text>
          </TouchableOpacity>
        </View>
      )}

      {!showPicker && (
        <Pressable onPress={toggleTimePicker} disabled={!isEditable}>
          <TextInput
            mode="outlined"
            variant="bodyMedium"
            style={styles.textInput}
            placeholder="Hora"
            value={startTime}
            onChangeText={setStartTime}
            editable={false}
            onPressIn={toggleTimePicker}
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
    flexDirection: "row",
    paddingTop: 10,
  },
  flexContainer: {
    justifyContent: "flex-end",
  },
  background: {
    backgroundColor: "white",
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#fff",
  },
  textInput: {
    flex: 1, // Distribute available space equally among children
    margin: 5,
  },
});

export default TimeComponent;

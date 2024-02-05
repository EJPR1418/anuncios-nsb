import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';

const DropdownComponent = ({ selected, data, placeholder, onSelect }) => {
  const [value, setValue] = useState(selected);

  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder={placeholder}
        // searchPlaceholder="Search..."
        value={value}
        onChange={(item) => {
          onSelect(item.value);
          setValue(item.value);
        }}
      />
    </View>
  );
};

DropdownComponent.propTypes = {
  selected: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
    marginRight: 10,
  },
  dropdown: {
    height: 50,
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  icon: {
    marginRight: 5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});

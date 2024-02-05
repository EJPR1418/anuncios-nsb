import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import PropTypes from 'prop-types';

const MultiSelectComponent = ({ selected, placeholder, data, onSelect }) => {
  const [value, setValue] = useState(selected);

  return (
    <View style={styles.container}>
      <MultiSelect
        style={styles.dropdown}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        labelField='label'
        valueField='value'
        placeholder={placeholder}
        value={value}
        search
        searchPlaceholder='Buscar'
        onChange={(item) => {
          setValue(item);
          onSelect(item);
        }}
        selectedStyle={styles.selectedStyle}
      />
    </View>
  );
};

MultiSelectComponent.propTypes = {
  selected: PropTypes.array.isRequired,
  placeholder: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

export default MultiSelectComponent;

const styles = StyleSheet.create({
  container: { marginLeft: 10, marginRight: 10 },
  dropdown: {
    height: 50,
    backgroundColor: 'transparent',
    borderBottomColor: 'gray',
    borderBottomWidth: 0.5,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 14,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  icon: {
    marginRight: 5,
  },
  selectedStyle: {
    borderRadius: 12,
    fontSize: 16,
    color: 'black',
  },
});

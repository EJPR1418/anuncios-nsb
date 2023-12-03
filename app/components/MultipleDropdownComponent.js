import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { Text } from 'react-native-paper';

import { MultipleSelectList } from 'react-native-dropdown-select-list';
import PropTypes from 'prop-types';

function MultipleDropdownComponent({ label, data, onSelect, isEditing }) {
  const [selectedLocalValues, setSelectedLocalValues] = useState([]);

  const handleValueChange = (values) => {
    setSelectedLocalValues(values);
    onSelect(values); // Notify the parent component about the selected values
  };

  return (
    <View style={styles.container}>
      <Text variant='labelSmall' style={styles.label}>
        Select an option:
      </Text>
      <MultipleSelectList
        boxStyles={{ backgroundColor: 'white', borderRadius: 3 }}
        dropdownStyles={{ backgroundColor: 'white', borderRadius: 3 }}
        placeholder={label}
        setSelected={handleValueChange}
        data={data}
        save='value'
        label='Fraternidades'
      />
    </View>
  );
}

MultipleDropdownComponent.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

const styles = StyleSheet.create({
  container: {},
  label: {
    fontSize: 16,
    marginBottom: 8,
  },
});

export default MultipleDropdownComponent;

// import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
// import { SelectList } from 'react-native-dropdown-select-list';
// import PropTypes from 'prop-types';

// function DropdownComponent({
//   label,
//   data,
//   selectedValue,
//   onSelect,
//   isEditing,
// }) {
//   const [selectedLocalValue, setSelectedLocalValue] = useState('');

//   const handleValueChange = (value) => {
//     setSelectedLocalValue(value);
//     onSelect(value); // Notify the parent component about the selected value
//   };
//   return (
//     <SelectList
//       placeholder={label}
//       boxStyles={{
//         backgroundColor: 'white',
//         borderRadius: 3,
//       }}
//       dropdownStyles={{ backgroundColor: 'white', borderRadius: 3 }}
//       inputStyles={{ fontVariant: 'bodyMedium' }}
//       setSelected={handleValueChange}
//       data={data}
//       search={false}
//       maxHeight={90}
//       save='value'
//     />
//   );
// }

// DropdownComponent.propTypes = {
//   label: PropTypes.string.isRequired,
//   data: PropTypes.array.isRequired,
//   selectedValue: PropTypes.string.isRequired,
//   onSelect: PropTypes.func.isRequired,
//   isEditing: PropTypes.bool,
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   label: {
//     fontSize: 18,
//     marginBottom: 10,
//   },
//   selection: {
//     fontSize: 16,
//   },
//   button: {
//     marginTop: 20,
//   },
// });

// export default DropdownComponent;

import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import PropTypes from 'prop-types';

// const data = [
//   { label: 'Item 1', value: '1' },
//   { label: 'Item 2', value: '2' },
//   { label: 'Item 3', value: '3' },
//   { label: 'Item 4', value: '4' },
//   { label: 'Item 5', value: '5' },
//   { label: 'Item 6', value: '6' },
//   { label: 'Item 7', value: '7' },
//   { label: 'Item 8', value: '8' },
// ];

const DropdownComponent = ({ label, data, onSelect, isEditing }) => {
  const [value, setValue] = useState(null);
  const [isFocus, setIsFocus] = useState(false);

  const renderLabel = () => {
    if (value || isFocus) {
      return (
        <Text style={[styles.label, isFocus && { color: 'blue' }]}>
          {label}
        </Text>
      );
    }
    return null;
  };

  return (
    <View style={styles.container}>
      {renderLabel()}
      <Dropdown
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        // inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        data={data}
        search={false}
        maxHeight={300}
        labelField='label'
        valueField='value'
        placeholder={!isFocus ? label : '...'}
        searchPlaceholder='Search...'
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={(item) => {
          setValue(item.value);
          onSelect(item.value);
          setIsFocus(false);
        }}
        renderLeftIcon={() => (
          <AntDesign
            style={styles.icon}
            color={isFocus ? '#6200ea' : 'black'}
            name='Safety'
            size={20}
          />
        )}
      />
    </View>
  );
};

DropdownComponent.propTypes = {
  label: PropTypes.string.isRequired,
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 1,
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 8,
    elevation: 2,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 6,
    top: -5,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 10,
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

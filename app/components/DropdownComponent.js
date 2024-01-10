// import React, { useState } from 'react';
// import { StyleSheet } from 'react-native';
// import { Dropdown } from 'react-native-element-dropdown';
// import AntDesign from '@expo/vector-icons/AntDesign';
// import PropTypes from 'prop-types';

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

// const DropdownComponent = ({
//   // data,
//   labelField,
//   valueField,
//   placeholder,
//   onSelect,
// }) => {
//   const [value, setValue] = useState();

//   return (
//     <Dropdown
//       style={styles.dropdown}
//       placeholderStyle={styles.placeholderStyle}
//       selectedTextStyle={styles.selectedTextStyle}
//       inputSearchStyle={styles.inputSearchStyle}
//       iconStyle={styles.iconStyle}
//       itemTextStyle={styles.itemTextStyle}
//       data={data}
//       mode='modal'
//       // search
//       maxHeight={300}
//       labelField={labelField}
//       // valueField={valueField}
//       placeholder={placeholder}
//       // searchPlaceholder='Search...'
//       value={value}
//       onChange={(item) => {
//         setValue(item.value);
//         onSelect(item);
//       }}
//       // renderLeftIcon={() => (
//       //   <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
//       // )}
//     />
//   );
// };
// DropdownComponent.propTypes = {
//   data: PropTypes.array.isRequired,
//   onSelect: PropTypes.func.isRequired,
//   labelField: PropTypes.string.isRequired,
//   placeholder: PropTypes.string.isRequired,
// };

// export default DropdownComponent;

// const styles = StyleSheet.create({
//   dropdown: {
//     margin: 16,
//     height: 50,
//     borderBottomColor: 'gray',
//     borderBottomWidth: 0.5,
//   },
//   icon: {
//     marginRight: 5,
//   },
//   placeholderStyle: {
//     fontSize: 16,
//   },
//   selectedTextStyle: {
//     fontSize: 16,
//   },
//   itemTextStyle : {
//   color: 'black',
//   },
//   iconStyle: {
//     width: 20,
//     height: 20,
//   },
//   inputSearchStyle: {
//     height: 40,
//     fontSize: 16,
//   },
// });
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
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

const DropdownComponent = ({ data, placeholder, onSelect }) => {
  const [value, setValue] = useState(null);

  return (
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
        setValue(item.value);
        onSelect(item.label);
      }}
      // renderLeftIcon={() => (
      //   <AntDesign style={styles.icon} color="black" name="Safety" size={20} />
      // )}
    />
  );
};

DropdownComponent.propTypes = {
  data: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default DropdownComponent;

const styles = StyleSheet.create({
  dropdown: {
    margin: 6,
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

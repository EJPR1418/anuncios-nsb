import React, { useState } from 'react';
import { StyleSheet, View, Text } from 'react-native';
import { MultiSelect } from 'react-native-element-dropdown';
import AntDesign from '@expo/vector-icons/AntDesign';
import PropTypes from 'prop-types';

const MultiSelectComponent = ({ placeholder, data, onSelect, isEditing }) => {
  const [selected, setSelected] = useState([]);

  // const renderItem = (item) => {
  //   return (
  //     <View style={styles.item}>
  //       <Text style={styles.selectedTextStyle}>{item.label}</Text>
  //       <AntDesign style={styles.icon} color='black' name='Safety' size={20} />
  //     </View>
  //   );
  // };

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
        value={selected}
        search
        searchPlaceholder='Buscar'
        onChange={(item) => {
          setSelected(item);
          onSelect(item);
        }}
        selectedStyle={styles.selectedStyle}

        // renderLeftIcon={() => (
        //   <AntDesign
        //     style={styles.icon}
        //     color='black'
        //     name='Safety'
        //     size={20}
        //   />
        // )}
      />
    </View>
  );
};

MultiSelectComponent.propTypes = {
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
  },
});

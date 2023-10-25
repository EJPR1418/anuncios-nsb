import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import {
  TextInput,
  Portal,
  Modal,
  List,
  Checkbox,
  Button,
} from 'react-native-paper';
import PropTypes from 'prop-types';

function MultipleSelectionDropdown({ label, items, selectedValues, onSelect }) {
  const [visible, setVisible] = useState(false);

  const showMenu = () => setVisible(true);
  const hideMenu = () => setVisible(false);

  const handleMenuItemPress = (item) => {
    const updatedValues = selectedValues.includes(item)
      ? selectedValues.filter((value) => value !== item)
      : [...selectedValues, item];
    onSelect(updatedValues);
  };

  return (
    <View>
      <TextInput
        label={label}
        value={selectedValues.join(', ')}
        mode='outlined'
        multiline={true}
        onFocus={showMenu}
      />
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideMenu}
          contentContainerStyle={styles.modalContent}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.modalContainer}>
              <List.Section>
                {items.map((item, index) => (
                  <List.Item
                    key={index}
                    title={item}
                    right={() => (
                      <Checkbox
                        status={
                          selectedValues.includes(item)
                            ? 'checked'
                            : 'unchecked'
                        }
                        onPress={() => handleMenuItemPress(item)}
                      />
                    )}
                  />
                ))}
              </List.Section>
              <View style={styles.buttonContainer}>
                <Button
                  mode='contained'
                  onPress={() => {
                    hideMenu();
                  }}
                  style={styles.button}
                >
                  Ok
                </Button>
                <Button
                  mode='contained'
                  onPress={hideMenu}
                  style={styles.button}
                >
                  Cerrar
                </Button>
              </View>
            </View>
          </ScrollView>
        </Modal>
      </Portal>
    </View>
  );
}

MultipleSelectionDropdown.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedValues: PropTypes.array.isRequired,
  onSelect: PropTypes.func.isRequired,
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderRadius: 20,
    padding: 20,
    width: 300,
    backgroundColor: 'white',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange items horizontally
    justifyContent: 'space-between', // Space buttons evenly
  },
  button: {
    flex: 1, // Equal width for both buttons
    margin: 10,
  },
  scrollView: {
    flex: 1, // Make the ScrollView take up the entire modal content
  },
});

export default MultipleSelectionDropdown;

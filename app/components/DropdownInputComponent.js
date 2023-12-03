import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Modal, List, Portal, Surface } from 'react-native-paper';
import PropTypes from 'prop-types';

function DropdownInputComponent({
  label,
  items,
  selectedValue,
  onSelect,
  isEditing,
}) {
  const [visible, setVisible] = useState(false);

  const showMenu = () => {
    setVisible(true);
  };
  const hideMenu = () => setVisible(false);

  const handleMenuItemPress = (item) => {
    onSelect(item);
    hideMenu();
  };

  return (
    <View>
      <TextInput
        label={label}
        value={selectedValue}
        mode='outlined'
        onFocus={showMenu}
        editable={isEditing}
      />
      <Portal>
        <Modal
          contentContainerStyle={styles.modalContent}
          visible={visible}
          onDismiss={hideMenu}
        >
          <Surface style={styles.modalContainer}>
            <List.Section>
              {items.map((item, index) => (
                <List.Item
                  key={index}
                  title={item}
                  onPress={() => handleMenuItemPress(item)}
                />
              ))}
            </List.Section>
          </Surface>
        </Modal>
      </Portal>
    </View>
  );
}

DropdownInputComponent.propTypes = {
  label: PropTypes.string.isRequired,
  items: PropTypes.array.isRequired,
  selectedValue: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  isEditing: PropTypes.bool,
};

const styles = StyleSheet.create({
  modalContent: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalContainer: {
    borderRadius: 20, // Adjust the border radius for curved sides
    padding: 20,
    width: 300, // Set the desired width
    backgroundColor: 'white',
  },
});

export default DropdownInputComponent;

import React, { useState } from 'react';
import { ScrollView, View, StyleSheet } from 'react-native';
import { Card, Text, TextInput, Button, IconButton } from 'react-native-paper';

// Import your custom components
import CalendarInputComponent from '../components/CalendarInputComponent';
import TimeComponent from '../components/TimeComponent';
import DropdownInputComponent from '../components/DropdownInputComponent';
import MultipleSelectionDropdown from '../components/DropdownMultipleInputComponent';

function DetailsScreen() {
  const [text, setText] = useState('');
  const [selectedItemType, setSelectedItemType] = useState('');
  const [selectedItemClothing, setSelectedItemClothing] = useState('');
  const [selectedItemFraternityValues, setSelectedItemFraternityValues] =
    useState([]);

  const [imageSource, setImageSource] = useState('');
  const [isEditing, setIsEditing] = useState(false);

  const typeFraterno = ['Bonafide', 'Fraternos', 'Militante'];
  const clothingStyle = ['Casual', 'Formal', 'Casual Elegante'];
  const fraternityList = [
    'Nu Sigma Beta',
    'Alpha Beta Chi',
    'Alpha Omicron Sigma',
  ];

  const handleFraternitySelectionChange = (values) => {
    setSelectedItemFraternityValues(values);
  };

  const handleImageChange = () => {
    // Handle image source change here
  };

  const handleEditToggle = () => {
    setIsEditing(!isEditing);
  };

  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Card style={styles.card}>
          <Card.Cover
            source={{ uri: 'https://picsum.photos/800' /*imageSource*/ }}
            style={styles.cardImage}
          />
          {isEditing && (
            <View style={styles.overlay}>
              <TextInput
                label='Image Source'
                value={imageSource}
                onChangeText={handleImageChange}
                style={styles.input}
              />
              <Button mode='contained' onPress={handleEditToggle}>
                Done
              </Button>
            </View>
          )}
          {!isEditing && (
            <IconButton
              icon='pencil'
              size={30}
              style={styles.editIcon}
              onPress={handleEditToggle}
            />
          )}
          <Card.Content>
            <View style={styles.container}>
              <TextInput
                mode='outlined'
                label='Titulo'
                variant='bodyMedium'
                style={{ justifyContent: 'flex-start' }}
                value='Bazar Anual'
                onChangeText={(text) => setText(text)}
                editable={false}
              />
            </View>
            <View style={styles.container}>
              <TextInput
                mode='outlined'
                multiline={true}
                label='Descripcion'
                variant='bodyMedium'
                value='Ven y celebra junto a la fraternidad en el bazar anual...'
                onChangeText={(text) => setText(text)}
                editable={false}
              />
            </View>
            <View style={styles.rowContainer}>
              <View style={styles.calendarTimeContainer}>
                <DropdownInputComponent
                  label='Tipo'
                  items={typeFraterno}
                  selectedValue={selectedItemType}
                  onSelect={setSelectedItemType}
                />
              </View>
              <View style={styles.calendarTimeContainer}>
                <DropdownInputComponent
                  label='Vestimenta'
                  items={clothingStyle}
                  selectedValue={selectedItemClothing}
                  onSelect={setSelectedItemClothing}
                />
              </View>
            </View>
            <View style={styles.container}>
              <MultipleSelectionDropdown
                label='Fraternidades'
                items={fraternityList}
                selectedValues={selectedItemFraternityValues}
                onSelect={handleFraternitySelectionChange}
              />
            </View>
            <View style={styles.container}>
              <Text>Fecha y Hora de Inicio:</Text>
              <View style={styles.rowContainer}>
                <View style={styles.calendarTimeContainer}>
                  <CalendarInputComponent />
                </View>
                <View style={styles.calendarTimeContainer}>
                  <TimeComponent />
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <Text>Fecha y Hora de Salida:</Text>
              <View style={styles.rowContainer}>
                <View style={styles.calendarTimeContainer}>
                  <CalendarInputComponent />
                </View>
                <View style={styles.calendarTimeContainer}>
                  <TimeComponent />
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <Text>Localidad:</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  container: {
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: 'row',
    paddingTop: 10,
  },
  calendarTimeContainer: {
    flex: 1,
  },
  background: {
    backgroundColor: 'white',
  },
  buttonText: {
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  textInput: {
    flex: 1,
    marginVertical: 5,
  },
  card: {
    margin: 5,
  },
  cardImage: {
    height: 200,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    width: '80%',
    marginBottom: 10,
  },
  editIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
  },
});

export default DetailsScreen;

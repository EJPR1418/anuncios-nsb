import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, TextInput, Text, IconButton, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { Formik } from 'formik';
import axios from 'axios';

import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
// import { View, TextField, Text, Button } from 'react-native-ui-lib';
import { StackActions } from '@react-navigation/native';

// Import your custom components
import CalendarInputComponent from '../components/CalendarInputComponent';
import DropDown from 'react-native-paper-dropdown';

function DetailsScreen({ navigation }) {
  const [mapUrl, setMapUrl] = useState(
    'https://maps.app.goo.gl/mEEeAsCuxG6MX9rRA'
  );

  const [mapRegion, setMapRegion] = useState(null);
  const initialRegion = {
    latitude: 18.33893085548665,
    latitudeDelta: 3.0155829779597134,
    longitude: -66.55138915345485,
    longitudeDelta: 2.9817361344754687,
  };

  const [isEditing, setIsEditing] = useState(true);

  const [showClothingDropDown, setShowClothingDropDown] = useState(false);
  const [showTypeDropDown, setShowTypeDropDown] = useState(false);
  const [showMultiSelectDropDown, setShowMultiSelectDropDown] = useState(false);

  const typeFraterno = [
    { label: 'Miembro', value: '1' },
    { label: 'Bonafide', value: '2' },
  ];
  const clothingStyle = [
    { label: 'Casual', value: '1' },
    { label: 'Casual Elegante', value: '2' },
    { label: 'Semi Formal', value: '3' },
    { label: 'Formal', value: '4' },
  ];
  const fraternityList = [
    { label: 'Zona Arecibo', value: '1' },
    { label: 'Zona Caparra', value: '2' },
    { label: 'Capitulo Omicron', value: '3' },
  ];
  const mapRef = useRef();
  const extractCoordinatesFromGoogleMapsURL = async (url) => {
    // Validate url is from google
    const googleMapsShortURLPattern =
      /^https:\/\/maps\.app\.goo\.gl\/[A-Za-z0-9]+$/;
    if (!googleMapsShortURLPattern.test(url)) {
      alert('URL no es de Google.');
      return;
    }
    try {
      // Fetch the Google Maps link
      const response = await axios.get(url);
      // console.log(response);

      const { responseURL } = response.request;
      console.log(responseURL);
      if (responseURL) {
        const match = responseURL.match(/@(-?\d+\.\d+),(-?\d+\.\d+)/);

        if (match && match.length === 3) {
          setMapRegion({
            latitude: parseFloat(match[1]),
            // latitudeDelta: 0.0922,
            longitude: parseFloat(match[2]),
            // longitudeDelta: 0.0421,
          });

          mapRef.current?.animateToRegion({
            latitude: parseFloat(match[1]),
            latitudeDelta: 0.01,
            longitude: parseFloat(match[2]),
            longitudeDelta: 0.01,
          });
        } else {
          return null;
        }
      } else {
        throw new Error('Localizacion no encontrada en Google Maps link.');
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };
  const handleSelectedLocation = () => {
    extractCoordinatesFromGoogleMapsURL(mapUrl);
  };

  const handleSubmit = () => {
    // const event = new Event();
    // event.title = title;
    // event.description = description;
    // event.type = selectedItemType;
    // event.clothing = selectedItemClothing;
    // event.fraternities = selectedItemFraternityValues;
    // event.cost = cost;
    // event.startDate = selectedStartDate;
    // event.startTime = selectedStartTime;
    // event.endDate = selectedEndDate;
    // event.endTime = selectedEndTime;
    // event.imageSource = image;
    // if (isEditing) {
    //   event.editedBy = '';
    //   event.editedDate = new Date();
    // } else {
    //   event.createdBy = '';
    //   event.createdDate = new Date();
    // }
    // console.log(event);
    // //Call post api to db
    // //Add async success button
    // // if true, go back, else stay
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);

    // Handle form submission, e.g., send data to the server
  };

  // const [image, setImage] = useState(require('../assets/escudo_nsb.jpg')); //https://picsum.photos/700

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    // console.log(result);

    if (!result.canceled) {
      const { uri } = result.assets[0];
      console.log(uri);
      return uri;
      //setImage({ uri: result.assets[0].uri }); //Change to uri when select photo
    }
  };

  return (
    <Formik
      initialValues={{
        useLocalImage: true,
        selectedImage: null,
        image: '',
        title: '',
        description: '',
        type: '',
        clothing: '',
        organizers: '',
        cost: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
      }}
      onSubmit={(values) => {
        console.log(values);
      }}
    >
      {(formikProps) => (
        <ScrollView>
          <View style={styles.mainContainer}>
            <Card style={styles.card}>
              <View>
                <Card.Cover
                  source={
                    !formikProps.values.selectedImage
                      ? require('../assets/escudo_nsb.jpg')
                      : { uri: formikProps.values.selectedImage }
                  }
                  style={styles.cardImage}
                  resizeMode='contain'
                />
                <View style={styles.editButtonContainer}>
                  <IconButton
                    icon='pencil' // Replace with your desired edit icon (e.g., 'pencil', 'pencil-outline')
                    iconColor='white'
                    size={24}
                    onPress={() => {
                      // const _selectedImage = pickImage();
                      formikProps.setFieldValue('selectedImage', pickImage());
                    }}
                  />
                </View>
              </View>
              <Card.Content>
                <View style={styles.container}>
                  <TextInput
                    mode='outlined'
                    label='Titulo'
                    style={styles.input}
                    value={formikProps.values.title}
                    onChangeText={formikProps.handleChange('title')}
                    editable={isEditing}
                  />
                </View>
                <View style={styles.container}>
                  <TextInput
                    mode='outlined'
                    multiline={true}
                    label='Descripcion'
                    variant='bodyMedium'
                    style={styles.input}
                    value={formikProps.values.description}
                    onChangeText={formikProps.handleChange('description')}
                    editable={isEditing}
                  />
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.dropdownInputContainer}>
                    <DropDown
                      label={'Tipo'}
                      mode={'outlined'}
                      visible={showTypeDropDown}
                      showDropDown={() => setShowTypeDropDown(true)}
                      onDismiss={() => setShowTypeDropDown(false)}
                      value={formikProps.values.type}
                      setValue={formikProps.handleChange('type')}
                      list={typeFraterno}
                    />
                  </View>
                  <View style={styles.dropdownInputContainer}>
                    <DropDown
                      label={'Vestimenta'}
                      mode={'outlined'}
                      visible={showClothingDropDown}
                      showDropDown={() => setShowClothingDropDown(true)}
                      onDismiss={() => setShowClothingDropDown(false)}
                      value={formikProps.values.clothing}
                      setValue={formikProps.handleChange('clothing')}
                      list={clothingStyle}
                    />
                  </View>
                </View>
                <View style={styles.container}>
                  <DropDown
                    label={'Organizador por...'}
                    mode={'outlined'}
                    visible={showMultiSelectDropDown}
                    showDropDown={() => setShowMultiSelectDropDown(true)}
                    onDismiss={() => setShowMultiSelectDropDown(false)}
                    value={formikProps.values.organizers}
                    setValue={formikProps.handleChange('organizers')}
                    list={fraternityList}
                    multiSelect
                  />
                </View>
                <View style={styles.container}>
                  <TextInput
                    label='Costo o Donativo'
                    mode='outlined'
                    value={formikProps.values.cost}
                    onChangeText={formikProps.handleChange('cost')}
                    keyboardType='numeric' // Ensure the keyboard shows numbers
                  />
                </View>
                <View style={styles.container}>
                  <Text variant='labelMedium'>Inicio:</Text>
                  <View style={styles.rowContainer}>
                    <View style={styles.calendarTimeContainer}>
                      <CalendarInputComponent
                        value={formikProps.values.startDate}
                        onDateChange={(date) =>
                          formikProps.setFieldValue('startDate', date)
                        }
                        label='Fecha'
                        mode='date'
                        editable={isEditing}
                      />
                    </View>
                    <View style={styles.calendarTimeContainer}>
                      <CalendarInputComponent
                        value={formikProps.values.startTime}
                        onDateChange={(date) =>
                          formikProps.setFieldValue('startTime', date)
                        }
                        label='Hora'
                        mode='time'
                        editable={isEditing}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.container}>
                  <Text variant='labelMedium'>Culminacion:</Text>
                  <View style={styles.rowContainer}>
                    <View style={styles.calendarTimeContainer}>
                      <CalendarInputComponent
                        value={formikProps.values.endDate}
                        onDateChange={(date) =>
                          formikProps.setFieldValue('endDate', date)
                        }
                        label='Fecha'
                        mode='date'
                        editable={isEditing}
                      />
                    </View>
                    <View style={styles.calendarTimeContainer}>
                      <CalendarInputComponent
                        value={formikProps.values.endTime}
                        onDateChange={(date) =>
                          formikProps.setFieldValue('endTime', date)
                        }
                        label='Hora'
                        mode='time'
                        editable={isEditing}
                      />
                    </View>
                  </View>
                </View>
                <View style={styles.container}>
                  <Text variant='labelMedium'>Localidad:</Text>
                  <View style={styles.rowContainer}>
                    <View style={(styles.container, { flex: 5 })}>
                      <TextInput
                        label='Direccion'
                        multiline={true}
                        mode='outlined'
                        value={mapUrl}
                        onChangeText={(url) => setMapUrl(url)}
                      />
                    </View>
                    <View
                      style={{ flex: 1, justifyContent: 'center', padding: 1 }}
                    >
                      <IconButton
                        icon='map-search'
                        size={30}
                        style={{
                          backgroundColor: '#ADD8E6',
                          borderRadius: 10,
                        }}
                        onPress={handleSelectedLocation}
                      />
                    </View>
                  </View>
                  <View style={styles.mapContainer}>
                    <MapView
                      provider='google'
                      style={styles.map}
                      initialRegion={initialRegion}
                      ref={mapRef}
                    >
                      {mapRegion && (
                        <Marker coordinate={mapRegion} title='AQUII' />
                      )}
                    </MapView>
                  </View>
                </View>
                <View style={{ padding: 30 }}>
                  <Button
                    title='Submit'
                    style={{ backgroundColor: 'blue' }}
                    onPress={formikProps.handleSubmit}
                  />
                </View>
              </Card.Content>
            </Card>
          </View>
        </ScrollView>
      )}
    </Formik>
  );
}
DetailsScreen.propTypes = {
  navigation: PropTypes.shape({
    dispatch: PropTypes.func.isRequired,
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    padding: 10,
  },
  container: {
    paddingTop: 10,
  },
  mapContainer: {
    paddingTop: 10,
    flex: 1,
    height: 200,
  },
  map: {
    width: '100%',
    height: '100%',
  },
  rowContainer: {
    flexDirection: 'row',
    flex: 1,
    justifyContent: 'space-between',
  },
  calendarTimeContainer: {
    flex: 1,
    padding: 1,
  },
  dropdownInputContainer: {
    flex: 1, // Each container takes up half of the available space
    marginHorizontal: 1,
  },
  background: {
    backgroundColor: 'white',
  },
  card: {
    margin: 5,
  },
  cardImage: {
    width: '100%',
    height: undefined,
    aspectRatio: 1,
  },
  input: {
    marginBottom: 10,
    borderRadius: 10, // Adjust the value as needed
  },
  inputMultiline: {
    marginBottom: 10,
    borderRadius: 10,
    paddingTop: 15,
  },
  editButtonContainer: {
    position: 'absolute',
    borderRadius: 50,
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
    backgroundColor: 'black', // Make the background transparent
  },
  searchBarContainer: {
    backgroundColor: 'white',
    zIndex: 1,
  },
  searchBarParentContainer: {
    zIndex: 1,
    padding: 10,
  },
});

export default DetailsScreen;

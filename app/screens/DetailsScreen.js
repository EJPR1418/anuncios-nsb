import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Card, TextInput, Text, IconButton, Button } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
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
  const [mapUrl, setMapUrl] = useState(); //https://maps.app.goo.gl/mEEeAsCuxG6MX9rRA

  const [mapRegion, setMapRegion] = useState(null);
  const initialRegion = {
    latitude: 18.33893085548665,
    latitudeDelta: 3.0155829779597134,
    longitude: -66.55138915345485,
    longitudeDelta: 2.9817361344754687,
  };

  const route = useRoute();
  const selectedLocation = route.params?.selectedLocation;

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
  const handleSelectedLocation = async () => {
    try {
      console.log(mapUrl);
      // Fetch the Google Maps link
      const response = await axios.get(mapUrl);
      // console.log(response);

      const { responseURL } = response.request;
      console.log(responseURL);

      // const googlesAPI_KEY = 'AIzaSyBHaA-533YgKO6n88yFYm6bVKWMLGIJdxk';
      // const placeResponse = await axios.get(
      //   `https://maps.googleapis.com/maps/api/place/textsearch/json?query=${encodeURIComponent(
      //     mapUrl
      //   )}&key=${googlesAPI_KEY}`
      // );
      // const { result } = placeResponse.data;

      // console.log(result);

      if (responseURL) {
        // let placeIdMatch = responseURL.match(/placeid=([^&]+)/);
        // let placeId;

        // if (placeIdMatch && placeIdMatch.length >= 2) {
        //   placeId = placeIdMatch[1];
        // }
        // console.log(placeId);
        // // if (!placeId) {
        // //   Alert.alert('Invalid Google Maps link', 'Please enter a valid Google Maps link.');
        // //   return;
        // // }

        // const googlesAPI_KEY = 'AIzaSyBHaA-533YgKO6n88yFYm6bVKWMLGIJdxk';
        // // Make a request to the Google Places API
        // const placeResponse = await axios.get(
        //   `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${googlesAPI_KEY}`
        // );

        // const { result } = placeResponse.data;

        // console.log(result);

        const latLngRegex = /!3d(-?\d+(\.\d+)?)!4d(-?\d+(\.\d+)?)/;
        const match = responseURL.match(latLngRegex);
        console.log(match);
        if (match) {
          setMapRegion({
            latitude: parseFloat(match[1]),
            latitudeDelta: 0.01,
            longitude: parseFloat(match[3]),
            longitudeDelta: 0.01,
          });

          mapRef.current?.animateToRegion({
            latitude: parseFloat(match[1]),
            latitudeDelta: 0.01,
            longitude: parseFloat(match[3]),
            longitudeDelta: 0.01,
          });
        } else {
          return null;
        }
      }
    } catch (error) {
      console.error('Error:', error.message);
      return null;
    }
  };

  const handleSubmit = () => {
    const popAction = StackActions.pop(1);

    navigation.dispatch(popAction);

    // Handle form submission, e.g., send data to the server
  };

  const [image, setImage] = useState(require('../assets/escudo_nsb.jpg')); //https://picsum.photos/700
  const [imageUri, setImageUri] = useState('');
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
      // console.log(uri);
      setImageUri(uri);
      setImage({ uri: result.assets[0].uri }); //Change to uri when select photo
    }
  };

  return (
    <Formik
      initialValues={{
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
        mapUrl: '',
      }}
      onSubmit={(values) => {
        const valuesToSend = { ...values, imageUri, mapRegion };
        // Validate mapURL
        // Handle image upload
        console.log(valuesToSend);
      }}
    >
      {(formikProps) => (
        <ScrollView>
          <View style={styles.mainContainer}>
            <Card style={styles.card}>
              <View>
                <Card.Cover
                  source={image}
                  style={styles.cardImage}
                  resizeMode='contain'
                />
                <View style={styles.editButtonContainer}>
                  <IconButton
                    icon='pencil' // Replace with your desired edit icon (e.g., 'pencil', 'pencil-outline')
                    iconColor='white'
                    size={24}
                    onPress={() => {
                      pickImage();
                      // const _selectedImage = pickImage();
                      //formikProps.setFieldValue('selectedImage', pickImage());
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
                      {selectedLocation && (
                        <TextInput
                          label='Direccion'
                          multiline={true}
                          mode='outlined'
                          value={selectedLocation.name}
                          onChangeText={(url) => {
                            setMapUrl(url);
                            formikProps.setFieldValue('mapUrl', url);
                          }}
                        />
                      )}
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
                        onPress={
                          () => navigation.navigate('Mapa')
                          //handleSelectedLocation
                        }
                      />
                    </View>
                  </View>
                  {selectedLocation && (
                    <View style={styles.mapContainer}>
                      <MapView
                        provider='google'
                        style={styles.map}
                        initialRegion={selectedLocation.coordinates}
                        ref={mapRef}
                      >
                        {selectedLocation && (
                          <Marker
                            coordinate={selectedLocation.coordinates}
                            title='Ave Frate!'
                          />
                        )}
                      </MapView>
                    </View>
                  )}
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
    borderRadius: 20,
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

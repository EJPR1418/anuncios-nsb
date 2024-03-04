import React, { useState, useEffect, useRef, useLayoutEffect } from 'react';
import {
  ScrollView,
  StyleSheet,
  View,
  ActivityIndicator,
  Linking,
} from 'react-native';
import {
  Card,
  Input,
  Text,
  Button,
  Icon,
  CheckBox,
  BottomSheet,
  Dialog,
} from '@rneui/themed';

import MapView, { Marker, Callout } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
import { db, auth } from '../firebase/firebase';
import { ref as dRef, push } from 'firebase/database';
import {
  getStorage,
  uploadBytes,
  ref as sRef,
  getDownloadURL,
} from 'firebase/storage';

import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import MultipleDropdownComponent from '../components/MultipleDropdownComp';
import DropdownComponent from '../components/DropdownComponent';
import CurrencyInput from '../components/CurrencyInputComponent';
import CalendarInputComponent from '../components/CalendarInputComponent';
import EventsSchema from '../schemas/EventSchema';
import MapComponent from '../components/MapComponent';

function EventCreateScreen({ navigation }) {
  // const route = useRoute();
  const mapRef = useRef();
  const formikRef = useRef();
  // const { selectedLocation } = route.params || {};

  const [isEditing, setIsEditing] = useState(true);

  const typeFraterno = [
    { label: 'Miembro', value: '1' },
    { label: 'Bonafide', value: '2' },
  ];
  const clothingStyle = [
    { label: 'Casual', value: '1' },
    { label: 'Casual-Elegante', value: '2' },
    { label: 'Semi-Formal', value: '3' },
    { label: 'Formal', value: '4' },
  ];
  const fraternityList = [
    { label: 'Zona Arecibo', value: '1' },
    { label: 'Zona Caparra', value: '2' },
    { label: 'Capitulo Omicron', value: '3' },
  ];

  useEffect(() => {
    // if (selectedLocation) {
    //   formikRef.current.setFieldValue('locationAddress', selectedLocation.name);
    //   if (firstUpdate.current) {
    //     firstUpdate.current = false;
    //     return;
    //   }
    //   mapRef.current?.animateToRegion(selectedLocation.coordinates);
    // }
  }, []);
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState(require('../assets/escudo_nsb.jpg')); //https://picsum.photos/700
  const [localFileName, setLocalFileName] = useState(null);
  const [imageBlob, setImageBlob] = useState(null);

  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState();
  const [isVisible, setIsVisible] = useState(false);

  const handleOpenModal = () => {
    setIsModalVisible(true);
  };

  const handleCloseModal = (location) => {
    setIsModalVisible(false);
    formikRef.current.setFieldValue('locationAddress', location.name);
    mapRef.current?.animateToRegion(location.coordinates);
    console.log(location);
    setSelectedLocation(location);
  };

  const handleCancelModal = () => {
    setIsModalVisible(false);
  };

  const openGoogleMaps = () => {
    const { latitude, longitude } = selectedLocation.coordinates;
    const appleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`;
    Linking.openURL(appleMapsUrl);
    setIsVisible(false);
  };

  const openAppleMaps = () => {
    const { latitude, longitude } = selectedLocation.coordinates;
    const appleMapsUrl = `http://maps.apple.com/?ll=${latitude},${longitude}`;
    Linking.openURL(appleMapsUrl);
    setIsVisible(false);
  };

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      const { uri } = result.assets[0];
      const blob = await uriToBlob(uri);
      // console.log(blob);
      if (blob) {
        const { name } = blob._data;

        setLocalFileName(name);
        setImageBlob(blob);
      }

      setImage({ uri: uri });
    }
  };

  const uriToBlob = async (uri) => {
    const response = await fetch(uri);
    const blob = await response.blob();
    return blob;
  };

  const onSubmit = async (values) => {
    try {
      console.log(values);
      setIsLoading(true);
      let imageUrl = '';
      if (imageBlob && localFileName) {
        console.log('entre');
        const storage = getStorage();
        const storageRef = sRef(storage, `events/${localFileName}`);
        await uploadBytes(storageRef, imageBlob);
        imageUrl = await getDownloadURL(storageRef);
      }
      const createdBy = auth.currentUser.uid;
      const createdDate = new Date();
      // const fileName = localFileName;

      const postValues = {
        ...values,
        selectedLocation,
        createdBy,
        createdDate,
        imageUrl,
      };

      console.log(postValues);
      push(dRef(db, 'nsb/events'), postValues);
      formikRef.current.resetForm();
      // const popAction = StackActions.pop(1);

      // navigation.dispatch(popAction);
    } catch (ex) {
      setIsLoading(false);
      console.log(ex);
      alert(ex);
      return;
    } finally {
      setIsLoading(false);
      alert('Evento Creado');
    }
  };

  return (
    <Formik
      innerRef={formikRef}
      initialValues={{
        title: '',
        description: '',
        type: '',
        clothing: '',
        organizers: [],
        cost: '',
        donations: false,
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        locationAddress: '',
        createdBy: '',
        createdDate: '',
        editedBy: '',
        editedDate: '',
      }}
      validationSchema={EventsSchema}
      onSubmit={onSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
        setFieldValue,
        resetForm,
      }) => (
        <ScrollView>
          <View style={styles.mainContainer}>
            <Card containerStyle={styles.card}>
              <View>
                <Card.Image
                  source={image}
                  style={styles.cardImage}
                  resizeMode='cover'
                  PlaceholderContent={<ActivityIndicator />}
                />
                <View style={styles.editButtonContainer}>
                  <Icon
                    name='edit'
                    type='material'
                    color='black'
                    size={30}
                    solid
                    onPress={() => pickImage()}
                  />
                </View>
              </View>
              <Card.Divider />
              <View style={styles.container}>
                <Input
                  label='Titulo'
                  value={values.title}
                  onChangeText={handleChange('title')}
                  editable={isEditing}
                  onBlur={handleBlur('title')}
                />
                {errors.title && touched.title && (
                  <Text style={styles.errorText}>{errors.title}</Text>
                )}
              </View>
              <View style={styles.container}>
                <Input
                  label='Descripcion'
                  multiline={true}
                  value={values.description}
                  onChangeText={handleChange('description')}
                  editable={isEditing}
                  onBlur={handleBlur('description')}
                />
                {errors.description && touched.description && (
                  <Text style={styles.errorText}>{errors.description}</Text>
                )}
              </View>
              <View style={styles.container}>
                <View style={styles.rowContainer}>
                  <View style={styles.dropdownInputContainer}>
                    <Text style={styles.labelStyle}>Tipo</Text>

                    <DropdownComponent
                      editable={false}
                      data={typeFraterno}
                      selected={values.type}
                      onSelect={(tipo) => {
                        setFieldValue('type', tipo);
                      }}
                      placeholder='Seleccione'
                    />
                    {errors.type && touched.type && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errors.type}</Text>
                      </View>
                    )}
                  </View>
                  <View style={styles.dropdownInputContainer}>
                    <Text style={styles.labelStyle}>Vestimenta</Text>

                    <DropdownComponent
                      editable={false}
                      data={clothingStyle}
                      selected={values.clothing}
                      onSelect={(clothing) => {
                        setFieldValue('clothing', clothing);
                      }}
                      placeholder='Seleccione'
                    />
                    {errors.clothing && touched.clothing && (
                      <View style={styles.errorContainer}>
                        <Text style={styles.errorText}>{errors.clothing}</Text>
                      </View>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View style={{ paddingTop: 20 }}></View>
                <Text style={styles.labelStyle}>Organizador</Text>

                <MultipleDropdownComponent
                  editable={false}
                  data={fraternityList}
                  selected={values.organizers}
                  onSelect={(organizers) => {
                    setFieldValue('organizers', organizers);
                  }}
                  placeholder='Seleccione...'
                />
                {errors.organizers && touched.organizers && (
                  <View style={styles.errorContainer}>
                    <Text style={styles.errorText}>{errors.organizers}</Text>
                  </View>
                )}
              </View>
              <View style={{ paddingTop: 20 }}>
                <View style={styles.rowContainer}>
                  <View style={styles.dropdownInputContainer}>
                    <Input
                      label='Costo'
                      value={values.cost}
                      onChangeText={handleChange('cost')}
                      keyboardType='numeric'
                      onBlur={handleBlur('cost')}
                    />
                    {errors.cost && touched.cost && (
                      <Text style={styles.errorText}>{errors.cost}</Text>
                    )}
                  </View>
                  <View style={styles.dropdownInputContainer}>
                    <CheckBox
                      center
                      title='Donaciones?'
                      checked={values.donations}
                      size={28}
                      color='grey'
                      onPress={() =>
                        setFieldValue('donations', !values.donations)
                      }
                    />
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'flex-start',
                      paddingBottom: 5,
                      paddingLeft: 5,
                      fontWeight: 'bold',
                      color: 'gray',
                    }}
                  >
                    Fecha de Inicio
                  </Text>
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.calendarTimeContainer}>
                    <CalendarInputComponent
                      value={values.startDate}
                      onDateChange={(date) => setFieldValue('startDate', date)}
                      label='Dia'
                      mode='date'
                      editable={isEditing}
                    />
                    {errors.startDate && touched.startDate && (
                      <Text style={styles.errorText}>{errors.startDate}</Text>
                    )}
                  </View>
                  <View style={styles.calendarTimeContainer}>
                    <CalendarInputComponent
                      value={values.startTime}
                      onDateChange={(date) => setFieldValue('startTime', date)}
                      label='Hora'
                      mode='time'
                      editable={isEditing}
                    />
                    {errors.startTime && touched.startTime && (
                      <Text style={styles.errorText}>{errors.startTime}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View>
                  <Text
                    style={{
                      fontSize: 16,
                      alignSelf: 'flex-start',
                      paddingBottom: 5,
                      paddingLeft: 5,
                      fontWeight: 'bold',
                      color: 'gray',
                    }}
                  >
                    Fecha de Culminacion
                  </Text>
                  {/* <Divider /> */}
                </View>
                <View style={styles.rowContainer}>
                  <View style={styles.calendarTimeContainer}>
                    <CalendarInputComponent
                      value={values.endDate}
                      onDateChange={(date) => setFieldValue('endDate', date)}
                      label='Dia'
                      mode='date'
                      editable={isEditing}
                    />
                    {errors.endDate && touched.endDate && (
                      <Text style={styles.errorText}>{errors.endDate}</Text>
                    )}
                  </View>
                  <View style={styles.calendarTimeContainer}>
                    <CalendarInputComponent
                      value={values.endTime}
                      onDateChange={(date) => setFieldValue('endTime', date)}
                      label='Hora'
                      mode='time'
                      editable={isEditing}
                    />
                    {errors.endTime && touched.endTime && (
                      <Text style={styles.errorText}>{errors.endTime}</Text>
                    )}
                  </View>
                </View>
              </View>
              <View style={styles.container}>
                <View style={styles.rowContainer}>
                  <View style={(styles.container, { flex: 5 })}>
                    <Input
                      label='Localidad'
                      multiline={true}
                      value={values.locationAddress}
                      onChangeText={handleChange('locationAddress')}
                      editable={false}
                      rightIcon={
                        <Icon
                          name='map-search'
                          type='material-community'
                          size={30}
                          onPress={handleOpenModal}
                        />
                      }
                    />
                    {errors.locationAddress && touched.locationAddress && (
                      <Text style={styles.errorText}>
                        {errors.locationAddress}
                      </Text>
                    )}
                  </View>
                </View>
                {selectedLocation ? (
                  <View style={styles.mapContainer}>
                    <MapView
                      provider='google'
                      style={styles.map}
                      initialRegion={selectedLocation.coordinates}
                      ref={mapRef}
                    >
                      <Marker
                        coordinate={selectedLocation.coordinates}
                        title='Ave Frate!'
                      />
                      <Callout tooltip>
                        <View style={styles.calloutContainer}>
                          <Text
                            style={styles.calloutText}
                            onPress={() => {
                              setIsVisible(true);
                            }}
                          >
                            Abrir en mapa
                          </Text>
                        </View>
                      </Callout>
                    </MapView>
                  </View>
                ) : null}
              </View>
              <View style={styles.container}>
                <View style={styles.rowContainer}>
                  <View style={styles.calendarTimeContainer}>
                    <Button
                      title='Crear'
                      buttonStyle={{
                        backgroundColor: '#002366',
                        borderRadius: 20,
                      }}
                      onPress={handleSubmit}
                    />
                  </View>
                  <View style={styles.calendarTimeContainer}>
                    <Button
                      title='Limpiar'
                      buttonStyle={{
                        backgroundColor: '#002366',
                        borderRadius: 20,
                      }}
                      onPress={resetForm}
                    />
                  </View>
                </View>
              </View>
              <View style={{ flex: 1 }}>
                <BottomSheet isVisible={isVisible}>
                  <View style={styles.buttonContainer}>
                    <Button
                      title='Abrir en Google Maps'
                      onPress={openGoogleMaps}
                      buttonStyle={styles.button}
                      titleStyle={styles.buttonTitle}
                    />
                    <Button
                      title='Abrir en Apple Maps'
                      onPress={openAppleMaps}
                      buttonStyle={styles.button}
                      titleStyle={styles.buttonTitle}
                    />
                    <Button
                      title='Cancelar'
                      onPress={() => setIsVisible(false)}
                      buttonStyle={[styles.button, styles.cancelButton]}
                      titleStyle={styles.buttonTitle}
                    />
                  </View>
                </BottomSheet>
              </View>
            </Card>
          </View>
          <View style={styles.activityLoading}>
            <Dialog isVisible={isLoading}>
              <Dialog.Loading loadingStyle={{ color: '#002366' }} />
              <Dialog.Title title='Creando Evento...' />
            </Dialog>
          </View>
          <MapComponent
            isVisible={isModalVisible}
            closeModal={handleCloseModal}
            cancelModal={handleCancelModal}
          />
        </ScrollView>
      )}
    </Formik>
  );
}
EventCreateScreen.propTypes = {
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
    height: 150,
  },
  map: {
    borderRadius: 10,
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
    borderRadius: 10,
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
  labelStyle: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  editButtonContainer: {
    position: 'absolute',
    borderRadius: 50,
    top: 10, // Adjust the top position as needed
    right: 10, // Adjust the right position as needed
  },
  searchBarContainer: {
    backgroundColor: 'white',
    zIndex: 1,
  },
  searchBarParentContainer: {
    zIndex: 1,
    padding: 10,
  },
  errorText: {
    color: 'red',
    paddingLeft: 10,
    fontSize: 12,
  },
  errorContainer: {
    paddingTop: 20,
  },
  activityLoading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutContainer: {
    paddingHorizontal: 10,
    paddingVertical: 5,
    // backgroundColor: 'white',
    borderRadius: 10,
    elevation: 4,
  },
  calloutText: {
    fontSize: 16,
    color: 'blue',
  },
  buttonContainer: {
    alignItems: 'stretch',
    justifyContent: 'center',
    marginVertical: 20,
  },
  button: {
    marginVertical: 5,
    backgroundColor: '#002366', // Set your button background color here
  },
  buttonTitle: {
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: 'red', // Set your cancel button background color here
  },
});

export default EventCreateScreen;

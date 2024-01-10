import React, { useState, useRef } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
// import { Card, TextInput, Text, IconButton, Button } from 'react-native-paper';
import { Card, Input, Text, Button, Icon, Divider } from '@rneui/themed';

import MapView, { Marker } from 'react-native-maps';
import { useRoute } from '@react-navigation/native';
import { Formik } from 'formik';
// import axios from 'axios';
import * as yup from 'yup';

import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import { StackActions } from '@react-navigation/native';
import MultipleDropdownComponent from '../components/MultipleDropdownComp';
import DropdownComponent from '../components/DropdownComponent';
import CurrencyInput from '../components/CurrencyInputComponent';
// Import your custom components
import CalendarInputComponent from '../components/CalendarInputComponent';
// import DropDown from 'react-native-paper-dropdown';

function DetailsScreen({ navigation }) {
  const [mapUrl, setMapUrl] = useState(); //https://maps.app.goo.gl/mEEeAsCuxG6MX9rRA

  const route = useRoute();
  const selectedLocation = route.params?.selectedLocation;

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
  const mapRef = useRef();

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

  const onSubmit = async (values, actions) => {
    await new Promise((resolve) => setTimeout(resolve, 1000)); //Change when calling post
    actions.resetForm;
    const postValues = { ...values, imageUri, selectedLocation };
    console.log(postValues);
  };

  const detailsSchema = yup.object().shape({
    title: yup
      .string()
      .min(2, 'Muy Corto!')
      .max(30, 'Muy Largo!')
      .required('Requerido'),
    description: yup
      .string()
      .min(5, 'Muy Corto!')
      .max(100, 'Muy Largo!')
      .required('Requerido'),
    type: yup
      .string()
      // .min(1, 'Seleccione el tipo de evento')
      .required('Requerido'),
    clothing: yup
      .string()
      // .min(1, 'Seleccione codigo de vestimenta')
      .required('Requerido'),
    organizers: yup
      .array()
      .min(1, 'Seleccione al menos un organizador')
      .required('Requerido'),
    cost: yup
      .number()
      .required('Requerido')
      .min(1000, 'minimal Rp 1.000')
      .positive('No numeros negativos'),
    startDate: yup.string().required('Requerido'),
    startTime: yup.string().required('Requerido'),
    endDate: yup.string().required('Requerido'),
    endTime: yup.string().required('Requerido'),
    mapUrl: yup.string().required('Requerido'),
  });

  return (
    <Formik
      initialValues={{
        title: '',
        description: '',
        type: '',
        clothing: '',
        organizers: [],
        cost: '',
        startDate: '',
        startTime: '',
        endDate: '',
        endTime: '',
        mapUrl: '',
      }}
      validationSchema={detailsSchema}
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
      }) => (
        <ScrollView>
          <View style={styles.mainContainer}>
            <Card containerStyle={styles.card}>
              <View>
                <Card.Image
                  source={image}
                  style={styles.cardImage}
                  resizeMode='cover'
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
              <View style={styles.rowContainer}>
                <View style={styles.dropdownInputContainer}>
                  <DropdownComponent
                    data={typeFraterno}
                    onSelect={(tipo) => {
                      setFieldValue('type', tipo);
                    }}
                    placeholder='Tipo'
                  />
                  {errors.type && (
                    <Text style={styles.errorText}>{errors.type}</Text>
                  )}
                </View>
                <View style={styles.dropdownInputContainer}>
                  <DropdownComponent
                    data={clothingStyle}
                    onSelect={(clothing) => {
                      setFieldValue('clothing', clothing);
                    }}
                    placeholder='Vestimenta'
                  />
                  {errors.clothing && (
                    <Text style={styles.errorText}>{errors.clothing}</Text>
                  )}
                </View>
              </View>
              <View style={styles.container}>
                <MultipleDropdownComponent
                  data={fraternityList}
                  onSelect={(organizers) => {
                    setFieldValue('organizers', organizers);
                  }}
                  placeholder='Organizado por...'
                />
                {errors.organizers && touched.organizers && (
                  <Text style={styles.errorText}>{errors.organizers}</Text>
                )}
              </View>
              <View style={styles.container}>
                <Input
                  label='Costo o Donativo'
                  value={values.cost}
                  onChangeText={handleChange('cost')}
                  keyboardType='numeric'
                  onBlur={handleBlur('cost')}
                />
                {errors.cost && touched.cost && (
                  <Text style={styles.errorText}>{errors.cost}</Text>
                )}
                {/* <CurrencyInput
                  label='Costo o Donativo'
                  value={values.cost}
                  onChangeText={(maskedText, rawText) => {
                    setFieldValue('cost', rawText);
                    console.log(rawText);
                  }}
                /> */}
              </View>
              <View style={styles.container}>
                <View>
                  <Text style={{ fontSize: 18, alignSelf: 'flex-start' }}>
                    Fecha de Inicio
                  </Text>
                  {/* <Divider /> */}
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
                  <Text style={{ fontSize: 18, alignSelf: 'flex-start' }}>
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
                      value={selectedLocation ? selectedLocation.name : ''}
                      onChangeText={(url) => {
                        setMapUrl(url);
                        setFieldValue('mapUrl', url);
                      }}
                      editable={false}
                      rightIcon={
                        <Icon
                          name='map-search'
                          type='material-community'
                          size={30}
                          onPress={() => navigation.navigate('Mapa')}
                        />
                      }
                    />
                    {errors.mapUrl && (
                      <Text style={styles.errorText}>{errors.mapUrl}</Text>
                    )}
                  </View>
                  {/* <View
                    style={{ flex: 1, justifyContent: 'center', padding: 1 }}
                  >
                    <Icon
                      name='map-search'
                      type='material-community'
                      size={30}
                      onPress={() => navigation.navigate('Mapa')}
                    />
                  </View> */}
                </View>
                {selectedLocation && (
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
                    </MapView>
                  </View>
                )}
              </View>
              <View style={{ padding: 30 }}>
                <Button
                  title='Crear'
                  buttonStyle={{ backgroundColor: 'blue' }}
                  onPress={handleSubmit}
                />
              </View>
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
});

export default DetailsScreen;

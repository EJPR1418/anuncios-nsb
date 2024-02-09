import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions } from 'react-native';
import { Button } from '@rneui/themed';

import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';
import PropTypes from 'prop-types';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function MapComponent() {
  const navigation = useNavigation();

  const deviceWidth = Dimensions.get('window').width;
  const [selectedLocation, setSelectedLocation] = useState();
  const mapRef = useRef();

  const handlePlaceSelected = (data, details) => {
    // Extract coordinates from the details
    const { location } = details.geometry;

    // Set the selected location
    const newSelectedLocation = {
      name: data.description,
      coordinates: {
        latitudeDelta: 0.01,
        latitude: location.lat,
        longitude: location.lng,
        longitudeDelta: 0.01,
      },
    };
    setSelectedLocation(newSelectedLocation);

    mapRef.current?.animateToRegion({
      latitude: location.lat,
      latitudeDelta: 0.01,
      longitude: location.lng,
      longitudeDelta: 0.01,
    });

    // onLocationSelected(newSelectedLocation);
  };

  const handleSetLocation = () => {
    navigation.navigate('Crear_Evento', {
      selectedLocation: selectedLocation,
    });
  };
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder='Buscar localidad'
        onPress={handlePlaceSelected}
        fetchDetails={true}
        query={{
          key: 'AIzaSyBHaA-533YgKO6n88yFYm6bVKWMLGIJdxk', //Change Key Location
          language: 'en',
        }}
        styles={{
          container: {
            flex: 0,
            position: 'absolute',
            alignSelf: 'center',
            width: deviceWidth - 10,
            marginTop: 20,
            zIndex: 1,
          },
          listView: { backgroundColor: 'white' },
          textInput: {
            height: 38,
            color: 'black',
            fontSize: 16,
          },
        }}
      />
      {/* AIzaSyBHaA-533YgKO6n88yFYm6bVKWMLGIJdxk */}
      <MapView
        provider='google'
        style={styles.map}
        initialRegion={{
          latitude: 18.33893085548665,
          latitudeDelta: 3.0155829779597134,
          longitude: -66.55138915345485,
          longitudeDelta: 2.9817361344754687,
        }}
        ref={mapRef}
      >
        {selectedLocation && (
          <Marker
            coordinate={{
              latitude: selectedLocation.coordinates.latitude,
              longitude: selectedLocation.coordinates.longitude,
            }}
            title='Ave Frate!'
          />
        )}
      </MapView>
      {selectedLocation && (
        <View style={styles.buttonContainer}>
          <Button
            title='Añadir'
            onPress={handleSetLocation}
            buttonStyle={styles.setButton}
          />
        </View>
      )}
    </View>
  );
}

// MapComponent.propTypes = {
//   onLocationSelected: PropTypes.func.isRequired,
// };

export default MapComponent;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
  searchBarContainer: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    position: 'absolute',
    bottom: 40,
    alignSelf: 'center',
  },

  setButton: {
    backgroundColor: 'blue',
    // padding: 10,
    borderRadius: 20,
  },
});

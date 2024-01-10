import React, { useState, useRef } from 'react';
import { View, StyleSheet, Dimensions, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useNavigation } from '@react-navigation/native';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

function MapComponent() {
  const navigation = useNavigation();

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
  };

  const handleSetLocation = () => {
    // Perform any additional actions here if needed
    // For now, let's navigate back to the previous screen and pass the selected location
    navigation.navigate('Detalles', {
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
            width: '100%',
            marginTop: 10,
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
            style={styles.setButton}
          />
        </View>
      )}
    </View>
  );
}

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
    bottom: 20,
    alignSelf: 'center',
  },

  setButton: {
    color: 'yellow',
    padding: 10,
    borderRadius: 5,
  },
});

export default MapComponent;

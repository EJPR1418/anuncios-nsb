import React, { useState } from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { TextInput } from 'react-native-paper';

import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';


function MapComponent() {

  const extractCoordinatesFromGoogleMapsURL = (url) => {
    const matches = url.match(/@([0-9.-]+),([0-9.-]+)/);
  
    if (matches && matches.length === 3) {
      const latitude = parseFloat(matches[1]);
      const longitude = parseFloat(matches[2]);
      return { latitude, longitude };
    } else {
      return null;
    }
  }

  const coordinates = extractCoordinatesFromGoogleMapsURL('');

  return (
    <View style={styles.map}>
            {/* AIzaSyBHaA-533YgKO6n88yFYm6bVKWMLGIJdxk */}
      <MapView
        provider='google'
        style={styles.map}
        // onRegionChange={onRegionChange}
        initialRegion={{
          latitude: 18.33893085548665,
          latitudeDelta: 3.0155829779597134,
          longitude: -66.55138915345485,
          longitudeDelta: 2.9817361344754687,
        }}
      >
        {/* <Marker coordinate={{ latitude, longitude }} /> */}
      </MapView>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  searchBarContainer: {
    backgroundColor: 'white',  
  },
});


export default MapComponent;

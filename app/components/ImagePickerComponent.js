import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, IconButton } from 'react-native-paper';
import ImagePicker from 'react-native-image-picker';

function ImagePickerComponent() {
  const [imageSource, setImageSource] = useState('https://picsum.photos/800'); // Initial image source

  const handleEditButtonPress = () => {
    // Define image picker options
    const options = {
      title: 'Select Image',
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
    };

    // Open the image picker
    ImagePicker.showImagePicker(options, (response) => {
      if (response.didCancel) {
        console.log('Image selection canceled');
      } else if (response.error) {
        console.log('Image picker error: ', response.error);
      } else if (response.uri) {
        // Set the selected image as the new image source
        setImageSource(response.uri);
      }
    });
  };

  return (
    <View style={styles.container}>
      <Card.Cover source={{ uri: imageSource }} style={styles.cardImage} />
      <View style={styles.editButtonContainer}>
        <IconButton
          icon='pencil'
          iconColor='white'
          size={24}
          onPress={handleEditButtonPress} // Call the function to select an image
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardImage: {
    width: 200,
    height: 200,
  },
  editButtonContainer: {
    position: 'absolute',
    bottom: 0,
    right: 0,
  },
});

export default ImagePickerComponent;

import React, { useState } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { Card, Text, Button, Image, Divider, Icon } from '@rneui/themed';
import Modal from 'react-native-modal';

function HomeScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Card containerStyle={styles.card}>
          <TouchableOpacity onPress={toggleModal}>
            <Card.Image
              source={{ uri: 'https://picsum.photos/700' }}
              style={{ height: 200, borderRadius: 10 }}
            />
          </TouchableOpacity>
          <View style={styles.container}>
            <Text h3 style={{ textAlign: 'center' }}>
              Misiones Mu Alpha Phi
            </Text>
          </View>
          <Divider />
          <View style={styles.container}>
            <Text style={{ textAlign: 'justify', fontSize: 14 }}>
              Buenos días mi gente, hoy son las misiones de la Mu Alpha Phi,
              solicitaron 15 Nu Sigma Beta, siempre llegamos a la cuota con la
              ayuda de ustedes. Los Capitulares cuentan con nosotros, vamos a
              apoyar al capítulo, fraternos de Arecibo vamos a llegarle. Lugar
              parque de la marginal de Arecibo
            </Text>
          </View>
          <View style={styles.container}>
            <View style={styles.rowContainer}>
              <Icon
                name='place'
                type='material' // Adjust the icon library if needed
                size={18}
                color='black'
              />
              <Text style={{ textAlign: 'justify', fontSize: 14 }}>
                Calle La Puerta, por ahi te vi
              </Text>
            </View>
          </View>
          <Divider />
          <View style={styles.buttonContainer}>
            <Button
              title='Ver Detalles'
              type='clear'
              onPress={() => navigation.navigate('Detalles')}
            />
          </View>
        </Card>
        <Modal
          isVisible={isModalVisible}
          onBackdropPress={toggleModal}
          onBackButtonPress={toggleModal}
          animationIn='slideInUp'
          animationOut='slideOutDown'
        >
          <View style={styles.modalContainer}>
            <TouchableOpacity onPress={toggleModal}>
              <Image
                source={{ uri: 'https://picsum.photos/700' }}
                style={{ height: deviceHeight, width: deviceWidth }}
                resizeMode='contain'
              />
            </TouchableOpacity>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}

HomeScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
    flex: 1,
  },
  rowContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  container: {
    paddingTop: 10,
    flex: 1,
  },
  background: {
    backgroundColor: 'white',
  },
  card: {
    margin: 5,
    borderRadius: 10,
  },
  buttonContainer: {
    alignSelf: 'flex-end',
    paddingTop: 5,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;

import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
} from 'react-native';
import { Card, Text, Button, Image, Divider, Icon } from '@rneui/themed';
import Modal from 'react-native-modal';
import { db } from '../firebase/firebase';
// import { fetchEvent } from '../firebase/helpers';
import { ref as dRef, query, orderByChild, onValue } from 'firebase/database';

function HomeScreen({ navigation }) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [data, setData] = useState([]);

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;

  useEffect(() => {
    const unsubscribe = onValue(dRef(db, 'nsb/events/'), (snapshot) => {
      const dataVal = snapshot.val();
      if (dataVal) {
        const dataArr = Object.keys(dataVal).map((key) => ({
          id: key,
          ...dataVal[key],
        }));
        console.log(dataArr);
        setData(dataArr);
      } else {
        setData([]);
      }
    });

    return () => unsubscribe();
  }, []);

  const renderItem = ({ item }) => (
    <View>
      <Card containerStyle={styles.card}>
        <TouchableOpacity onPress={toggleModal}>
          <Card.Image
            source={{ uri: 'https://picsum.photos/700' }}
            style={{ height: 200, borderRadius: 10 }}
          />
        </TouchableOpacity>
        <View style={styles.container}>
          <Text h3 style={{ textAlign: 'center' }}>
            {item.title}
          </Text>
        </View>
        <Divider />
        <View style={styles.container}>
          <View style={{ height: 80 }}>
            <ScrollView>
              <Text style={{ textAlign: 'justify', fontSize: 14 }}>
                {item.description}
              </Text>
            </ScrollView>
          </View>
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
              {item.mapUrl}
            </Text>
          </View>
        </View>
        <Divider />
        <View style={styles.buttonContainer}>
          <Button
            title='Ver Detalles'
            type='clear'
            onPress={() => navigation.navigate('Detalles_Evento', { item })}
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
  );

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={data}
        keyExtractor={(item, index) => item.id}
        renderItem={renderItem}
      />
    </View>
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

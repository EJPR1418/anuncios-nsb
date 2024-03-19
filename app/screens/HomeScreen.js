import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {
  StyleSheet,
  View,
  ScrollView,
  TouchableOpacity,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Modal,
  Platform,
} from 'react-native';
import {
  Card,
  Text,
  Button,
  Image,
  Divider,
  Icon,
  FAB,
  Dialog,
  TabView,
} from '@rneui/themed';
import { db } from '../firebase/firebase';
import {
  ref as dRef,
  query,
  orderByChild,
  onValue,
  equalTo,
} from 'firebase/database';
import DateTimePicker from '@react-native-community/datetimepicker';
import { getDaysInMonth } from 'date-fns';

const HomeScreen = ({ navigation }) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [imageFullScreen, setImageFullScreen] = useState();
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filterDate, setFilterDate] = useState(new Date());

  const [selectedId, setSelectedId] = useState();

  const [isFilterDialogVisible, setIsFilteredDialogVisible] = useState(false);

  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('window').width;
  useEffect(() => {
    const options = { day: '2-digit', month: '2-digit', year: 'numeric' };
    const filterDateStr = filterDate.toLocaleDateString(undefined, options);
    console.log(filterDateStr);
    const unsubscribe = onValue(
      query(
        dRef(db, 'nsb/events/'),
        orderByChild('startDate'),
        equalTo(filterDateStr)
      ),
      (snapshot) => {
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
      }
    );

    return () => unsubscribe();
  }, [filterDate]);

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  const onChangeDate = (event, selected) => {
    const currentDate = selected || filterDate;
    setFilterDate(currentDate);
  };
  const toggleFilterDialog = () => {
    setIsFilteredDialogVisible(!isFilterDialogVisible);
  };
  const filterData = (type, date) => {
    let filtered = data;

    if (type) {
      filtered = filtered.filter((event) => event.type === type);
    }

    if (date) {
      filtered = filtered.filter((event) => event.date === date);
    }

    setFilteredData(filtered);
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: 10 },
    (_, index) => currentYear - 4 + index
  ); // Display 10 years
  const months = Array.from({ length: 12 }, (_, index) => {
    const monthDate = new Date(filterDate.getFullYear(), index, 1);
    return monthDate.toLocaleString('es-ES', { month: 'long' }); // Get month name
  });
  const daysInMonth = new Date(
    filterDate.getFullYear(),
    filterDate.getMonth() + 1,
    0
  ).getDate();
  const days = Array.from({ length: daysInMonth }, (_, index) => index + 1);

  const renderYearItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        setFilterDate(
          new Date(item, filterDate.getMonth(), filterDate.getDate())
        )
      }
      style={[
        styles.item,
        filterDate.getFullYear() === item && styles.selectedItem,
      ]}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMonthItem = ({ item }) => (
    <TouchableOpacity
      onPress={() =>
        setFilterDate(
          new Date(
            filterDate.getFullYear(),
            months.indexOf(item),
            filterDate.getDate()
          )
        )
      }
      style={[
        styles.item,
        months.indexOf(item) === filterDate.getMonth() && styles.selectedItem,
      ]}
    >
      <Text style={styles.itemText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderDayItem = ({ item }) => (
    <View>
      <TouchableOpacity
        onPress={() =>
          setFilterDate(
            new Date(filterDate.getFullYear(), filterDate.getMonth(), item)
          )
        }
        style={[
          styles.item,
          item === filterDate.getDate() && styles.selectedItem,
        ]}
      >
        <Text style={styles.itemText}>{item}</Text>
        <Icon
          style={{ alignSelf: 'center', marginBottom: 5 }}
          name='hand-point-up'
          type='font-awesome-5'
          color='#002366'
          size={18}
        />
      </TouchableOpacity>
    </View>
  );
  const renderItem = ({ item }) => (
    <View>
      <Card containerStyle={styles.card}>
        <TouchableOpacity
          onPress={() => {
            setImageFullScreen(item.imageUrl);
            toggleModal();
          }}
        >
          <Card.Image
            source={{ uri: item.imageUrl }}
            style={{ height: 200, borderRadius: 10 }}
            PlaceholderContent={<ActivityIndicator />}
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
              <Text style={{ textAlign: 'justify', fontSize: 16 }}>
                {item.description}
              </Text>
            </ScrollView>
          </View>
        </View>
        <View style={styles.container}>
          <View style={styles.rowContainer}>
            <Icon
              name='map-pin'
              type='font-awesome-5'
              color='#002366'
              size={18}
            />
            <Text style={{ textAlign: 'left', fontSize: 16, flex: 1 }}>
              {item.locationAddress}
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
      <Modal visible={isModalVisible} animationType='slide'>
        <View style={styles.modalContainer}>
          <TouchableOpacity onPress={toggleModal}>
            <Image
              source={{ uri: imageFullScreen }}
              style={{ height: deviceHeight, width: deviceWidth }}
              resizeMode='contain'
              PlaceholderContent={<ActivityIndicator />}
            />
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );

  return (
    <View>
      <View
        style={{
          backgroundColor: 'white',
          borderRadius: 10,
          margin: 5,
          // height: 100,
        }}
      >
        <View style={styles.flatListContainer}>
          <FlatList
            horizontal={true}
            data={years}
            renderItem={renderYearItem}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            contentContainerStyle={styles.flatListContentContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Divider />
        <View style={styles.flatListContainer}>
          <FlatList
            horizontal={true}
            data={months}
            renderItem={renderMonthItem}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            contentContainerStyle={styles.flatListContentContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
        <Divider />
        <View style={styles.flatListContainer}>
          <FlatList
            horizontal={true}
            data={days}
            renderItem={renderDayItem}
            keyExtractor={(item) => item.toString()}
            ItemSeparatorComponent={() => <View style={styles.divider} />}
            contentContainerStyle={styles.flatListContentContainer}
            showsHorizontalScrollIndicator={false}
          />
        </View>
      </View>

      {data.length > 0 ? (
        <View>
          <View style={styles.filterContainer}>
            <View
              style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}
            >
              <View>
                <FAB
                  color='#002366'
                  style={{ alignSelf: 'flex-start' }}
                  visible={true}
                  size='small'
                  title='Crear Evento'
                  onPress={() => {
                    navigation.navigate('Crear_Evento');
                  }}
                  icon={{
                    name: 'plus',
                    color: 'white',
                    type: 'font-awesome-5',
                  }}
                  iconPosition='left'
                />
              </View>
              <View>
                <FAB
                  color='#002366'
                  style={{ alignSelf: 'flex-end' }}
                  visible={true}
                  size='small'
                  onPress={toggleFilterDialog}
                  icon={{
                    name: 'filter',
                    color: 'white',
                    type: 'font-awesome-5',
                  }}
                />
              </View>
            </View>
          </View>
          <View style={{ height: '90%' }}>
            <FlatList
              data={data}
              keyExtractor={(item, index) => item.id}
              renderItem={renderItem}
              showsVerticalScrollIndicator={false}
            />
          </View>

          <Dialog
            isVisible={isFilterDialogVisible}
            onBackdropPress={toggleFilterDialog}
            overlayStyle={{ width: '80%' }} // Adjust width as needed
          >
            <Dialog.Title
              title='Filtrar Datos'
              titleStyle={{ alignSelf: 'center' }}
            />

            <View>
              <Button title='Fraternidad' onPress={() => {}} />
              <DateTimePicker
                value={filterDate}
                display='default'
                onChange={onChangeDate}
                mode='date'
                textColor='black'
                style={{ width: '100%' }}
              />

              <Button title='Cerrar' onPress={toggleFilterDialog} />
            </View>
          </Dialog>
        </View>
      ) : (
        <View
          style={{
            height: '100%',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            h4
            style={{
              fontWeight: 'bold',
              color: 'gray',
              textAlign: 'center',
            }}
          >
            No se encontraron eventos...
          </Text>
        </View>
      )}
    </View>
  );
};

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
  centeredContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'blue',
  },
  rowContainer: {
    flex: 1,
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
    backgroundColor: 'black',
  },
  filterContainer: {
    // paddingHorizontal: 5,
    // paddingVertical: 8,
    marginTop: 10,
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    // marginBottom: 16, // Adjust as needed
    backgroundColor: '#f0f0f0',
    // borderRadius: 8,
    // borderWidth: 1,
    // borderColor: '#ccc',
  },
  itemText: {
    fontSize: 38,
    fontWeight: 'bold',
    marginHorizontal: 5,
  },
  divider: {
    width: 10, // Adjust divider width as needed
  },
  flatListContentContainer: {
    justifyContent: 'center',
  },
  selectedItem: {
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  flatListContainer: {
    padding: 5,
  },
});

export default HomeScreen;

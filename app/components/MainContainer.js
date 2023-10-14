import * as React from 'react';
import { Avatar, Card } from 'react-native-paper';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { TouchableOpacity, StyleSheet, View } from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';

const LeftContent = props => <Avatar.Icon {...props} icon="folder" />

const MainContainer = ({ navigation }) => (
//   <Card>
//     <Card.Title title="Card Title" subtitle="Card Subtitle" left={LeftContent} />
//     <Card.Content>
//       <Text variant="titleLarge">Card title</Text>
//       <Text variant="bodyMedium">Card content</Text>
//     </Card.Content>
//     <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//     <Card.Actions>
//       <Button>Cancel</Button>
//       <Button>Ok</Button>
//     </Card.Actions>
//   </Card>
    <View style={styles.container}>
      <TouchableOpacity  onPress={() => navigation.push(DetailsScreen)}>
        <Card>
          <Card.Title title="Evento 1" subtitle="Card Subtitle2" left={LeftContent} />
          {/* <Card.Content>
            <Text variant="titleLarge" title="Card Title"></Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content> */}
          <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
        </Card>
      </TouchableOpacity>
    </View>
);
const styles = StyleSheet.create({ 
    container: {
      paddingTop: 20,
    },
    background: {
      backgroundColor: 'white'
    },
  });
export default MainContainer;
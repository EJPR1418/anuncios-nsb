import React from "react";
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { DatePickerModal } from 'react-native-paper-dates';
import { TouchableOpacity, StyleSheet, View, ScrollView } from 'react-native';
import {
  Card,
  Title,
  Text,
  Button,
  Paragraph,
  Avatar,
  List,
  PaperProvider,
} from 'react-native-paper';
import HomeScreen from './app/screens/HomeScreen';
import DetailsScreen from './app/screens/DetailsScreen';

const Stack = createStackNavigator();
const LeftContent = props => <Avatar.Icon {...props} icon="folder" />


// const HomeScreen = ({ navigation }) => {
//   const { title, content } = props?.route?.params;
//   const [date, setDate] = React.useState(undefined);
//   const [open, setOpen] = React.useState(false);
//   const onDismissSingle = React.useCallback(() => {
//     setOpen(false);
//   }, [setOpen]);
  
//   const onConfirmSingle = React.useCallback(
//     (params) => {
//       setOpen(false);
//       setDate(params.date);
//     },
//     [setOpen, setDate]
//   );
//   return (
//   <ScrollView style={styles.background}>
//     <View style={styles.container}>
//       <TouchableOpacity  onPress={() =>
//         navigation?.push('Detalles', {
//           //  title,
//           //  content,
//         })}>
//         <Card>
//           <Card.Title title="Evento 1" subtitle="Card Subtitle2" left={LeftContent} />
//           {/* <Card.Content>
//             <Text variant="titleLarge" title="Card Title"></Text>
//             <Text variant="bodyMedium">Card content</Text>
//           </Card.Content> */}
//           <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//         </Card>
//       </TouchableOpacity>
//     </View>
  
//     <View style={styles.container}>
//       <TouchableOpacity  onPress={() =>
//         navigation?.push('Detalles', {
//           //  title,
//           //  content,
//         })}>
//         <Card>
//           <Card.Title title="Evento 1" subtitle="Card Subtitle2" left={LeftContent} />
//           {/* <Card.Content>
//             <Text variant="titleLarge" title="Card Title"></Text>
//             <Text variant="bodyMedium">Card content</Text>
//           </Card.Content> */}
//           <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//         </Card>
//       </TouchableOpacity>
//     </View>
  
//     <View style={styles.container}>
//       <TouchableOpacity  onPress={() =>
//           navigation?.push('Detalles', {
//             //  title,
//             //  content,
//           })}>
//         <Card>
//           <Card.Title title="Evento 1" subtitle="Card Subtitle2" left={LeftContent} />
//           {/* <Card.Content>
//             <Text variant="titleLarge" title="Card Title"></Text>
//             <Text variant="bodyMedium">Card content</Text>
//           </Card.Content> */}
//           <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//         </Card>
//       </TouchableOpacity>
//     </View>
//   </ScrollView>
//   );
// };
// const DetailsScreen = (props) => {
//   const { title, content } = props?.route?.params;
//   return (
//   <Card>
//     <Card.Title title="Evento 1" variant="titleLarge"/>
//     <Card.Cover source={{ uri: 'https://picsum.photos/700' }} />
//     <Card.Content>
//       <Text variant="titleLarge" title="Card Title"></Text>
//       <Text variant="bodyMedium">Card content</Text>
//     </Card.Content>
//   </Card>
//     // <List.Section>
//     //   <List.Subheader>Title</List.Subheader>
//     //   <List.Item />
//     // </List.Section>
//   );
// };

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Inicio">
          <Stack.Screen name="Inicio" component={HomeScreen} />
          <Stack.Screen name="Detalles" component={DetailsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  background: {
    backgroundColor: 'white'
  },
});

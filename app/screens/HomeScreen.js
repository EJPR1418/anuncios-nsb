import React from "react";
import PropTypes from "prop-types";

import { TouchableOpacity, StyleSheet, View, ScrollView } from "react-native";
import { Card, Text, Avatar } from "react-native-paper";

function HomeScreen({ navigation }) {
  const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

  return (
    <ScrollView>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.navigate("Detalles")}>
          <Card style={styles.card}>
            {/* <Card.Content>
            <Text variant="titleLarge" title="Card Title"></Text>
            <Text variant="bodyMedium">Card content</Text>
          </Card.Content> */}
            <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
            <Card.Title
              title="Evento 1"
              subtitle="Card Subtitle2"
              left={LeftContent}
            />
            <Card.Content>
              <Text variant="bodyMedium">
                Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum Lorem Impsum
              </Text>
            </Card.Content>
          </Card>
        </TouchableOpacity>
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
  container: {
    paddingTop: 20,
  },
  background: {
    backgroundColor: "white",
  },
  card: {
    margin: 5,
  },
});

export default HomeScreen;

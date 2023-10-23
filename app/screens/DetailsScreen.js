import React from "react";
import { ScrollView, View, StyleSheet } from "react-native";
import { Card, Text } from "react-native-paper";
function DetailsScreen() {
  // const { title, content } = props?.route?.params;
  return (
    <ScrollView>
      <View style={styles.mainContainer}>
        <Card>
          <Card.Cover source={{ uri: "https://picsum.photos/800" }} />
          <Card.Title title="Bazar Anual" variant="titleLarge" />
          <Card.Content>
            <View>
              <Text variant="bodyMedium" style={styles.container}>
                Ven y cleebre junto a la frate en el bazar anual alsdjfjadfla
              </Text>
            </View>
            <View style={styles.rowContainer}>
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyMedium"
                  style={{ justifyContent: "flex-end" }}
                >
                  Tipo: Bonafides
                </Text>
              </View>
              <View style={{ flex: 1 }}>
                <Text
                  variant="bodyMedium"
                  style={{ justifyContent: "flex-end" }}
                >
                  Vestimenta: Casual
                </Text>
              </View>
            </View>
            <View style={styles.container}>
              <Text>Fecha:</Text>
              <View style={styles.rowContainer}>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ justifyContent: "flex-end" }}
                  >
                    12/31/3445
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text
                    variant="bodyMedium"
                    style={{ justifyContent: "flex-end" }}
                  >
                    Hora: 8:00 PM
                  </Text>
                </View>
              </View>
            </View>
            <View style={styles.container}>
              <Text>Localidad:</Text>
            </View>
          </Card.Content>
        </Card>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    paddingTop: 20,
  },
  container: {
    paddingTop: 10,
  },
  rowContainer: {
    flexDirection: "row",
    paddingTop: 10,
  },
  flexContainer: {
    justifyContent: "flex-end",
  },
  background: {
    backgroundColor: "white",
  },
});

export default DetailsScreen;

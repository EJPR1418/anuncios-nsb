import React from "react";
import { ScrollView } from "react-native";
import { Card, Text, DataTable } from "react-native-paper";

function DetailsScreen() {
  // const { title, content } = props?.route?.params;
  return (
    <ScrollView>
      <Card>
        <Card.Title title="Bazar Anual" variant="titleLarge" />
        <Card.Cover source={{ uri: "https://picsum.photos/700" }} />
        <Card.Content>
          <DataTable.Row>
            <DataTable.Cell>
              <Text variant="bodyMedium">Detalles:</Text>
            </DataTable.Cell>
            <DataTable.Cell>
              <Text variant="bodyMedium">
                adsfhjashfdkjsdfhjaksdfhakjsdfhkjasdfhka
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>2</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>2</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>2</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>2</DataTable.Cell>
          </DataTable.Row>
          <DataTable.Row>
            <DataTable.Cell>1</DataTable.Cell>
            <DataTable.Cell>2</DataTable.Cell>
          </DataTable.Row>
          <Text variant="bodyMedium">Detalles:</Text>
          <Text variant="bodyMedium">Tipo:</Text>
          <Text variant="bodyMedium">Fecha de Evento:</Text>
          <Text variant="bodyMedium">Hora de Evento:</Text>
          <Text variant="bodyMedium">Tipo de Vestimenta:</Text>
          <Text variant="bodyMedium">Localidad:</Text>
        </Card.Content>
      </Card>
    </ScrollView>

    // <List.Section>
    //   <List.Subheader>Title</List.Subheader>
    //   <List.Item />
    // </List.Section>
  );
}

export default DetailsScreen;

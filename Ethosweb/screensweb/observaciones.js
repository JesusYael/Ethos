import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';

const data = [
  { name: 'Dayana Hernandez', date: '2024-06-21 09:30 AM' },
  { name: 'Melisa Martínez', date: '2024-06-22 10:00 AM' },
  { name: 'Diego Truqui', date: '2024-06-23 11:00 AM' },
  { name: 'Marta García', date: '2024-06-24 12:00 PM' },
  { name: 'José Pérez', date: '2024-06-25 01:30 PM' },
  { name: 'Antonio Ruiz', date: '2024-06-26 02:15 PM' },
  { name: 'Javier Sánchez', date: '2024-06-27 09:45 AM' },
  { name: 'Elena Gutiérrez', date: '2024-06-28 10:30 AM' },
  { name: 'Pablo Díaz', date: '2024-06-29 11:45 AM' },
  { name: 'Sandra Torres', date: '2024-07-01 01:00 PM' },
  { name: 'Diego Ramírez', date: '2024-07-01 02:45 PM' },
  { name: 'Sofía Castro', date: '2024-07-02 03:30 PM' },
  { name: 'Luisa Navarro', date: '2024-07-03 04:00 PM' },
  { name: 'Marcos Fernández', date: '2024-07-04 10:45 AM' },
  { name: 'Ana Rodríguez', date: '2024-07-05 03:15 PM' },
];

const ObservationsScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Observaciones</Text>
      <View style={styles.table}>
        <View style={styles.tableHeader}>
          <Text style={styles.tableHeaderText}>Nombre</Text>
          <Text style={styles.tableHeaderText}>Primera cita</Text>
          <Text style={styles.tableHeaderText}>Ver más</Text>
        </View>
        <FlatList
          data={data}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.tableRow}>
              <Text style={styles.tableRowText}>{item.name}</Text>
              <Text style={styles.tableRowText}>{item.date}</Text>
              <TouchableOpacity
                style={styles.button}
                onPress={() => navigation.navigate('Details', { patient: item })}
              >
                <Text style={styles.buttonText}>Ir</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 16,
  },
  table: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    overflow: 'hidden',
  },
  tableHeader: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
    padding: 8,
  },
  tableHeaderText: {
    flex: 1,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  tableRow: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    padding: 8,
  },
  tableRowText: {
    flex: 1,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 4,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
  },
});

export default ObservationsScreen;

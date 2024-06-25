import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.mainContent}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Próximas citas</Text>
          <View style={styles.appointmentItem}><Text>Juan Perez - 10:00 AM</Text></View>
          <View style={styles.appointmentItem}><Text>Maria Gomez - 11:30 AM</Text></View>
          <View style={styles.appointmentItem}><Text>Pedro Gomez - 14:00 PM</Text></View>
          <TouchableOpacity><Text style={styles.linkText}>Ver calendario</Text></TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Pacientes nuevos</Text>
          <Text>Juan Perez - Dayana Hernandez</Text>
          <Text>Maria Gomez - Melisa Martínez</Text>
          <Text>Pedro Gomez - Diego Truqui</Text>
          <TouchableOpacity><Text style={styles.linkText}>Ver todos</Text></TouchableOpacity>
        </View>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Observaciones</Text>
          <Text>Juan Perez - Pérdida de peso</Text>
          <Text>Maria Gomez - Control de diabetes tipo 2</Text>
          <Text>Pedro Gomez - Mejora de rendimiento deportivo</Text>
          <TouchableOpacity><Text style={styles.linkText}>Ver observaciones de todos los pacientes</Text></TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainContent: {
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  section: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  appointmentItem: {
    marginBottom: 10,
  },
  linkText: {
    color: '#007AFF',
    marginTop: 10,
  },
});

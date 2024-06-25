import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Rutinas de ejercicio</Text>
      </View>
      <View style={styles.routineSection}>
        <View style={styles.routineBox}>
          <Text style={styles.routineTitle}>Rutina de Ejercicio para Pérdida de Peso</Text>
          <Text>Lunes: Cardio y Abdominales</Text>
          <Text>Martes: Pierna - Tren Superior del Cuerpo</Text>
          <Text>Miércoles: Descanso Activo</Text>
          <Text>Jueves: Cardio y Pierna</Text>
          <Text>Viernes: Abdominales y Tren Superior del Cuerpo</Text>
          <Text>Sábado: Cardio Total</Text>
          <Text>Domingo: Descanso Total</Text>
          <TouchableOpacity><Text style={styles.linkText}>Ver rutina</Text></TouchableOpacity>
        </View>
        <View style={styles.routineBox}>
          <Text style={styles.routineTitle}>Rutina de Ejercicio para Ganancia de Masa Muscular</Text>
          <Text>Lunes: Pecho y Tríceps</Text>
          <Text>Martes: Espalda y Bíceps</Text>
          <Text>Miércoles: Piernas y Glúteos</Text>
          <Text>Jueves: Hombros y Abdominales</Text>
          <Text>Viernes: Full Body</Text>
          <Text>Sábado: Descanso Activo</Text>
          <Text>Domingo: Descanso Total</Text>
          <TouchableOpacity><Text style={styles.linkText}>Ver rutina</Text></TouchableOpacity>
        </View>
        <View style={styles.routineBox}>
          <Text style={styles.routineTitle}>Rutina de Ejercicio para Mantenimiento General</Text>
          <Text>Lunes: Entrenamiento de Circuito</Text>
          <Text>Martes: Cardio y Flexibilidad</Text>
          <Text>Miércoles: Entrenamiento de Fuerza</Text>
          <Text>Jueves: Descanso Activo</Text>
          <Text>Viernes: Cardio y Circuito</Text>
          <Text>Sábado: Flexibilidad y Movilidad</Text>
          <Text>Domingo: Descanso Total</Text>
          <TouchableOpacity><Text style={styles.linkText}>Ver rutina</Text></TouchableOpacity>
        </View>
        <View style={styles.routineBox}>
          <Text style={styles.routineTitle}>Rutina de Ejercicio para Pérdida de Peso</Text>
          <Text>Lunes: Cardio y Abdominales</Text>
          <Text>Martes: Pierna - Tren Superior del Cuerpo</Text>
          <Text>Miércoles: Descanso Activo</Text>
          <Text>Jueves: Cardio y Pierna</Text>
          <Text>Viernes: Abdominales y Tren Superior del Cuerpo</Text>
          <Text>Sábado: Cardio Total</Text>
          <Text>Domingo: Descanso Total</Text>
          <TouchableOpacity><Text style={styles.linkText}>Ver rutina</Text></TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  header: {
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  routineSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  routineBox: {
    width: '48%',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#fff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  routineTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  linkText: {
    color: '#007AFF',
    marginTop: 10,
  },
});

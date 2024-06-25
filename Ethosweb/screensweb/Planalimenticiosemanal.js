import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Plan de Alimentación para Mantenimiento General</Text>
      </View>
      <View style={styles.planSection}>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Lunes</Text>
          <Text>Desayuno:</Text>
          <Text>- Opción: 1 taza de yogurt bajo en grasa, 1/2 taza de granola.</Text>
          <Text>- Bebida: 1 vaso de jugo de naranja.</Text>
          <Text>Almuerzo:</Text>
          <Text>- Opción: Ensalada de pollo con aderezo bajo en grasa.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Cena:</Text>
          <Text>- Opción: Filete de salmón con vegetales al vapor.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Snacks:</Text>
          <Text>- 1 manzana.</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Martes</Text>
          <Text>Desayuno:</Text>
          <Text>- Opción: 2 huevos revueltos, 1 rebanada de pan integral.</Text>
          <Text>- Bebida: 1 taza de café.</Text>
          <Text>Almuerzo:</Text>
          <Text>- Opción: Sandwich de pavo con vegetales.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Cena:</Text>
          <Text>- Opción: Pechuga de pollo a la plancha con quinoa.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Snacks:</Text>
          <Text>- 1 puñado de almendras.</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Miércoles</Text>
          <Text>Desayuno:</Text>
          <Text>- Opción: Smoothie de frutas.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Almuerzo:</Text>
          <Text>- Opción: Sopa de vegetales.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Cena:</Text>
          <Text>- Opción: Tacos de pescado.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Snacks:</Text>
          <Text>- 1 plátano.</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Jueves</Text>
          <Text>Desayuno:</Text>
          <Text>- Opción: Avena con frutas.</Text>
          <Text>- Bebida: 1 taza de té verde.</Text>
          <Text>Almuerzo:</Text>
          <Text>- Opción: Ensalada de atún.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Cena:</Text>
          <Text>- Opción: Sopa de lentejas.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Snacks:</Text>
          <Text>- 1 yogur bajo en grasa.</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Viernes</Text>
          <Text>Desayuno:</Text>
          <Text>- Opción: Tostada con aguacate.</Text>
          <Text>- Bebida: 1 taza de café.</Text>
          <Text>Almuerzo:</Text>
          <Text>- Opción: Wrap de pollo.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Cena:</Text>
          <Text>- Opción: Ensalada César con camarones.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Snacks:</Text>
          <Text>- 1 zanahoria.</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Sábado</Text>
          <Text>Desayuno:</Text>
          <Text>- Opción: Panqueques de avena.</Text>
          <Text>- Bebida: 1 vaso de leche desnatada.</Text>
          <Text>Almuerzo:</Text>
          <Text>- Opción: Hamburguesa de pavo.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Cena:</Text>
          <Text>- Opción: Pizza de vegetales.</Text>
          <Text>- Bebida: 1 vaso de agua.</Text>
          <Text>Snacks:</Text>
          <Text>- 1 barra de granola.</Text>
        </View>
        <View style={styles.planBox}>
          <Text style={styles.planTitle}>Domingo</Text>
          <Text>Descanso Total</Text>
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
  planSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  planBox: {
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
  planTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

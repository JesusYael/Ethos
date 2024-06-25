import React from 'react';
import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.planContainer}>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Plan de Alimentación para Pérdida de Peso</Text>
            <Text style={styles.planText}>Desayuno:</Text>
            <Text style={styles.planText}>• Avena con Frutas y Nueces:</Text>
            <Text style={styles.planText}>1 taza de avena cocida con leche desnatada.</Text>
            <Text style={styles.planText}>1/2 taza de fresas frescas.</Text>
            <Text style={styles.planText}>1/4 de cucharada de nueces picadas.</Text>
            <Text style={styles.planText}>Un toque de canela.</Text>
            <TouchableOpacity>
              <Text style={styles.planLink}>Ver plan completo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Plan de Alimentación para Ganancia de Masa Muscular</Text>
            <Text style={styles.planText}>Desayuno:</Text>
            <Text style={styles.planText}>• Batido de Proteína:</Text>
            <Text style={styles.planText}>1 taza de leche desnatada.</Text>
            <Text style={styles.planText}>1 plátano.</Text>
            <Text style={styles.planText}>1 cucharada de mantequilla de maní.</Text>
            <Text style={styles.planText}>1 cucharada de proteína en polvo.</Text>
            <TouchableOpacity>
              <Text style={styles.planLink}>Ver plan completo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Plan de Alimentación para Mantenimiento General</Text>
            <Text style={styles.planText}>Desayuno:</Text>
            <Text style={styles.planText}>• Huevos Revueltos con Vegetales:</Text>
            <Text style={styles.planText}>2 huevos revueltos.</Text>
            <Text style={styles.planText}>1/2 taza de espinacas.</Text>
            <Text style={styles.planText}>1/4 taza de tomates cherry.</Text>
            <Text style={styles.planText}>1 rebanada de pan integral.</Text>
            <TouchableOpacity>
              <Text style={styles.planLink}>Ver plan completo</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.planCard}>
            <Text style={styles.planTitle}>Plan de Alimentación para Energía y Rendimiento Deportivo</Text>
            <Text style={styles.planText}>Desayuno:</Text>
            <Text style={styles.planText}>• Tazón de Yogur con Granola y Frutas:</Text>
            <Text style={styles.planText}>1 taza de yogur griego natural.</Text>
            <Text style={styles.planText}>1/4 taza de granola baja en azúcar.</Text>
            <Text style={styles.planText}>1/2 taza de frutas mixtas (bayas, mango, plátano).</Text>
            <Text style={styles.planText}>1 cucharada de semillas de chía.</Text>
            <TouchableOpacity>
              <Text style={styles.planLink}>Ver plan completo</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  planContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  planCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    width: '90%',
  },
  planTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  planText: {
    fontSize: 16,
    marginBottom: 5,
  },
  planLink: {
    fontSize: 16,
    color: '#4CAF50',
    marginTop: 10,
  },
});

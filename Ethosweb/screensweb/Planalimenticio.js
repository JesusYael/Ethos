import React from 'react';
import { StyleSheet, Text, View, ScrollView } from 'react-native';

export default function App() {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Plan de Alimentación para Mantenimiento General</Text>
      </View>
      <View style={styles.mealSection}>
        <View style={styles.mealBox}>
          <Text style={styles.mealTitle}>Desayuno</Text>
          <Text>Tazón de Yogur con Granola y Fruta</Text>
          <Text>- 1 taza de yogur griego natural</Text>
          <Text>- 1/2 taza de granola baja en azúcar</Text>
          <Text>- 1 taza de fruta mixta (bayas, plátano, etc.)</Text>
          <Text>Bebida:</Text>
          <Text>- 1 taza de té verde</Text>
        </View>
        <View style={styles.mealBox}>
          <Text style={styles.mealTitle}>Snack de Media Mañana</Text>
          <Text>Smoothie Verde:</Text>
          <Text>- 1 taza de espinacas</Text>
          <Text>- 1/2 taza de pepino</Text>
          <Text>- 1 manzana verde</Text>
          <Text>- 1/2 taza de agua</Text>
          <Text>- 1 cucharadita de miel o sirope de agave (opcional)</Text>
        </View>
        <View style={styles.mealBox}>
          <Text style={styles.mealTitle}>Almuerzo</Text>
          <Text>Ensalada de Pollo a la Parrilla:</Text>
          <Text>- 100g de pechuga de pollo a la parrilla</Text>
          <Text>- 2 tazas de hojas verdes (espinacas, lechuga, etc.)</Text>
          <Text>- 1/2 taza de tomates cherry</Text>
          <Text>- 1/4 taza de cebolla morada en rodajas</Text>
          <Text>- 1/4 de aguacate en rodajas</Text>
          <Text>Aliño:</Text>
          <Text>- 1 cucharada de aceite de oliva</Text>
          <Text>- 1 cucharada de vinagre balsámico</Text>
          <Text>- Sal y pimienta al gusto</Text>
        </View>
        <View style={styles.mealBox}>
          <Text style={styles.mealTitle}>Snack de la Tarde</Text>
          <Text>Hummus con Vegetales:</Text>
          <Text>- 1/2 taza de hummus</Text>
          <Text>- 1 taza de vegetales frescos (zanahorias, apio, pimientos)</Text>
        </View>
        <View style={styles.mealBox}>
          <Text style={styles.mealTitle}>Cena</Text>
          <Text>Tacos de Pescado Saludables:</Text>
          <Text>- 2 filetes de pescado a la parrilla</Text>
          <Text>- 2 tortillas de maíz</Text>
          <Text>- 1 taza de col rallada</Text>
          <Text>- 1/4 taza de salsa de yogur (yogur natural, jugo de limón, ajo en polvo)</Text>
          <Text>- Rodajas de lima para servir</Text>
        </View>
        <View style={styles.mealBox}>
          <Text style={styles.mealTitle}>Snack Nocturno (opcional)</Text>
          <Text>Palomitas de Maíz:</Text>
          <Text>- 2 tazas de palomitas de maíz naturales</Text>
          <Text>Bebida:</Text>
          <Text>- Taza de té de hierbas (manzanilla, menta)</Text>
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
  mealSection: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  mealBox: {
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
  mealTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
});

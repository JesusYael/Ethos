import React from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        <Image
          source={require('../assets/perfil.png')} 
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <Text style={styles.profileText}>Nombre del nutriólogo</Text>
          <Text style={styles.profileText}>Edad</Text>
          <Text style={styles.profileText}>Sexo</Text>
          <Text style={styles.profileText}>Correo Electrónico</Text>
          <Text style={styles.profileText}>Número de Teléfono</Text>
          <Text style={styles.profileText}>Número de Cédula Profesional</Text>
          <Text style={styles.profileText}>Especialización</Text>
          <Text style={styles.profileText}>Experiencia Profesional</Text>
          <Text style={styles.profileText}>Centro de Trabajo</Text>
          <Text style={styles.profileText}>Horarios de Atención</Text>
          <Text style={styles.profileText}>Modalidades de Consulta</Text>
          <Text style={styles.profileText}>Descripción Profesional</Text>
          <Text style={styles.profileText}>Historial de Pacientes</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
    padding: 20,
  },
  profileContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
  },
  profileDetails: {
    alignItems: 'flex-start',
  },
  profileText: {
    fontSize: 16,
    marginBottom: 10,
  },
});

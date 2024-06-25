import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Provider as PaperProvider } from 'react-native-paper';

import LOGIN from './screensweb/LoginScreen';
import Registriologo from './screensweb/Registronutriologo';
import Recuperación from './screensweb/Recuperarcontra'; 
import Home from './screensweb/HomeScreen';
import Planalimenticio from './screensweb/Planalimenticio';
import Rutinas from './screensweb/Rutinasdeejercicio';
import Planspecificosemanal from './screensweb/Planalimenticiosemanal';
import Perfil  from './screensweb/perfil';
import Planesalimenticios from './screensweb/Planesalimenticios';
import Proximascitas from './screensweb/Proximascitas';
import Reagendar from './screensweb/Reagendarcita';
import Observaciones from './screensweb/observaciones';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function DrawerNavigator() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={Home} />
      <Drawer.Screen name="Planalimenticio" component={Planalimenticio} />
      <Drawer.Screen name="Rutinas de ejercicio" component={Rutinas} />
      <Drawer.Screen name="Planespecifico" component={Planspecificosemanal} />
      <Drawer.Screen name="Perfil" component={Perfil} />
      <Drawer.Screen name="Planes alimenticios" component={Planesalimenticios}/>
      <Drawer.Screen name="Proximascitas" component={Proximascitas} />
      <Drawer.Screen name="Reagendarcita" component={Reagendar} />
      <Drawer.Screen name="Observaciones" component={Observaciones} /> 
    </Drawer.Navigator>
  );
}

function LoginScreen({ navigation }) {
  const handleLogin = () => {
    // Aquí manejarías el inicio de sesión, por ejemplo, validando el usuario.
    // Si el login es exitoso, navega a la app principal:
    navigation.replace('App');
  };

  return (
    <LOGIN onLogin={handleLogin} />
  );
}

function AppNavigator() {
  return (
    <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="App" component={DrawerNavigator} />
      <Stack.Screen name="RegistroNutriologo" component={Registriologo} />
      <Stack.Screen name="Recuperarcontraseña" component={Recuperación} />
    </Stack.Navigator>
  );
}

export default function App() {
  return (
    <PaperProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </PaperProvider>
  );
}

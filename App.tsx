import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/components/LoginScreen';
import AsignacionesScreen from './src/components/AsignacionesScreen';
import InformacionScreen from './src/components/InformacionScreen';
import ReporteScreen from './src/components/ReporteScreen';
import CompletadosScreen from './src/components/CompletadosScreen';
import PerfilScreen from './src/components/PerfilScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName=""
    screenOptions={{
      tabBarShowLabel: false,
    }}
  >
    <Tab.Screen name="Asignaciones" component={AsignacionesScreen} />
    <Tab.Screen name="Completados" component={CompletadosScreen} />
    <Tab.Screen name="Perfil" component={PerfilScreen} />
  </Tab.Navigator>
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="MainTabs"
          component={MainTabs}
          options={{ headerShown: false }}
        />
        <Stack.Screen name="Informacion" component={InformacionScreen} />
        <Stack.Screen name="Reporte" component={ReporteScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;

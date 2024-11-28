import 'react-native-gesture-handler';
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialIcons';
import LoginScreen from './src/components/LoginScreen';
import AsignacionesScreen from './src/components/AsignacionesScreen';
import InformacionScreen from './src/components/InformacionScreen';
import ReporteScreen from './src/components/ReporteScreen';
import CompletadosScreen from './src/components/CompletadosScreen';
import PerfilScreen from './src/components/PerfilScreen';

interface TabIconProps {
  name: string;
  color: string;
  size: number;
}

const TabIcon: React.FC<TabIconProps> = ({ name, color, size }) => (
  <Icon name={name} size={size} color={color} />
);

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

const MainTabs = () => (
  <Tab.Navigator
    initialRouteName="Asignaciones"
    screenOptions={{
      tabBarShowLabel: false,
      tabBarStyle: {
        backgroundColor: '#FFFFFF',
        borderTopWidth: 1,
        borderTopColor: '#ccc',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -2 },
        shadowOpacity: 0.1,
        shadowRadius: 5,
        elevation: 5,
      },
    }}
  >
    <Tab.Screen
      name="Asignaciones"
      component={AsignacionesScreen}
      options={{
        tabBarIcon: ({ color = '#2F62EE', size = 30 }) => (
          <TabIcon name="assignment" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Completados"
      component={CompletadosScreen}
      options={{
        tabBarIcon: ({ color = '#2F62EE', size = 30 }) => (
          <TabIcon name="check-circle" size={size} color={color} />
        ),
      }}
    />
    <Tab.Screen
      name="Perfil"
      component={PerfilScreen}
      options={{
        tabBarIcon: ({ color = '#2F62EE', size = 30 }) => (
          <TabIcon name="person" size={size} color={color} />
        ),
      }}
    />
  </Tab.Navigator>
);

const App = () => {

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName= 'Login'>
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

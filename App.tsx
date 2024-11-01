import 'react-native-gesture-handler';
import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LoginScreen from "./src/components/LoginScreen";
import AsignacionesScreen from "./src/components/AsignacionesScreen";
import InformacionScreen from "./src/components/InformacionScreen";
import ReporteScreen from "./src/components/ReporteScreen";
import CompletadosScreen from "./src/components/CompletadosScreen";
import PerfilScreen from './src/components/PerfilScreen';



const Stack = createNativeStackNavigator();

const App = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName=" ">
                <Stack.Screen
                name=" Login"
                component={LoginScreen}
                options={{ title: ' '}}/>
                <Stack.Screen
                name="Asignaciones"
                component={AsignacionesScreen}
                options={{ title: ' '}}/>
                <Stack.Screen
                name="Informacion"
                component={InformacionScreen}
                />
                <Stack.Screen
                name="Reporte"
                component={ReporteScreen}
                />
                <Stack.Screen
                name="Completados"
                component={CompletadosScreen}
                />
                 <Stack.Screen
                name="Perfil"
                component={PerfilScreen}
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default App;

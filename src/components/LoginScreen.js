import React, { useState } from 'react';
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Text,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://192.168.56.1:3001/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      });

      const data = await response.json();

    if (data.success) {
        Alert.alert('Bienvenido', 'Inicio de sesión correcto');
        navigation.navigate('Asignaciones');
      } else {
        Alert.alert('Error', 'Credenciales inválidas');
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      Alert.alert('Error', 'Hubo un problema al conectarse con el servidor');
    }
  };


  return (
    <LinearGradient colors={['#b0bec5', '#1e3c72']} style={styles.container}>
      <Text style={styles.title}>Iniciar Sesión</Text>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Correo"
          placeholderTextColor="#999"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Contraseña"
          placeholderTextColor="#999"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <Button title="Entrar" onPress={handleLogin} color="#4e4feb" />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    fontSize: 32,
    fontFamily: 'sans-serif-light',
    marginBottom: 40,
    color: '#FFF',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 20,
    paddingHorizontal: 10,
    elevation: 5,
  },
  input: {
    height: 50,
    fontSize: 18,
    fontFamily: 'sans-serif',
    color: '#333',
  },
});

export default LoginScreen;

import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from 'react-native';

const PerfilScreen = ({ navigation }) => {
  const [trabajador, setTrabajador] = useState(null);

  useEffect(() => {
    fetch('http://192.168.56.1:3001/api/usuarios/trabajadores')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setTrabajador(data[0]);
        } else {
          Alert.alert("Error", "No se encontró ningún trabajador.");
        }
      })
      .catch((error) => console.error('Error al obtener los datos del trabajador:', error));
  }, []);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  if (!trabajador) {
    return (
      <View style={styles.container}>
        <Text>Cargando información...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: `http://192.168.56.1:3001/uploads/${trabajador.foto}` }}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.card}>
      <Text style={styles.text}>Nombre: {trabajador.nombre_completo}</Text>
        <Text style={styles.text}>Teléfono: {trabajador.telefono}</Text>
        <Text style={styles.text}>Correo: {trabajador.correo}</Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  imageContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    width: '90%',
    maxWidth: 500,
    padding: 20,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 14,
    marginBottom: 20,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    width: '90%',
    maxWidth: 280,
    backgroundColor: '#2F62EE',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    elevation: 15,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
  },
});

export default PerfilScreen;

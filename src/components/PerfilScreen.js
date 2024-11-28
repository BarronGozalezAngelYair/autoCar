import React, { useEffect, useState, useCallback } from 'react';
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
  const [numReportes, setNumReportes] = useState(0);
  const [numCitas, setNumCitas] = useState(0);

  const fetchData = useCallback(() => {
    // Fetch trabajador data
    fetch('http://192.168.56.1:3001/api/usuarios')
      .then((response) => response.json())
      .then((data) => {
        if (data.length > 0) {
          setTrabajador(data[0]);
        } else {
          Alert.alert('Error', 'No se encontró trabajador.');
        }
      })
      .catch((error) =>
        console.error('Error al obtener los datos del trabajador:', error)
      );

    // Fetch número de reportes
    fetch('http://192.168.56.1:3001/api/reportes/numero')
      .then((response) => response.json())
      .then((data) => setNumReportes(data.numero || 0))
      .catch((error) =>
        console.error('Error al obtener el número de reportes:', error)
      );

    // Fetch número de citas
    fetch('http://192.168.56.1:3001/api/citas/numero')
      .then((response) => response.json())
      .then((data) => setNumCitas(data.numero || 0))
      .catch((error) =>
        console.error('Error al obtener el número de citas:', error)
      );
  }, []); // This ensures fetchData is stable and doesn't change on re-renders

  useEffect(() => {
    fetchData();

    const intervalId = setInterval(fetchData, 20000);

    return () => clearInterval(intervalId); // Limpiar intervalo cuando el componente se desmonte
  }, [fetchData]);

  const handleLogout = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: 'Login' }],
    });
  };

  const handleEditPhoto = () => {
    Alert.alert('Editar Foto', 'Función para editar foto aún no implementada.');
  };

  if (!trabajador) {
    return (
      <View style={styles.container}>
        <Text>Cargando información...</Text>
      </View>
    );
  }

  // Foto por defecto si no existe la imagen
  const fotoUrl = trabajador.foto
    ? { uri: trabajador.foto }
    : require('../images/fotoperfil.jpg');

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleEditPhoto}>
          <Image source={fotoUrl} style={styles.profileImage} />
        </TouchableOpacity>
        <Text style={styles.text}>Editar Foto</Text>
      </View>

      {/* Card de Datos del Trabajador */}
      <View style={[styles.card, styles.workerCard]}>
        <Text style={styles.cardTitle1}>Datos del Trabajador</Text>
        <View style={styles.workerInfo}>
          <Text style={styles.cardValuet}>Nombre: {trabajador.nombre}</Text>
          <Text style={styles.cardValuet}>Correo: {trabajador.correo}</Text>
          <Text style={styles.cardValuet}>Teléfono: {trabajador.telefono}</Text>
        </View>
      </View>

      {/* Cards de Reportes y Citas */}
      <View style={styles.cardsContainer}>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Reportes</Text>
          <Text style={[styles.cardValue, styles.blueText]}>{numReportes}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.cardTitle}>Citas</Text>
          <Text style={[styles.cardValue, styles.blueText]}>{numCitas}</Text>
        </View>
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
    width: 200,
    height: 200,
    borderRadius: 100,
    borderWidth: 3,
    borderColor: '#fff',
  },
  text: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
  cardsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    maxWidth: 500,
    marginBottom: 40,
  },
  card: {
    width: '48%',
    backgroundColor: '#FFF',
    borderRadius: 10,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 10,
    marginBottom: 20, // Espacio entre cards
  },
  workerCard: {
    width: '100%', // Ocupa el ancho completo
    alignItems: 'flex-start', // Alinear contenido a la izquierda
    paddingHorizontal: 20, // Espacio interno para el contenido
  },
  workerInfo: {
    marginTop: 2, // Separación entre título y contenido
  },
  cardTitle1: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2F62EE',
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardValue: {
    fontSize: 16,
    color: '#333',
  },
  cardValuet: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  blueText: {
    color: '#2F62EE', // Color azul para los números
    fontSize: 24,
    fontWeight: 'bold',
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
  },
});

export default PerfilScreen;

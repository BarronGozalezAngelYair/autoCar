import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';

const PerfilScreen = ({ route, navigation }) => {
  const { userId } = route.params || {};
  const [trabajador, setTrabajador] = useState(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');

  useEffect(() => {
    if (!userId) {
      setModalMessage('ID de usuario no proporcionado.');
      setIsModalVisible(true);
      return;
    }

    fetch(`http://192.168.56.1:3001/api/usuarios/trabajadores/${userId}`)
      .then((response) => response.json())
      .then((data) => setTrabajador(data))
      .catch((error) => {
        console.error('Error al obtener los datos del trabajador:', error);
        setModalMessage('Error al cargar el perfil');
        setIsModalVisible(true);
      });
  }, [userId]);

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
    <ScrollView contentContainerStyle={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.5}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>

      <Image
        source={require('../images/_mvl_perfil.png')}
        style={styles.logo}
      />

      <View style={styles.card}>
        <View style={styles.imageContainer}>
          <Image
            source={trabajador.foto ? { uri: trabajador.foto } : require('../images/fotoperfil.jpg')}
            style={styles.profileImage}
          />
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.textLabel}>Nombre:</Text>
          <Text style={styles.textValue}>{trabajador.nombre_completo}</Text>
          <Text style={styles.textLabel}>Teléfono:</Text>
          <Text style={styles.textValue}>{trabajador.telefono}</Text>
          <Text style={styles.textLabel}>Correo:</Text>
          <Text style={styles.textValue}>{trabajador.correo}</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Cerrar Sesión</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    paddingHorizontal: 20,
    backgroundColor: 'white',
  },
  logo: {
    width: 200,
    height: 200,
    resizeMode: 'contain',
    marginTop: 40,
    marginBottom: 20,
  },
  card: {
    width: '100%',
    maxWidth: 400,
    backgroundColor: '#FFF',
    borderRadius: 20,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 10,
    marginBottom: 20,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: '#2F62EE',
  },
  infoContainer: {
    width: '100%',
    alignItems: 'flex-start',
  },
  textLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#555',
    marginBottom: 5,
  },
  textValue: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
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
  modalContent: {
    width: '80%',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#2F62EE',
  },
  modalText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default PerfilScreen;

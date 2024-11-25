import React, { useState } from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  StyleSheet,
  Image,
} from 'react-native';
import Modal from 'react-native-modal';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState('success');

  const handleLogin = async () => {
    if (!email || !password) {
      setModalType('error');
      setModalMessage('Por favor completa todos los campos.');
      setIsModalVisible(true);
      return;
  }

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
        setModalType('success');
        setModalMessage('Inicio de sesión correcto');
        setIsModalVisible(true);
        setTimeout(() => {
          setIsModalVisible(false);
          navigation.replace('MainTabs');
        }, 2000);
      } else {
        setModalType('error');
        setModalMessage('Permiso Denegado');
        setIsModalVisible(true);
      }
    } catch (error) {
      console.error('Error al iniciar sesión:', error);
      setModalType('error');
      setModalMessage('Hubo un problema al conectarse con el servidor');
      setIsModalVisible(true);
    }
  };

  return (
    <View style={styles.container}>
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setIsModalVisible(false)}
        animationIn="slideInUp"
        animationOut="slideOutDown"
        backdropOpacity={0.7}
      >
        <View
          style={[
            styles.modalContent,
            modalType === 'success'
              ? styles.successBackground
              : styles.errorBackground,
          ]}
        >
          <Text style={styles.modalText}>{modalMessage}</Text>
        </View>
      </Modal>

      <Image source={require('../images/login.png')} style={styles.logo} />

      <View style={styles.card}>
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
      </View>

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Entrar</Text>
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
  logo: {
    width: 500,
    height: 250,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFF',
    borderRadius: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 14,
    marginBottom: 70,
  },
  inputContainer: {
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
  },
  input: {
    height: 50,
    fontSize: 16,
    fontFamily: 'sans-serif',
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
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
    margin: 0,
  },
  modalContent: {
    width: '85%',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 8,
  },
  successBackground: {
    backgroundColor: '#2F62EE',
  },
  errorBackground: {
    backgroundColor: '#EE2F2F',
  },
  modalText: {
    color: '#FFF',
    fontSize: 18,
    fontWeight: 'bold',
    fontFamily: 'sans-serif-medium',
    textAlign: 'center',
  },
});

export default LoginScreen;

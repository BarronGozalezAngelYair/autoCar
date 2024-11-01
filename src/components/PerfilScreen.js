import React from 'react';
import { View, Text, Image, StyleSheet, Button } from 'react-native';

const PerfilScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../images/cr7.jpeg')}
          style={styles.profileImage}
        />
      </View>

      <View style={styles.card}>
        <Text style={styles.text}>Nombre: Juan Pérez</Text>
        <Text style={styles.text}>Especialidad: Mecánica</Text>
        <Text style={styles.text}>Horario: 9am - 6pm</Text>
        <Text style={styles.text}>Sucursal: Centro</Text>

        <Button title="Regresar" onPress={() => {}} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
  },
  imageContainer: {
    position: 'absolute',
    top: -50,
    zIndex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#fff',
  },
  card: {
    width: '80%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    marginTop: 70,
  },
  text: {
    marginBottom: 10,
    fontSize: 16,
  },
});

export default PerfilScreen;
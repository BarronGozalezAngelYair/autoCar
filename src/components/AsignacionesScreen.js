import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const AsignacionesScreen = ({ navigation }) => {
  const asignaciones = [
    {
      cliente: 'Cliente 1',
      fecha: '2024-10-07 10:00',
      servicio: 'Servicio 1',
      imagen: '../images/carro1.jpg', 
    },
    {
      cliente: 'Cliente 2',
      fecha: '2024-10-08 12:00',
      servicio: 'Servicio 2',
      imagen: '../images/carro1.jpg',
    },
  ];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../images/mvl_asignaciones.png')}
        style={styles.logo}
      />
      <View style={styles.asignacionesList}>
        {asignaciones.map((asignacion, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Informacion', asignacion)}
          >
            <Text style={styles.title}>{asignacion.cliente}</Text>
            <Text style={styles.details}>{asignacion.fecha}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#FFFFFF',
  },
  logo: {
    width: 500,
    height: 200,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 20,
  },
  asignacionesList: {
    width: '100%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    marginVertical: 5,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
  },
});

export default AsignacionesScreen;

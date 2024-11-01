import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from 'react-native';

const CompletadosScreen = ({ navigation }) => {
  const completados = [
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
        source={require('../images/_mvl_compt.png')}
        style={styles.logo}
      />
      <View style={styles.completadosList}>
        {completados.map((completados, index) => (
          <TouchableOpacity
            key={index}
            style={styles.card}
            onPress={() => navigation.navigate('Informacion', completados)}
          >
            <Text style={styles.title}>{completados.cliente}</Text>
            <Text style={styles.details}>{completados.fecha}</Text>
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

export default CompletadosScreen;

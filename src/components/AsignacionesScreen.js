import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image
} from 'react-native';

const AsignacionesScreen = ({ navigation }) => {
  const [asignaciones, setAsignaciones] = useState([]);

  const obtenerAsignaciones = () => {
    fetch('http://192.168.56.1:3001/api/asignaciones')
      .then(response => response.json())
      .then(data => setAsignaciones(data))
      .catch(error => console.error('Error al obtener asignaciones:', error));
  };

  useEffect(() => {
    obtenerAsignaciones();

    const interval = setInterval(obtenerAsignaciones, 30000);
    return () => clearInterval(interval);
  }, []);

  const fmtfecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
};

  const fmthora = (hora) => {
    return hora.slice(0, 5);
  };

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
            onPress={() => navigation.navigate('Informacion', { id_cita: asignacion.id_cita})}
          >
            <Text style={styles.title}>Nombre: {asignacion.cliente}</Text>
            <Text style={styles.details}>Fecha: {fmtfecha(asignacion.fecha)}</Text>
            <Text style={styles.details}>Hora: {fmthora(asignacion.hora)}</Text>
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
    height: 150,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginBottom: 24,
  },
  asignacionesList: {
    width: '100%',
  },
  card: {
    width: '100%',
    maxWidth: 500,
    backgroundColor: '#FFF',
    borderRadius: 15,
    paddingVertical: 20,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 5,
    elevation: 15,
    marginBottom: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
    color: '#333',
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
});

export default AsignacionesScreen;

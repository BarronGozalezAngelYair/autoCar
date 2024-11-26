import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

const CompletadosScreen = () => {
  const [completados, setCompletados] = useState([]);
  const [loading, setLoading] = useState(true);

  const fmtfecha = (fechaISO) => {
    const fecha = new Date(fechaISO);
    const dia = String(fecha.getDate()).padStart(2, '0');
    const mes = String(fecha.getMonth() + 1).padStart(2, '0');
    const anio = fecha.getFullYear();
    return `${dia}/${mes}/${anio}`;
  };

  useEffect(() => {
    const obtenerCompletados = async () => {
      try {
        const response = await fetch('http://192.168.56.1:3001/api/completados');
        const data = await response.json();
        setCompletados(data);
      } catch (error) {
        console.error('Error al obtener los completados:', error);
      } finally {
        setLoading(false);
      }
    };

    obtenerCompletados();

    const interval = setInterval(obtenerCompletados, 20000);
    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Image
        source={require('../images/_mvl_compt.png')}
        style={styles.logo}
      />
      {loading ? (
        <ActivityIndicator size="large" color="#2F62EE" style={styles.loader} />
      ) : (
        <View style={styles.completadosList}>
          {completados.length > 0 ? (
            completados.map((completado, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.details}>
                  <Text style={styles.label}>Cliente:</Text> {completado.cliente}
                </Text>
                <Text style={styles.details}>
                  <Text style={styles.label}>Modelo:</Text> {completado.modelo_carro}
                </Text>
                <Text style={styles.details}>
                  <Text style={styles.label}>Descripción:</Text> {completado.descripcion}
                </Text>
                <Text style={styles.details}>
                  <Text style={styles.label}>Fechas:</Text>{' '}
                  {fmtfecha(completado.fecha_inicio)} - {fmtfecha(completado.fecha_fin)}
                </Text>
              </View>
            ))
          ) : (
            <Text style={styles.noDataText}>No hay reportes completados aún.</Text>
          )}
        </View>
      )}
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
    marginBottom: 20,
  },
  loader: {
    marginTop: 20,
  },
  completadosList: {
    width: '100%',
    paddingBottom: 16,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 10,
  },
  details: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
  },
  label: {
    fontWeight: 'bold',
  },
  noDataText: {
    fontSize: 16,
    color: '#999',
    textAlign: 'center',
    marginTop: 20,
  },
});

export default CompletadosScreen;

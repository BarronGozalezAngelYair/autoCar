import React, { useEffect, useState } from 'react';
import {
    Text,
    View,
    StyleSheet,
    Image,
    TouchableOpacity,
    Alert,
} from 'react-native';

const InformacionScreen = ({ route, navigation }) => {
    const { id_cita } = route.params;
    const [asignacion, setAsignacion] = useState(null);

    useEffect(() => {
        fetch(`http://192.168.56.1:3001/api/asignaciones/${id_cita}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta del servidor');
                }
                return response.json();
            })
            .then(data => {
                if (data) {
                    setAsignacion(data);
                } else {
                    throw new Error('Datos de la asignación no encontrados');
                }
            })
            .catch(error => {
                console.error('Error al obtener los detalles:', error);
                Alert.alert('Error', 'Hubo un problema al cargar los detalles de la asignación');
            });
    }, [id_cita]);

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

    if (!asignacion) {
        return (
            <View style={styles.container}>
                <Text>Cargando....</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/_mvl_info.png')}
                style={styles.logo}
            />
            <View style={styles.card}>
                <Text style={styles.detailTitle}>Cliente:</Text>
                <Text style={styles.detail}>{asignacion.cliente}</Text>
                <Text style={styles.detailTitle}>Fecha:</Text>
                <Text style={styles.detail}>{fmtfecha(asignacion.fecha)}</Text>
                <Text style={styles.detailTitle}>Hora:</Text>
                <Text style={styles.detail}>{fmthora(asignacion.hora)}</Text>
                <Text style={styles.detailTitle}>Servicio:</Text>
                <Text style={styles.detail}>{asignacion.servicio}</Text>
                <Image
                    source={{ uri: `https://192.168.56.1:3001/uploads/${asignacion.imagen}` }}
                    style={styles.carImage}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Reporte', { id_cita })}>
                <Text style={styles.buttonText}>Realizar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
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
        marginBottom: '0.2',
    },
    card: {
        backgroundColor: '#FFF',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        maxWidth: 380,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 6 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 15,
        marginBottom: 0,
    },
    detailTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#555',
        marginTop: 10,
    },
    detail: {
        fontSize: 17,
        color: '#555',
        marginBottom: 5,
    },
    carImage: {
        width: '90%',
        height: 180,
        borderRadius: 10,
        marginTop: 10,
    },
    button: {
        width: '75%',
        maxWidth: 280,
        backgroundColor: '#2F62EE',
        paddingVertical: 15,
        borderRadius: 15,
        alignItems: 'center',
        elevation: 8,
        marginTop: 35,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
    },
});

export default InformacionScreen;

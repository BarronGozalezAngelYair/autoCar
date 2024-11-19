import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    Alert,
    TouchableOpacity,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';

const ReporteScreen = ({ route, navigation }) => {
    const { id_cita} = route.params;
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showDataPickerInicio, setShowDataPickerInicio] = useState(false);
    const [showDataPickerTermino, setShowDataPickerTermino] = useState(false);

    const handleDateChange = (event, selectedDate, type) => {
        const currentDate = selectedDate || new Date();
        const formattedDate = `${currentDate.getDate()}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

        if (type === 'inicio') {
            setFechaInicio(formattedDate);
            setShowDataPickerInicio(false);
        } else if (type === 'termino') {
            setFechaTermino(formattedDate);
            setShowDataPickerTermino(false);
        }
    };

    const handleTerminar = async () => {
        try {
            const formatDate = (dateString) => {
                const [day, month, year] = dateString.split('/');
                return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`;
            };

            const formattedFechaInicio = formatDate(fechaInicio);
            const formattedFechaTermino = formatDate(fechaTermino);

            const response = await fetch('http://192.168.56.1:3001/api/reportes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    descripcion,
                    fechaInicio: formattedFechaInicio,
                    fechaTermino: formattedFechaTermino,
                    id_cita,
                }),
            });

            const data = await response.json();

            if (data.success) {
                Alert.alert('Éxito', 'Reporte guardado correctamente');
                navigation.navigate('Completados');
            } else {
                Alert.alert('Error', 'Hubo un problema al guardar el reporte');
            }
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            Alert.alert('Error', 'No se pudo conectar con el servidor');
        }
    };

    return (
        <View style={styles.container}>
            <Image
                source={require('../images/reportee.png')}
                style={styles.logo}
            />
            <View style={styles.card}>
                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.descriptionInput}
                        placeholder="Descripción"
                        value={descripcion}
                        onChangeText={setDescripcion}
                        placeholderTextColor="#999"
                        multiline
                    />
                </View>
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha de Inicio</Text>
                    <TouchableOpacity onPress={() => setShowDataPickerInicio(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Selecciona la fecha de inicio"
                            value={fechaInicio}
                            editable={false}
                            placeholderTextColor="#999"
                        />
                    </TouchableOpacity>
                </View>
                {showDataPickerInicio && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'inicio')}
                    />
                )}
                <View style={styles.inputContainer}>
                    <Text style={styles.label}>Fecha de Término</Text>
                    <TouchableOpacity onPress={() => setShowDataPickerTermino(true)}>
                        <TextInput
                            style={styles.input}
                            placeholder="Selecciona la fecha de término"
                            value={fechaTermino}
                            editable={false}
                            placeholderTextColor="#999"
                        />
                    </TouchableOpacity>
                </View>
                {showDataPickerTermino && (
                    <DateTimePicker
                        value={new Date()}
                        mode="date"
                        display={Platform.OS === 'ios' ? 'spinner' : 'calendar'}
                        onChange={(event, selectedDate) => handleDateChange(event, selectedDate, 'termino')}
                    />
                )}
            </View>
            <TouchableOpacity style={styles.button} onPress={handleTerminar}>
                <Text style={styles.buttonText}>Finalizar</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignItems: 'center',
        paddingHorizontal: 16,
        backgroundColor: 'white',
    },
    logo: {
        width: 500,
        height: 150,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 16,
    },
    card: {
        width: '190%',
        maxWidth: 350,
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
    descriptionInput: {
        height: 100,
        fontSize: 16,
        fontFamily: 'sans-serif',
        color: '#333',
        paddingVertical: 10,
    },
    button: {
        width: '90%',
        maxWidth: 280,
        backgroundColor: '#2F62EE',
        paddingVertical: 15,
        borderRadius: 10,
        alignItems: 'center',
        elevation: 15,
        marginTop: 20,
    },
    buttonText: {
        color: '#FFF',
        fontSize: 18,
        fontWeight: 'bold',
        fontFamily: 'sans-serif-medium',
        textAlign: 'center',
    },
});

export default ReporteScreen;

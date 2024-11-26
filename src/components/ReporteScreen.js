import React, { useState } from 'react';
import {
    View,
    TextInput,
    Text,
    StyleSheet,
    Image,
    TouchableOpacity,
    Platform,
} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Modal from 'react-native-modal';

const ReporteScreen = ({ route, navigation }) => {
    const { id_cita } = route.params;
    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [descripcion, setDescripcion] = useState('');
    const [showDataPickerInicio, setShowDataPickerInicio] = useState(false);
    const [showDataPickerTermino, setShowDataPickerTermino] = useState(false);

    const [isModalVisible, setIsModalVisible] = useState(false);
    const [modalMessage, setModalMessage] = useState('');
    const [modalType, setModalType] = useState('success');

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
        if (!descripcion || !fechaInicio || !fechaTermino) {
            setModalType('error');
            setModalMessage('Por favor completa todos los campos.');
            setIsModalVisible(true);
            return;
        }

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
                setModalType('success');
                setModalMessage('Reporte guardado correctamente');
                setIsModalVisible(true);
                setTimeout(() => {
                    setIsModalVisible(false);
                    navigation.navigate('Completados');
                }, 2000);
            } else {
                setModalType('error');
                setModalMessage('Hubo un problema al guardar el reporte');
                setIsModalVisible(true);
            }
        } catch (error) {
            console.error('Error al enviar el reporte:', error);
            setModalType('error');
            setModalMessage('No se pudo conectar con el servidor');
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
                backdropOpacity={0.5}
                style={styles.modalContainer}
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
        paddingHorizontal: 20,
        backgroundColor: 'white',
    },
    logo: {
        width: 660,
        height: 250,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 24,
    },
    card: {
        width: '250%',
        maxWidth: 380,
        backgroundColor: '#FFF',
        borderRadius: 20,
        paddingVertical: 20,
        paddingHorizontal: 15,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 14,
        marginBottom: 60,
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
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        margin: 0,
    },
    modalContent: {
        width: '80%', // ajustado para centrado
        padding: 25,
        borderRadius: 15,
        alignItems: 'center',
        justifyContent: 'center',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 0 },
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

export default ReporteScreen;

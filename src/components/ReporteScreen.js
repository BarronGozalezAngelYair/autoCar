import React, { useState } from "react";
import {
    View,
    TextInput,
    Button,
    StyleSheet,
    Image,
} from 'react-native';


const ReporteScreen = ({ navigation }) => {

    const [fechaInicio, setFechaInicio] = useState('');
    const [fechaTermino, setFechaTermino] = useState('');
    const [gastos, setGastos] = useState('');
    const [descripcion, setDescripcion] = useState('');

    const handleTerminar = () => {
        console.log({
            fechaInicio,
            fechaTermino,
            gastos,
            descripcion,
        });

        navigation.goBack();
    };

    return (
        <View style = {styles.container}>
            <Image
            source={require('../images/_mvl_reporte.png')}
            style={styles.logo}
            />
        <View style = {styles.card}>
            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Fecha/Hora inicio"
                value={fechaInicio}
                onChange={setFechaInicio}
                />
            </View>
            <View style={styles.line}/>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Fecha/Hora termino"
                value={fechaTermino}
                onChange={setFechaTermino}
                />
            </View>
            <View style={styles.line}/>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Gastos extra"
                value={gastos}
                onChange={setGastos}
                />
            </View>
            <View style={styles.line}/>

            <View style={styles.inputContainer}>
                <TextInput
                style={styles.input}
                placeholder="Descripcion"
                value={descripcion}
                onChange={setDescripcion}
                />
            </View>
            <View style={styles.line}/>
            <Button title="Terminar" onPress={() => navigation.navigate('Completados')}/>

        </View>
        </View>

    )

}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 16,
        backgroundColor: '#FFFFFF',
    },
    logo: {
        width: 500,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 10,
    },
    card: {
        backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 70,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginBottom: 20,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'flex-start',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 16,
        paddingHorizontal: 8,
        borderRadius: 5,
        backgroundColor: '#fff',
      },
    line: {
        height: 1,
        backgroundColor: 'gray',
        marginBottom: 20,
      },
});

export default ReporteScreen;
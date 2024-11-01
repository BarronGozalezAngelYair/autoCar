import React from "react";
import {
    Text,
    View,
    StyleSheet,
    Image,
    Button
} from 'react-native';

const InformacionScreen = ({ route, navigation }) => {
    const { cliente, fecha, servicio, imagen } = route.params;

    return (
        <View style={styles.container}>
          <Image
        source={require('../images/_mvl_info.png')}
        style={styles.logo}
        />  
        <View style={styles.card}>
        <Text style={styles.detail}>Cliente: {cliente}</Text>
        <Text style={styles.detail}>Fecha/Hora: {fecha}</Text>
        <Text style={styles.detail}>Servicio: {servicio}</Text>
        <Image
        source={require('../images/carro1.jpg')}
        style={styles.logo}
        />  
      </View>
      <Button title="Realizar" onPress={() => navigation.navigate('Reporte')}/>
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
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    card: {
      backgroundColor: '#FFFFFF',
      borderRadius: 10,
      padding: 20,
      width: '100%',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 3.84,
      elevation: 5,
    },
    detail: {
      fontSize: 18,
      marginBottom: 10,
    },
    image: {
      width: 200,
      height: 100,
      resizeMode: 'contain',
      marginTop: 10,
    },
    logo: {
        width: 500,
        height: 200,
        resizeMode: 'contain',
        alignSelf: 'center',
        marginBottom: 20,
  },
}
);
  
  export default InformacionScreen;
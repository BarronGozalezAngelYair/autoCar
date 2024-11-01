const mysql = require('mysql');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'autocare'
});

connection.connect((err) => {
    if (err) {
        console.error('Error: conexion con la BD fallida: ', err);
        return;
    }
    console.log('Conexion exitosa con la BD');
});

module.exports = connection;
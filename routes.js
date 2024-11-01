const express = require('express');
const router = express.Router();
const connection = require('./db');

// Consulta a todos los registros
router.get('/usuarios', (req, res) => {
    connection.query('SELECT * FROM usuarios', (err, results) => {
        if (err) {
            console.error('Error al obtener registros:', err);
            res.status(500).json({ error: 'Error al obtener registros' });
            return;
        }
        res.json(results);
    });
});

// Endpoint de Login
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    const query = 'SELECT * FROM usuarios WHERE correo = ? AND contrasena = ?';
    connection.query(query, [email, password], (err, results) => {
        if (err) {
            console.error('Error en la consulta de inicio de sesión:', err);
            res.status(500).json({ error: 'Error en el servidor' });
            return;
        }

        if (results.length > 0) {
            res.json({ success: true, message: 'Inicio de sesión correcto' });
        } else {
            res.json({ success: false, message: 'Credenciales inválidas' });
        }
    });
});

module.exports = router;

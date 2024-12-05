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

    const query = `SELECT u.id, u.nombre, u.app, u.apm, u.correo, u.id_perfil, p.perfil 
    FROM usuarios u
    JOIN perfiles p ON u.id_perfil = p.id
    WHERE u.correo = ? AND u.contrasena = ? AND p.perfil = 'Trabajador' 
    `;
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

//Endpoint Asignaciones
router.get('/asignaciones', (req, res) => {
    const query = `
        SELECT 
            c.id AS id_cita,
            c.fecha,
            c.hora,
            CONCAT(u.nombre, ' ', u.app, ' ', u.apm) AS cliente
        FROM citas AS c
        JOIN usuarios AS u ON c.id_usuario = u.id
        JOIN perfiles AS p ON u.id_perfil = p.id
        LEFT JOIN reportes AS r ON c.id = r.id_cita
        WHERE p.perfil = 'Cliente' AND r.id IS NULL;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener las asignaciones:', err);
            res.status(500).json({ error: 'Error al obtener las asignaciones'});
        } else {
            res.json(results);
        }
    });
});

// Endpoint para obtener detalles de asignación
router.get('/asignaciones/:id_cita', (req, res) => {
    const { id_cita } = req.params;
    const query = `
        SELECT 
            c.fecha,
            c.hora,
            CONCAT(u.nombre, ' ', u.app, ' ', u.apm) AS cliente,
            s.servicio,
            g.imagen AS imagen
        FROM citas AS c
        JOIN usuarios AS u ON c.id_usuario = u.id
        JOIN perfiles AS p ON u.id_perfil = p.id
        LEFT JOIN citas_servicios_trabajadores AS cst ON c.id = cst.id_cita
        LEFT JOIN servicios_trabajadores AS st ON cst.id_servicio = st.id
        LEFT JOIN servicios AS s ON st.id_servicio = s.id
        LEFT JOIN vehiculos AS v ON u.id = v.id_usuario
        LEFT JOIN galeria AS g ON v.id = g.id_vehiculo
        WHERE c.id = ?;
    `;

    connection.query(query, [id_cita], (err, results) => {
        if (err) {
            console.error('Error al obtener detalles de la asignación:', err);
            return res.status(500).json({ error: 'Error al obtener los detalles de la asignación' });
        }
        res.json(results[0]);
    });
});


//  EndPoint para guardar reportes
router.post('/reportes', (req, res) => {

    const { descripcion, fechaInicio, fechaTermino, id_cita } = req.body;

    console.log('Datos recibidos en el servidor:');
    console.log(JSON.stringify(req.body, null, 2));


    if (!descripcion || !fechaInicio || !fechaTermino || !id_cita) {
        console.log('Error: Faltan campos obligatorios.');
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    const query = 'INSERT INTO reportes (descripcion, fecha_inicio, fecha_fin, id_cita) VALUES (?, ?, ?, ?)';
    connection.query(query, [descripcion, fechaInicio, fechaTermino, id_cita], (err, result) => {
        if (err) {
            console.error('Error al insertar el reporte:', err);
            return res.status(500).json({ success: false, message: 'Error al insertar el reporte' });
        }
        console.log('Reporte guardado exitosamente con ID:', result.insertId);
        res.json({ success: true, message: 'Reporte guardado exitosamente', reportId: result.insertId });
    });
});

//EndPoint para completados
router.get('/completados', (req, res) => {
    const  query = `
        SELECT
            CONCAT(u.nombre, ' ', u.app, ' ', u.apm)AS cliente,
            v.modelo AS modelo_carro,
            r.descripcion,
            r.fecha_inicio,
            r.fecha_fin
        FROM reportes r
        JOIN citas c ON r.id_cita = c.id
        JOIN usuarios u ON c.id_usuario = u.id
        LEFT JOIN vehiculos v ON u.id = v.id_usuario
        WHERE r.fecha_fin IS NOT NULL;
    `;

    connection.query(query, (err, results) => {
        if (err) {
            console.error('Error al obtener los completados:', err);
            return res.status(500).json({ error: 'Error al obtener los completados' });
        }
        console.log('Datos obtenidos:', results);
        res.json(results);
    });
});


// Endpoint para obtener datos específicos del trabajador por ID
router.get('/usuarios/trabajador/:id', (req, res) => {
    const { id } = req.params;
    if (!id) {
        return res.status(400).send('Falta el ID del trabajador.');
    }
    const query = `
        SELECT 
            CONCAT(u.nombre, ' ', u.app, ' ', u.apm) AS nombre_completo,
            u.telefono,
            u.correo,
            u.foto
        FROM usuarios AS u
        JOIN perfiles AS p ON u.id_perfil = p.id
        WHERE p.id = 3 AND u.id = ?;  
    `;

    connection.query(query, [id], (err, results) => {
        if (err) {
            console.error('Error al obtener los datos del trabajador:', err);
            return res.status(500).json({ error: 'Error al obtener los datos del trabajador' });
        }
        if (!results || results.length === 0) {
            return res.status(404).json({ error: 'No se encontró el trabajador.' });
        }
        res.json(results[0]); // Devolver el primer resultado, que debe ser el único
    });
});


// Ruta: /api/reportes/numero
router.get('/reportes/numero', (req, res) => {
    const query = `
      SELECT COUNT(*) AS numero
      FROM reportes
    `;
    connection.query(query, (err, results) => {
      if (err) {
        console.error('Error al obtener el número de reportes:', err);
        return res.status(500).json({ error: 'Error al obtener el número de reportes' });
      }
      res.json({ numero: results[0].numero });
    });
  });

// Ruta: /api/citas/numero
router.get('/citas/numero', (req, res) => {
  const query = `
    SELECT COUNT(*) AS numero
    FROM citas
  `;

  connection.query(query, (err, results) => {
    if (err) {
      console.error('Error al obtener el número de citas:', err);
      return res.status(500).json({ error: 'Error al obtener el número de citas' });
    }
    res.json({ numero: results[0].numero });
  });
});



module.exports = router;

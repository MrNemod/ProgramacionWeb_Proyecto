const express = require('express');
const router = express.Router();
const { obtenerComidas, crearComida } = require('./crudComida');

router.get('/', (req, res) => {
  obtenerComidas((error, comidas) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener las comidas' });
    }
    res.json(comidas);
  });
});

router.post('/', (req, res) => {
  console.log('Datos recibidos:', req.body); // Mensaje de consola para depuración
  const { nombre, descripcion, precio, categoria, tipo, imagen_url } = req.body;

  if (!nombre || !descripcion || !precio || !categoria || !tipo || !imagen_url) {
    return res.status(400).json({ error: 'Todos los campos son obligatorios' });
  }

  crearComida(nombre, descripcion, precio, categoria, tipo, imagen_url, (error, result) => {
    if (error) {
      console.error('Error al crear la comida:', error); // Mensaje de consola para depuración
      return res.status(500).json({ error: 'Error al crear la comida' });
    }
    res.status(201).json({ success: true, message: 'Comida creada exitosamente' });
  });
});

module.exports = router;

const express = require('express');
const router = express.Router();
const { obtenerComidas } = require('./crudComida');

router.get('/', (req, res) => {
  obtenerComidas((error, comidas) => {
    if (error) {
      return res.status(500).json({ error: 'Error al obtener las comidas' });
    }
    res.json(comidas);
  });
});

module.exports = router;

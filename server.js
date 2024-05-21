const express = require('express');
const path = require('path');
const app = express();
const comidasRouter = require('./public/JS/comidas');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configurar las rutas API
app.use('/api/comidas', comidasRouter);

// Ruta para servir `home.html`
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'home.html'));
});

// Ruta para servir `cart.html`
app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'cart.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

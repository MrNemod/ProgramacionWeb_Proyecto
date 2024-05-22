const express = require('express');
const path = require('path');
const session = require('express-session');
const bodyParser = require('body-parser'); // Opcional, solo si usas body-parser
const app = express();
const comidasRouter = require('./public/JS/comidas');

// Middleware para servir archivos estáticos
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de sesiones
app.use(session({
  secret: 'mi_secreto', // Cambia esto por un secreto más seguro
  resave: false,
  saveUninitialized: true
}));

// Middleware para manejar datos JSON
//app.use(express.json()); // Agregar este middleware
 app.use(bodyParser.json()); // Opcional, solo si usas body-parser

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

// Ruta para servir `new_food.html`
app.get('/new-food', (req, res) => {
  res.sendFile(path.join(__dirname, 'Views', 'new_food.html'));
});

// Ruta para agregar una comida al carrito
app.post('/api/cart', (req, res) => {
  try {
    const { nombre, descripcion, precio, cantidad, imagen_url } = req.body;
    if (!req.session.cart) {
      req.session.cart = [];
    }
    req.session.cart.push({ nombre, descripcion, precio, cantidad, imagen_url });
    res.json({ message: 'Comida agregada al carrito' });
  } catch (error) {
    console.error('Error al agregar al carrito:', error);
    res.status(500).json({ error: 'Error al agregar al carrito' });
  }
});

// Ruta para obtener las comidas del carrito
app.get('/api/cart', (req, res) => {
  res.json(req.session.cart || []);
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});

const sqlite3 = require('sqlite3').verbose();

// Configuración de la conexión a la base de datos SQLite
const dbPath = 'restaurante_italiano.db';
const connection = new sqlite3.Database(dbPath);

// Conectar a la base de datos
connection.serialize(() => {
  console.log('Conexión establecida con la base de datos.');
});

// Función para ejecutar una consulta SQL con parámetros
function executeQuery(query, params, callback) {
  connection.all(query, params, (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error.message);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Función para crear una nueva comida en la base de datos
function crearComida(nombre, descripcion, precio, categoria, tipo, imagen_url, callback) {
  const query = 'INSERT INTO comidas (nombre, descripcion, precio, categoria, tipo, imagen_url) VALUES (?, ?, ?, ?, ?, ?)';
  executeQuery(query, [nombre, descripcion, precio, categoria, tipo, imagen_url], callback);
}

// Función para obtener todas las comidas de la base de datos
function obtenerComidas(callback) {
  const query = 'SELECT * FROM comidas';
  executeQuery(query, [], callback);
}

// Función para obtener una comida por su nombre
function obtenerComida(nombre, callback) {
  const query = 'SELECT * FROM comidas WHERE nombre = ?';
  executeQuery(query, [nombre], callback);
}

// Función para actualizar una comida en la base de datos
function actualizarComida(nombre, nuevaDescripcion, nuevoPrecio, nuevaCategoria, nuevoTipo, callback) {
  const query = 'UPDATE comidas SET descripcion = ?, precio = ?, categoria = ?, tipo = ? WHERE nombre = ?';
  executeQuery(query, [nuevaDescripcion, nuevoPrecio, nuevaCategoria, nuevoTipo, nombre], callback);
}

// Función para eliminar una comida de la base de datos
function eliminarComida(nombre, callback) {
  const query = 'DELETE FROM comidas WHERE nombre = ?';
  executeQuery(query, [nombre], callback);
}

// Exportar las funciones para que puedan ser utilizadas en otros archivos
module.exports = { crearComida, obtenerComidas, obtenerComida, actualizarComida, eliminarComida };

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
  connection.run(query, params, function(error) {
    if (error) {
      console.error('Error en la consulta SQL:', error.message);
      callback(error, null);
      return;
    }
    callback(null, this);
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
  connection.all(query, [], (error, results) => {
    if (error) {
      console.error('Error en la consulta SQL:', error.message);
      callback(error, null);
      return;
    }
    callback(null, results);
  });
}

// Exportar las funciones para que puedan ser utilizadas en otros archivos
module.exports = { crearComida, obtenerComidas };

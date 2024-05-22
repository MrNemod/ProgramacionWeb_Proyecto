# Página de Comida Italiana

¡Bienvenido a la Página de Comida Italiana! Este proyecto es una aplicación web diseñada para mostrar diferentes platos italianos deliciosos y permitir a los usuarios realizar pedidos.

## Funcionalidades

- **Visualización de Platos:** Los usuarios pueden explorar una variedad de platos italianos auténticos.
- **Carrito de Compras:** Los usuarios pueden agregar platos al carrito y ver una simulación de los artículos seleccionados.
- **Base de Datos SQLite:** La aplicación utiliza una base de datos SQLite (`restaurante_italiano.db`) para almacenar información sobre los platos.
- **Tecnologías Utilizadas:** HTML, CSS y JavaScript para el desarrollo front-end. Node.js para el servidor.

## Requisitos Previos

- Node.js instalado en tu máquina local.

## Instalación y Uso

1. Clona este repositorio en tu máquina local:

  git clone git clone https://github.com/MrNemod/ProgramacionWeb_Proyecto.git


2. Instala las dependencias del proyecto:

  npm install

3. Ejecuta el servidor

  node server.js

4. Abre tu navegador web y ve a `http://localhost:3000` para acceder a la aplicación.

## Estructura del Proyecto

El proyecto está organizado de la siguiente manera:

```
└── 📁Proyecto Programacion web
    └── package-lock.json
    └── package.json
    └── 📁public
        └── 📁CSS
            └── styles.css
        └── 📁Images
            └── Bruschetta.jpg
            └── Caprese.jpg
            └── Lasagna.jpg
            └── Logo.png
            └── Pizza_Margherita.jpg
            └── Risotto.jpg
            └── Tiramisu.jpg
        └── 📁JS
            └── cart.js
            └── comidas.js
            └── crudComida.js
            └── home.js
    └── README.md
    └── restaurante_italiano.db
    └── server.js
    └── 📁Views
        └── cart.html
        └── home.html
```

## Notas Adicionales

- Este proyecto es una versión inicial y actualmente no incluye la funcionalidad de pagos ni la capacidad de agregar objetos al carrito.
- La base de datos SQLite `restaurante_italiano.db` contiene información predefinida sobre los platos italianos.

## Licencia

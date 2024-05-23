# Página de Comida Italiana
¡Bienvenido a la Página de Comida Italiana! Este proyecto es una aplicación web diseñada para mostrar diferentes platos italianos deliciosos y permitir a los usuarios realizar pedidos.

## Funcionalidades
Visualización de Platos: Los usuarios pueden explorar una variedad de platos italianos auténticos.

Carrito de Compras: Los usuarios pueden agregar platos al carrito y ver una simulación de los artículos seleccionados.

Añadir Comidas al Carrito: Los usuarios pueden añadir platos específicos al carrito de compras.

Crear Nueva Comida: Los administradores pueden crear nuevos platos para mostrar en la página.

Base de Datos SQLite: La aplicación utiliza una base de datos SQLite (restaurante_italiano.db) para almacenar información sobre los platos.

Tecnologías Utilizadas: HTML, CSS y JavaScript para el desarrollo front-end. Node.js para el servidor.
## Requisitos Previos
Node.js instalado en tu máquina local.
## Instalación y Uso
1. Clona este repositorio en tu máquina local:
   
   git clone https://github.com/MrNemod/ProgramacionWeb_Proyecto.git

2. Instala las dependencias del proyecto:

   npm install

3. Ejecuta el servidor

   node server.js

4. Abre tu navegador web y ve a http://localhost:3000 para acceder a la aplicación.

# Estructura del proyecto

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
            └── Paper.jpg
            └── Pizza_Margherita.jpg
            └── Risotto.jpg
            └── Tiramisu.jpg
        └── 📁JS
            └── cart.js
            └── comidas.js
            └── crudComida.js
            └── home.js
            └── new_food.js
    └── README.md
    └── restaurante_italiano.db
    └── server.js
    └── 📁Views
        └── cart.html
        └── home.html
        └── new_food.html
```

## Notas adicionales

-Este proyecto es una versión inicial y actualmente no incluye la funcionalidad de pagos.

-La base de datos SQLite restaurante_italiano.db contiene información predefinida sobre los platos italianos.

-Las funcionalidades de añadir comidas al carrito y crear una nueva comida han sido recientemente implementadas.

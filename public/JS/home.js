$(document).ready(function() {
    // Función para cargar el carrito desde el almacenamiento local (opcional)
    function cargarCarritoDesdeLocalStorage() {
      const storedCart = localStorage.getItem('carrito');
      if (storedCart) {
        return JSON.parse(storedCart);
      } else {
        return [];
      }
    }

    // Array para guardar los elementos del carrito
    let carrito = cargarCarritoDesdeLocalStorage();

    // Función para guardar el carrito en el almacenamiento local (opcional)
    function guardarCarritoEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }

    // Función para actualizar el contador del carrito en la barra de navegación (opcional)
    function actualizarContadorCarrito() {
      const contadorCarrito = $('#contador-carrito');
      contadorCarrito.text(carrito.length);
    }

    // Función para cargar las comidas desde la base de datos
    function cargarComidas() {
      $.ajax({
        url: '/api/comidas',
        type: 'GET',
        success: function(response) {
          // Manejar la respuesta del servidor
          console.log(response); // Verificar la respuesta en la consola del navegador
          
          // Agregar las comidas al DOM
          const foodGrid = $('#food-grid');
          response.forEach(comida => {
            const card = `
              <div class="col-md-4">
                <div class="card mb-4 shadow-sm">
                  <img src="${comida.imagen_url}" class="card-img-top" alt="${comida.nombre}">
                  <div class="card-body">
                    <h5 class="card-title">${comida.nombre}</h5>
                    <p class="card-text">${comida.descripcion}</p>
                    <p class="card-text"><strong>Precio: $${comida.precio}</strong></p>
                    <p class="card-text">Categoría: ${comida.categoria}</p>
                    <p class="card-text">Tipo: ${comida.tipo}</p>
                    <button class="btn btn-agregar-carrito" data-nombre="${comida.nombre}" data-descripcion="${comida.descripcion}" data-precio="${comida.precio}" data-imagen_url="${comida.imagen_url}">Agregar al carrito</button>
                  </div>
                </div>
              </div>
            `;
            foodGrid.append(card);
          });
        },
        error: function(error) {
          console.error('Error al obtener las comidas:', error);
        }
      });
    }

    // Llamar a la función para cargar las comidas al cargar la página
    cargarComidas();

    // Manejar el evento click en el botón "Agregar al carrito"
    $(document).on('click', '.btn-agregar-carrito', function() {
      const nombre = $(this).data('nombre');
      const descripcion = $(this).data('descripcion');
      const precio = $(this).data('precio');
      const imagen_url = $(this).data('imagen_url');

      // Verificar si el artículo ya está en el carrito
      const articuloExistente = carrito.find(item => item.nombre === nombre);
      if (articuloExistente) {
        // Si el artículo ya está en el carrito, aumentar la cantidad
        articuloExistente.cantidad++;
      } else {
        // Si el artículo no está en el carrito, agregarlo
        carrito.push({
          nombre: nombre,
          descripcion: descripcion,
          precio: precio,
          cantidad: 1,
          imagen_url: imagen_url
        });
      }

      // Guardar el carrito en el almacenamiento local (opcional)
      guardarCarritoEnLocalStorage();

      // Actualizar el contador del carrito en la barra de navegación (opcional)
      actualizarContadorCarrito();

      // Mostrar mensaje de éxito (opcional)
      alert('¡El artículo se agregó al carrito!');
    });
  });
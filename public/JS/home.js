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

  // Función para actualizar el contador del carrito en la barra de navegación
  function actualizarContadorCarrito() {
    const contadorCarrito = $('#cart-count');
    const contadorCarritoFlotante = $('#cart-count-floating');
    let totalProductos = 0;
    carrito.forEach(item => {
      totalProductos += item.cantidad;
    });
    contadorCarrito.text(totalProductos);
    contadorCarritoFlotante.text(totalProductos);
  }  

  // Cargar inicialmente el contador del carrito al cargar la página
  actualizarContadorCarrito();

  // Función para cargar las comidas desde la base de datos
  function cargarComidas(categoria = null, tipo = null, query = null) {
    $.ajax({
      url: '/api/comidas',
      type: 'GET',
      success: function(response) {
        console.log('Comidas obtenidas:', response); // Agregar esta línea para depuración
        // Filtrar las comidas si se proporciona una categoría, tipo o consulta de búsqueda
        let filteredResponse = response;
        if (categoria || tipo) {
          filteredResponse = filteredResponse.filter(comida => {
            return (!categoria || comida.categoria === categoria) && (!tipo || comida.tipo === tipo);
          });
        }
        if (query) {
          const lowercaseQuery = query.toLowerCase();
          filteredResponse = filteredResponse.filter(comida => {
            return comida.nombre.toLowerCase().includes(lowercaseQuery);
          });
        }

        // Limpiar el grid de comidas
        const foodGrid = $('#food-grid');
        foodGrid.empty();

        // Agregar las comidas al DOM
        filteredResponse.forEach(comida => {
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

  // Manejar el evento click en los enlaces del sidebar
  $(document).on('click', '.category, .type', function(e) {
    e.preventDefault();
    const categoria = $(this).data('category');
    const tipo = $(this).data('type');
    console.log('Categoría:', categoria, 'Tipo:', tipo); // Agregar esta línea para depuración
    cargarComidas(categoria, tipo);
  });

  // Manejar el evento click en el enlace "Comidas"
  $(document).on('click', '.all-comidas', function(e) {
    e.preventDefault();
    cargarComidas();
  });

  // Manejar el evento submit del formulario de búsqueda
  $('#search-form').submit(function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe

    const query = $('#search-query').val(); // Obtener la consulta de búsqueda
    cargarComidas(null, null, query); // Llamar a la función de carga de comidas con la consulta de búsqueda
  });

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

    // Actualizar el contador del carrito en la barra de navegación
    actualizarContadorCarrito();

    // Mostrar la notificación
    $('#notification').fadeIn();

    // Ocultar la notificación después de 1 segundo
    setTimeout(function() {
      $('#notification').fadeOut();
    }, 1000);
  });

  // Controlar la visibilidad del carrito flotante en función del desplazamiento vertical
  $(window).scroll(function() {
    const scrollTop = $(window).scrollTop();
    const scrollThreshold = 56; //Pixeles para aparecer/desaparecer carrito
    const floatingCartBtn = $('#floating-cart-btn');

    if (scrollTop > scrollThreshold) {
      floatingCartBtn.fadeIn();
    } else {
      floatingCartBtn.fadeOut();
    }
  });
  

});

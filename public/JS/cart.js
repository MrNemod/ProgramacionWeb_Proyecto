$(document).ready(function() {
    // Obtener el carrito del almacenamiento local (opcional)
    let carrito = [];
    const storedCart = localStorage.getItem('carrito');
    if (storedCart) {
      carrito = JSON.parse(storedCart);
    }

    const cartItems = $('#cart-items');
    let total = 0;

    function actualizarCarrito() {
      cartItems.empty(); // Limpiar el contenido actual del carrito
      total = 0;

      carrito.forEach((item, index) => {
        const cartItem = `
          <div class="card mb-4 shadow-sm">
            <img src="/${item.imagen_url}" class="card-img-top" alt="${item.nombre}">
            <div class="card-body">
              <h5 class="card-title">${item.nombre}</h5>
              <p class="card-text">${item.descripcion}</p>
              <p class="card-text"><strong>Precio: $${item.precio}</strong></p>
              <div class="input-group mb-3">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-secondary btn-minus" type="button" ${item.cantidad === 1 ? 'disabled' : ''}>-</button>
                </div>
                <input type="number" class="form-control input-quantity" value="${item.cantidad}" min="1" max="10">
                <div class="input-group-append">
                  <button class="btn btn-outline-secondary btn-plus" type="button" ${item.cantidad === 10 ? 'disabled' : ''}>+</button>
                </div>
              </div>
              <button class="btn btn-danger btn-remove" data-index="${index}" type="button">Eliminar</button>
            </div>
          </div>
        `;
        cartItems.append(cartItem);
        total += item.precio * item.cantidad;
      });

      $('#total-amount').text(total.toFixed(2));
    }

    actualizarCarrito();

    // Evento para incrementar o decrementar la cantidad
    cartItems.on('click', '.btn-plus', function() {
      const index = $(this).closest('.card').index();
      carrito[index].cantidad++;
      actualizarCarrito();
      guardarCarritoEnLocalStorage(); // Guardar el carrito en el almacenamiento local
    });

    cartItems.on('click', '.btn-minus', function() {
      const index = $(this).closest('.card').index();
      if (carrito[index].cantidad > 1) {
        carrito[index].cantidad--;
        actualizarCarrito();
        guardarCarritoEnLocalStorage(); // Guardar el carrito en el almacenamiento local
      }
    });

    cartItems.on('change', '.input-quantity', function() {
      const index = $(this).closest('.card').index();
      const newQuantity = parseInt($(this).val());
      if (!isNaN(newQuantity) && newQuantity >= 1 && newQuantity <= 10) {
        carrito[index].cantidad = newQuantity;
        actualizarCarrito();
        guardarCarritoEnLocalStorage(); // Guardar el carrito en el almacenamiento local
      }
    });

    // Evento para eliminar un artículo del carrito
    cartItems.on('click', '.btn-remove', function() {
      const index = $(this).data('index');
      carrito.splice(index, 1);
      guardarCarritoEnLocalStorage(); // Guardar el carrito en el almacenamiento local
      actualizarCarrito();
    });

    // Función para guardar el carrito en el almacenamiento local
    function guardarCarritoEnLocalStorage() {
      localStorage.setItem('carrito', JSON.stringify(carrito));
    }
  });
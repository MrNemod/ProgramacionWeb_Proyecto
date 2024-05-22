$(document).ready(function() {
    // Manejar el envío del formulario
    $('#add-food-form').submit(function(event) {
      event.preventDefault(); // Evitar que el formulario se envíe normalmente
  
      // Obtener los valores del formulario
      const nombre = $('#nombre').val();
      const descripcion = $('#descripcion').val();
      const precio = $('#precio').val();
      const categoria = $('#categoria').val();
      const tipo = $('#tipo').val();
      const imagen_url = $('#imagen').val();
  
      // Crear el objeto de datos
      const comidaData = {
        nombre: nombre,
        descripcion: descripcion,
        precio: precio,
        categoria: categoria,
        tipo: tipo,
        imagen_url: imagen_url
      };
  
      // Realizar la solicitud AJAX para crear la comida
      $.ajax({
        type: 'POST',
        url: '/api/comidas', // Esta es la ruta de la API en tu servidor
        data: JSON.stringify(comidaData),
        contentType: 'application/json',
        success: function(response) {
          // Manejar la respuesta del servidor
          if (response.success) {
            alert('Comida creada exitosamente');
            // Redirigir a la página principal o a otra página deseada
            window.location.href = '/'; // Cambiar la URL según la estructura de tu proyecto
          } else {
            alert('Error al crear la comida');
          }
        },
        error: function(xhr, status, error) {
          // Ocurrió un error al crear la comida
          alert('Error al crear la comida');
          console.error('Error:', error); // Mensaje de consola para depuración
        }
      });
    });
  });
  
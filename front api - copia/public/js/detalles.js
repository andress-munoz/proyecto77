const url = "https://fakestoreapi.com/products";
const productosContenedor = $("#productos");
const carritoContenedor = $("#carrito tbody");
const totalContenedor = $("#total");
const modal = $("#modal");
const modalNombre = $("#modal-nombre");
const modalImagen = $("#modal-imagen");
const modalDescripcion = $("#modal-descripcion");
const modalPrecio = $("#modal-precio");
const agregarCarrito = $("#agregar-carrito");
const cantidadInput = $("#cantidad");
let carrito = [];

// Función para obtener los productos de la API
function obtenerProductos() {
  $.get(url, function (productos) {
    mostrarProductos(productos);
  });
}

// Función para mostrar los productos en el contenedor correspondiente
function mostrarProductos(productos) {
  productosContenedor.empty();
  productos.forEach(function (producto) {
    const productoDiv = $("<div>").addClass("producto");
    const productoImagen = $("<img>").attr("src", producto.image).attr("alt", producto.title);
    const productoTitulo = $("<h3>").text(producto.title);
    const productoPrecio = $("<p>").addClass("precio").text("$" + producto.price);
    const productoBoton = $("<button>").text("Ver detalles").on("click", function () {
      mostrarModal(producto);
    });
    productoDiv.append(productoImagen, productoTitulo, productoPrecio, productoBoton);
    productosContenedor.append(productoDiv);
  });
}

// Función para mostrar el modal con los detalles del producto seleccionado
function mostrarModal(producto) {
  modalNombre.text(producto.title);
  modalImagen.attr("src", producto.image).attr("alt", producto.title);
  modalDescripcion.text(producto.description);
  modalPrecio.text(producto.price);
  modal.show();
  agregarCarrito.off("click").on("click", function () {
    agregarAlCarrito(producto);
    modal.hide();
  });
}

// Función para agregar un producto al carrito
function agregarAlCarrito(producto) {
  // Verificar si el producto ya está en el carrito
  const productoExistente = carrito.find(function (p) {
    return p.id === producto.id;
  });
  if (productoExistente) {
    productoExistente.cantidad += parseInt(cantidadInput.val());
  } else {
    carrito.push({
      id: producto.id,
      nombre: producto.title,
      precio: producto.price,
      cantidad: parseInt(cantidadInput.val())
    });
  }
  // Actualizar la tabla del carrito
  actualizarCarrito();
}

// Función para actualizar la tabla del carrito
function actualizarCarrito() {
  carritoContenedor.empty();
  let total = 0;
  carrito.forEach(function (producto) {
    const subtotal = producto.cantidad * producto.precio;
    const fila = $("<tr>");
    const nombre = $("<td>").text(producto.nombre);
    const precio = $("<td>").text("$" + producto.precio);
    const cantidad = $("<td>").text(producto.cantidad);
    const subtotalTd = $("<td>").text("$" + subtotal.toFixed(2));
    const botonEliminar = $("<button>").text("Eliminar").on("click", function () {
      eliminarDelCarrito(producto.id);
    });
    fila.append(nombre, precio, cantidad, subtotalTd, botonEliminar);
    carritoContenedor.append(fila);
    total += subtotal;
  });
  totalContenedor.text("$" + total.toFixed(2));
}

// Función para eliminar un producto del carrito
function eliminarDelCarrito(id) {
  carrito = carrito.filter(function (producto) {
    return producto.id !== id;
  });
  actualizarCarrito();
}

// Cargar los productos al cargar la página
obtenerProductos();
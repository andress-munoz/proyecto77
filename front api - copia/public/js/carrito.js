
// CARRITO DE COMPRAS// CARRITO DE COMPRAS// CARRITO DE COMPRAS// CARRITO DE COMPRAS// CARRITO DE COMPRAS// CARRITO DE COMPRAS// CARRITO DE COMPRAS

function procesarPedido() {
    carritoB.forEach((prod) => {
      const contenedorCompra = document.querySelector('#contenedorCompra')
      const { id, name, precio, desc, imagen, cantidad } = prod;
      const div = document.createElement("div");
      div.innerHTML += `
            <div class="modal-contenedor">
              <div>
              <img class="img-fluid img-carrito" src="${imagen}"/>
              </div>
              <div>
              <p>Producto: ${name}</p>
            <p>Precio: ${precio}</p>
            <p>Cantidad :${cantidad}</p>
            <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
              </div>
            </div>
            
        
            `;
      contenedorCompra.appendChild(div);
      console.log(contenedorCompra);
    });
  }
  
const stockProductos = [
    {
      id: 1,
      name: "Crash Bandicoot",
      cantidad: 1,
      desc: "Juego plataformero, niveles dificiles",
      precio: 1200,
      img: "img/Crash.jpg",
    },
  ];
  let carritoB = [];
  
  const contenedor = document.querySelector("#contenedor");
  const carritoContenedor = document.querySelector("#carritoContenedor");
  const vaciarCarrito = document.querySelector("#vaciarCarrito");
  const precioTotal = document.querySelector("#precioTotal");
  const activarFuncion = document.querySelector("#activarFuncion");
  const procesarCompra = document.querySelector("#procesarCompra");
  const totalProceso = document.querySelector("#totalProceso");
  const formulario = document.querySelector('#procesar-pago')
  
  if (activarFuncion) {
    activarFuncion.addEventListener("click", procesarPedido);
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    carritoB = JSON.parse(localStorage.getItem("carrito")) || [];
  
    mostrarCarrito1();
    document.querySelector("#activarFuncion").click(procesarPedido);
  });
  if(formulario){
    formulario.addEventListener('submit', enviarCompra)
  }
  
  
  if (vaciarCarrito) {
    vaciarCarrito.addEventListener("click", () => {
      carrito.length = [];
      mostrarCarrito1();
    });
  }
  
  if (procesarCompra) {
    procesarCompra.addEventListener("click", () => {
      if (carritoB.length === 0) {
        Swal.fire({
          title: "¡Tu carrito está vacio!",
          text: "Compra algo para continuar con la compra",
          icon: "error",
          confirmButtonText: "Aceptar",
        });
      } else {
        location.href = "/compra";
      }
    });
  }
  
  stockProductos.forEach((prod) => {
    const { id, name, precio, desc, imagen, cantidad } = prod;
    if (contenedor) {
      contenedor.innerHTML += `
      <div class="card mt-3" style="width: 18rem;">
      <img class="card-img-top mt-2" src="${imagen}" alt="Card image cap">
      <div class="card-body">
        <h5 class="card-title">${name}</h5>
        <p class="card-text">Precio: ${precio}</p>
        <p class="card-text">Descripcion: ${desc}</p>
        <p class="card-text">Cantidad: ${cantidad}</p>
        <button class="btn btn-primary" onclick="agregarProducto(${id})">Comprar Producto</button>
      </div>
    </div>
      `;
    }
  });
  
  const agregarProducto = (id) => {
    const existe = carritoB.some(prod => prod.id === id)
  
    if(existe){
      const prod = carritoB.map(prod => {
        if(prod.id === id){
          prod.cantidad++
        }
      })
    } else {
      const item = stockProductos.find((prod) => prod.id === id)
      carritoB.push(item)
    }
    mostrarCarrito1()
  
  };
  
  const mostrarCarrito1 = () => {
    const modalBody = document.querySelector(".modal .modal-body");
    if (modalBody) {
      modalBody.innerHTML = "";
      carritoB.forEach((prod) => {
        const { id, name, precio, desc, imagen, cantidad } = prod;
        console.log(modalBody);
        modalBody.innerHTML += `
        <div class="modal-contenedor">
          <div style="align-items: center; display: flex; justify-content: center;">
          <img class="img-fluid img-carrito" style="width: 250px;  margin-bottom: 15px; "  src="${imagen}"/>
          </div>
          <div>
          <p><b>Producto:</b> ${name}</p>
        <p><b>Precio:</b> ${precio}</p>
        <p><b>Cantidad:</b> ${cantidad}</p>
        <button class="btn btn-danger"  onclick="eliminarProducto(${id})">Eliminar producto</button>
          </div>
        </div>
        `;
      });
    }
  
    if (carritoB.length === 0) {
      console.log("Nada");
      modalBody.innerHTML = `
      <p class="text-center text-primary parrafo">¡Aun no agregaste nada!</p>
      `;
    } else {
      console.log("Algo");
    }
    carritoContenedor.textContent = carritoB.length;
  
    if (precioTotal) {
      precioTotal.innerText = carritoB.reduce(
        (acc, prod) => acc + prod.cantidad * prod.precio,
        0
      );
    }
  
    guardarStorage();
  };
  
  function guardarStorage() {
    localStorage.setItem("carrito", JSON.stringify(carritoB));
  }
  
  function eliminarProducto(id) {
    const juegoId = id;
    carritoB = carritoB.filter((juego) => juego.id !== juegoId);
    mostrarCarrito1();
  }
  function procesarPedido() {
    carritoB.forEach((prod) => {
      const listaCompra = document.querySelector("#lista-compra tbody");
      const { id, name, precio, imagen, cantidad } = prod;
      if (listaCompra) {
        const row = document.createElement("tr");
        row.innerHTML += `
                <td>
                <img class="img-fluid img-carrito " style="max-width: 200px;" src="${imagen}"/>
                </td>
                <td>${name}</td>
              <td>${precio}</td>
              <td>${cantidad}</td>
              <td>${precio * cantidad}</td>
              `;
        listaCompra.appendChild(row);
      }
    });
    totalProceso.innerText = carritoB.reduce(
      (acc, prod) => acc + prod.cantidad * prod.precio,
      0
    );
  }
  
   function enviarCompra(e){
     e.preventDefault()
     const cliente = document.querySelector('#cliente').value
     const email = document.querySelector('#correo').value
  
     if(email === '' || cliente == ''){
       Swal.fire({
         title: "¡Debes completar tu email y name!",
         text: "Rellena el formulario",
         icon: "error",
         confirmButtonText: "Aceptar",
     })
   } else {
  
    const btn = document.getElementById('button');
  
     btn.value = 'Enviando...';
  
     const serviceID = 'default_service';
     const templateID = 'template_k63nkxm';
  
     emailjs.sendForm(serviceID, templateID, this)
      .then(() => {
        btn.value = 'Finalizar compra';
        alert('Correo enviado!');
      }, (err) => {
        btn.value = 'Finalizar compra';
        alert(JSON.stringify(err));
      });
      
     const spinner = document.querySelector('#spinner')
     spinner.classList.add('d-flex')
     spinner.classList.remove('d-none')
  
     setTimeout(() => {
       spinner.classList.remove('d-flex')
       spinner.classList.add('d-none')
       formulario.reset()
  
       const alertExito = document.createElement('p')
       alertExito.classList.add('alert', 'alerta', 'd-block', 'text-center', 'col-12', 'mt-2', 'alert-success')
       alertExito.textContent = 'Compra realizada correctamente'
       formulario.appendChild(alertExito)
  
       setTimeout(() => {
         alertExito.remove()
       }, 3000)
  
  
     }, 3000)
   }
   localStorage.clear()
  
   }



  // MODAL PRODUCTO Y AGREGAR PRODUCTO CON localStorage// MODAL PRODUCTO Y AGREGAR PRODUCTO CON localStorage// MODAL PRODUCTO Y AGREGAR PRODUCTO CON localStorage

  function mostrarModal(elemento) {
    // Obtener los datos del producto
    const id = elemento.dataset.id;
    const imagen = elemento.querySelector('img').src;
    const nombre = elemento.querySelector('h4').textContent;
    const precio = elemento.querySelector('.precio p').textContent;
    const descripcion = elemento.querySelector('.descripcion p').textContent;
    
    // Mostrar los datos en el modal
    document.querySelector('#modal-imagen').src = imagen;
    document.querySelector('#modal-nombre').textContent = nombre;
    document.querySelector('#modal-descripcion').textContent = descripcion;
    document.querySelector('#modal-precio').textContent = precio;
    
    // Mostrar el modal
    document.querySelector('#modalb').style.display = 'block';
    }
    
    document.querySelector('.modal-cerrar').addEventListener('click', () => {
    document.querySelector('#modalb').style.display = 'none';
    });
    
    window.addEventListener('click', (e) => {
    if (e.target == document.querySelector('#modalb')) {
      document.querySelector('#modalb').style.display = 'none';
    }
    });
    
    function agregarAlCarrito() {
    // Obtener datos del producto
    const name = document.querySelector('#modal-nombre').textContent;
    const precioStr = document.querySelector('#modal-precio').textContent;
    const imagen = document.querySelector('#modal-imagen').src;
    
    // Eliminar la moneda "COP" del precio
    const precio = parseFloat(precioStr.replace(/[^\d,-]/g, '').replace(',', '.'));
    
    // Construir objeto producto
    const producto = {
      name,
      precio,
      imagen,
      cantidad: 1 // Inicialmente, la cantidad es 1
    }
    
    // Obtener carrito de local storage
    let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    
    // Verificar si el producto ya está en el carrito
    const index = carrito.findIndex(p => p.name === name && p.precio === precio && p.imagen === imagen);
    
    if (index !== -1) {
      // Si el producto ya está en el carrito, aumentar la cantidad
      carrito[index].cantidad++;
    } else {
      // Si el producto no está en el carrito, agregarlo
      carrito.push(producto);
    }
    
    // Guardar carrito en local storage
    localStorage.setItem('carrito', JSON.stringify(carrito)); 
    
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: 'Producto agregado al carrito',
      showConfirmButton: false,
      timer: 1500
    }).then(function() {
      location.reload();
    });
    }



   
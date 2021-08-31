const contenedorPedidos = document.querySelector("#lista-pedidos tbody");
const subtotalHTML = document.querySelector('#subtotal');
const totalHTML = document.querySelector('#total');
let subtotal = 0;
let total = 0;
let precioUnitario = 0;

eventListeners();
function eventListeners(){
    contenedorPedidos.addEventListener("click", eliminarComida);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('pedidos')) || [];
        crearHTML();
    });
}

//Muestra el carrito de compras en el HTML
function crearHTML() {
  limpiarHTML();
  let numeracion = 1;
  //Recorre el carrito y genera el HTML
  articulosCarrito.forEach((comida) => {
      const { titulo, precio, cantidad, id } = comida;

      const precioConvertido = Number(precio.substring(1,precio.length));
      precioUnitario = precioConvertido * Number(cantidad);

      const row = document.createElement("tr");
      row.innerHTML = `
          <td>${numeracion++}</td>
          <td>${titulo}</td>
          <td>${cantidad}</td>
          <td>$${precioUnitario}</td>
          <td>
              <a href='#' class="borrar-comida" data-id="${id}">X </a>
          </td>
      `;

      //Agregar el HTML del carrito al tdoby
      contenedorPedidos.appendChild(row);

      subtotal += precioUnitario;
    });
    
  subtotalHTML.innerHTML = `$${subtotal}`;
  total = subtotal + 1 + 2.5; //Servicio: $1.00, Entrega: $2.50
  totalHTML.innerHTML = `$${total}`;
}

//Elimina un comida del carrito
function eliminarComida(e) {
  if (e.target.classList.contains("borrar-comida")) {
      const comidaId = e.target.getAttribute("data-id");

      //Elimina del arreglo por el data-id
      articulosCarrito = articulosCarrito.filter(
          (comida) => comida.id !== comidaId
      );
      localStorage.setItem('pedidos', JSON.stringify(articulosCarrito)); 
      crearHTML();
  }
}

//Elimina los comidas del tbody
function limpiarHTML() {
  subtotal = 0;
  while (contenedorPedidos.firstChild) {
      contenedorPedidos.removeChild(contenedorPedidos.firstChild);
  }
}
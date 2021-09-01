//---------Variables
const carrito = document.querySelector("#carrito");
const carritoPedidos = document.querySelector("#carrito-pedidos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const verCarritoBtn = document.querySelector("#ver-carrito");
const listaComidas = document.querySelector("#lista-comidas");
let articulosCarrito = [];

const idPedido = {
    id: Date.now()
}

cargarEventListeners();
function cargarEventListeners() {

    // Cuando agregas un comida presionando "Agregar al Carrito"
    listaComidas.addEventListener("click", agregarComida);

    //Elimina comida del carrito
    carrito.addEventListener("click", eliminarComida);

    //Vaciar el carrito
    vaciarCarritoBtn.addEventListener('click', () => {
        articulosCarrito = [];
        localStorage.setItem('pedidos', JSON.stringify(articulosCarrito)); 

        limpiarHTML(); //Eliminar todo el HTML
    });

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        articulosCarrito = JSON.parse(localStorage.getItem('pedidos')) || [];
        carritoHTML();
    });
}

//---------Funciones
//Elimina un comida del carrito
function eliminarComida(e) {
    if (e.target.classList.contains("borrar-comida")) {
        const comidaId = e.target.getAttribute("data-id");

        //Elimina del arreglo por el data-id
        articulosCarrito = articulosCarrito.filter(
            (comida) => comida.id !== comidaId
        );
        carritoHTML();
    }
}

//Agrega comida al carrito
function agregarComida(e) {
    e.preventDefault();
    if (e.target.classList.contains("agregar-carrito")) {
        const comidaSeleccionado = e.target.parentElement.parentElement;
        leerDatosComida(comidaSeleccionado);
    }

}
// Lee el contenido del HTML al que le dimos click y extrae la información del comida
function leerDatosComida(comida) {
    //Crear objeto con el contenido del comida actual
    const infoComida = {
        imagen: comida.querySelector("img").src,
        titulo: comida.querySelector("h4").textContent,
        precio: comida.querySelector(".precio span").textContent,
        id: comida.querySelector("a").getAttribute("data-id"),
        cantidad: 1,
    };

    //Revisa si un elemento ya existe en el carrito
    const existe = articulosCarrito.some((comida) => comida.id === infoComida.id);
    if (existe) {
        //Actualizamos la cantidad
        const comidas = articulosCarrito.map((comida) => {
            if (comida.id === infoComida.id) {
                comida.cantidad++;
                return comida; //Retorna el objeto actualizado
            } else {
                return comida; //Retorna los objetos que o son los duplicados
            }
        });
        articulosCarrito = [...comidas];
    } else {
        //Agrega elementos al arreglo del carrito
        articulosCarrito = [...articulosCarrito, infoComida];
    }

    carritoHTML();
}

//Muestra el carrito de compras en el HTML
function carritoHTML() {
    //Limpiar el HTML
    limpiarHTML();

    localStorage.setItem('pedidos', JSON.stringify(articulosCarrito)); 

    //Recorre el carrito y genera el HTML
    articulosCarrito.forEach((comida) => {
        const { imagen, titulo, precio, cantidad, id } = comida;
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>
                <img src = "${imagen}" width="100">
            </td>
            <td>${titulo}</td>
            <td>${precio}</td>
            <td>${cantidad}</td>
            <td>
                <a href='#' class="borrar-comida" data-id="${id}">X </a>
            </td>
        `;

        //Agregar el HTML del carrito al tdoby
        contenedorCarrito.appendChild(row);
    });
}

//Elimina los comidas del tbody
function limpiarHTML() {
    while (contenedorCarrito.firstChild) {
        contenedorCarrito.removeChild(contenedorCarrito.firstChild);
    }
}

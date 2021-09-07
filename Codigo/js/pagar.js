const btnOrdenar = document.querySelector('#btnOrdenar');

document.addEventListener('DOMContentLoaded', () => {
    let clienteGuardado = JSON.parse(localStorage.getItem('cliente'));
    let {nombreCliente, telefonoCliente, direccionCliente} = clienteGuardado;

    document.querySelector('#nombreF').textContent = nombreCliente;
    document.querySelector('#telefonoF').textContent = telefonoCliente;
    document.querySelector('#direccionF').textContent = direccionCliente;
})

btnOrdenar.addEventListener('click', e => {
    e.preventDefault();

    const fechaActual = obtenerFecha();

    let clienteGuardado = localStorage.getItem('cliente');
    let carritoGuardado = localStorage.getItem('pedidos');

    $.ajax({
        type: "POST",
        datatype: "html",
        url: "php/pagar.php",
        data: {fecha: fechaActual, cliente:clienteGuardado, carrito:carritoGuardado},
        success: function(resp){
            if(resp === "OK"){
                let url = document.URL;
                let urlGracias = url.substring(0, url.length-10);
                window.location.href = `http://localhost/Codigo/gracias.html`;
            }
        }
    });

})

function obtenerFecha() {
    const fecha = new Date();
    const anioActual = fecha.getFullYear();
    const hoy = fecha.getDate();
    const mesActual = fecha.getMonth() + 1; 

    return `${hoy}/${mesActual}/${anioActual}`;
}

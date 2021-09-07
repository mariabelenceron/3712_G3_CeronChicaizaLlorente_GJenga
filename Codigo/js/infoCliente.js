const botonEnviar = document.querySelector('#botonEnviar');
const notificacion = document.querySelector('.info-card');

let objetoCliente = {nombreCliente, telefonoCliente, direccionCliente};
let clienteGuardado;

document.addEventListener('DOMContentLoaded', () => {
    if(localStorage.getItem('cliente') !== undefined && localStorage.getItem('cliente')){
        clienteGuardado = JSON.parse(localStorage.getItem('cliente'));

        let {nombreCliente, telefonoCliente, direccionCliente} = clienteGuardado;

        document.querySelector('#nombreCliente').value = nombreCliente;
        document.querySelector('#telefonoCliente').value = telefonoCliente;
        document.querySelector('#direccionCliente').value = direccionCliente;

    }

});


function Cliente(nombreCliente, telefonoCliente, direccionCliente) {
    this.nombreCliente = nombreCliente;
    this.telefonoCliente = telefonoCliente;
    this.direccionCliente = direccionCliente;

    this.agregarCliente = function(){
        $.ajax({
            type: "POST",
            datatype: "html",
            url: "php/registro.php",
            data: {NombreCliente: this.nombreCliente, TelefonoCliente:this.telefonoCliente, DireccionCliente:this.direccionCliente},
            success: function(resp){
                if(resp){
                    const url = document.URL;
                    const urlPagar = url.substring(0, url.length-16);

                    window.location.href = `${urlPagar}pagar.html`;
                }
            }
        });
    }
}

botonEnviar.addEventListener('click', e => {
    e.preventDefault();
    
    const nombreCliente = document.querySelector('#nombreCliente').value;
    const telefonoCliente = document.querySelector('#telefonoCliente').value;
    const direccionCliente = document.querySelector('#direccionCliente').value;

    let nombreUnido = nombreCliente.replaceAll(" ","");

    if(nombreCliente === "" || telefonoCliente === "" || direccionCliente === ""){
        imprimirAlerta('Todos los campos son obligatorios','error');
        return;
    }
    if(!/^[a-zA-Z]*$/g.test(nombreUnido)){
        console.log(nombreUnido);
        imprimirAlerta('Nombre incorrecto','error');
        return;
    }
    if(!/^([0-9])*$/.test(telefonoCliente) || telefonoCliente.length < 10 || telefonoCliente.length >10){
        imprimirAlerta('Telefono incorrecto','error');
        return;
    }
    
    let cliente = new Cliente(nombreCliente, telefonoCliente, direccionCliente);
    objetoCliente = {nombreCliente,telefonoCliente,direccionCliente}

    cliente.agregarCliente();
    localStorage.setItem('cliente', JSON.stringify(objetoCliente)); 

    // formulario.reset();
    // location.reload();
});

function imprimirAlerta(mensaje, tipo){
    const divMensaje = document.createElement('div');
    divMensaje.classList.add('text-center', 'alert', 'd-block', 'col-12');

    //Agregar clase en base al tipo de error
    if(tipo === 'error'){
        divMensaje.classList.add('alert-danger');
    } else {
        divMensaje.classList.add('alert-success');
    }

    divMensaje.textContent = mensaje;

    notificacion.appendChild(divMensaje);

    setTimeout(()=>{
        divMensaje.remove();
    }, 5000);
}
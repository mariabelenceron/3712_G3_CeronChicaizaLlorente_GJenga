<?php
require("conexion.php");

$fecha = $_POST["fecha"];

//Cliente
$cliente = $_POST["cliente"];
$clienteJSON = json_decode($cliente);

$nombre = $clienteJSON->nombreCliente;
$telefono = $clienteJSON->telefonoCliente;
$direccion = $clienteJSON->direccionCliente;

$carrito = $_POST["carrito"];
$carritoJSON = json_decode($carrito);

if(empty($fecha)){
    echo "Llena todos los campos";
} else {
    //------Buscar el codigo del cliente
    $buscarIdCliente = "SELECT * FROM cliente WHERE NombreCliente='$nombre'";
    $respuestaBuscarIdCliente = mysqli_query($con, $buscarIdCliente);
    while($consulta = mysqli_fetch_array($respuestaBuscarIdCliente)){
        $codigoCliente = $consulta['CodigoCliente'];
    }

    //------Ingresar a la tabla pedido
    $ingresarPedido = "INSERT INTO pedido (Codigo_Cliente,FechaPedido) VALUES ('$codigoCliente','$fecha')";
    $respuesta = mysqli_query($con, $ingresarPedido);
    
    //------Ingresar a la tabla DetallePedido
    $ultimoIdPedido = mysqli_insert_id($con);

    foreach($carritoJSON as $producto){
        $codigoProducto = $producto->id;
        $cantidadProducto = (float)$producto->cantidad;
        $precioProducto = (float)substr($producto->precio, 1);

        $totalPedido = $cantidadProducto*$precioProducto;
        $totalDetPedido = number_format($totalPedido,0,'.','');
        $cantidadDetPedido = number_format($cantidadProducto,0,'.','');

        $ingresarPedido = "INSERT INTO detallepedido (Codigo_Pedido,Codigo_Cliente,Codigo_Producto,CantidadDetallePedido,TotalDetallePedido) VALUES ('$ultimoIdPedido','$codigoCliente','$codigoProducto','$cantidadDetPedido','$totalDetPedido')";
        $respuesta = mysqli_query($con, $ingresarPedido);

        echo "OK";
    }
}


?>

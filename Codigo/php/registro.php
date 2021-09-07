<?php
require("conexion.php");

$nombre = $_POST["NombreCliente"];
$telefono = $_POST['TelefonoCliente'];
$direccion = $_POST["DireccionCliente"];

$nombreIgual = '';

if(empty($nombre) || empty($telefono) || empty($direccion)){
    echo "Llena todos los campos";
} else{
    $buscar = "SELECT * FROM cliente WHERE NombreCliente='$nombre'";
    $respuestaBuscar = mysqli_query($con, $buscar);

    while($consulta = mysqli_fetch_array($respuestaBuscar)){
        $nombreIgual = $consulta['NombreCliente'];
    }

    
    if($nombre != $nombreIgual){
        $consulta = "INSERT INTO cliente (NombreCliente,TelefonoCliente,DireccionCliente) VALUES ('$nombre','$telefono', '$direccion')";

        $respuesta = mysqli_query($con, $consulta);

        echo "OK";
    } else {
        echo "NO";
    }

}
?>

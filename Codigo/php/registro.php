<?php
require("conexion.php");

$nombre = $_POST["nombre"];
$marca = $_POST['marca'];
$tipo = $_POST["tipo"];
$cantidad = $_POST["cantidad"];
$fecha = $_POST["fecha"];

if(empty($tipo) || empty($nombre) || empty($fecha) || empty($marca) || empty($cantidad)){
    echo "Llena todos los campos";
} else{
    $consulta = "INSERT INTO producto (nombre,marca,tipo,cantidad,fecha) VALUES ('$nombre','$marca', '$tipo','$cantidad','$fecha')";

    $respuesta = mysqli_query($con, $consulta);
    
    if($respuesta)
    {            
        echo "OK";
    }
    else
    {
        echo "NO";
    }

}
?>

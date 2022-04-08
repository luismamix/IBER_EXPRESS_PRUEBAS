<?php

require "conexion.php";

mysqli_set_charset($conexion, "utf8");

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));


 $consulta ="SELECT  *
             FROM  destinatarios dest
             WHERE dest.cod_destinatario = {$_POST['cod_destinatario']}";


$resultado= mysqli_query($conexion,$consulta) or die("Consulta fallida: ".mysqli_error($conexion));

$datos= array();

while ($fila = mysqli_fetch_assoc($resultado)) {

    array_push($datos,$fila);

}

//header y json_encode para parsear 
header('Content-type: application/json; charset=utf-8');
echo json_encode($datos);


mysqli_close($conexion);

?>
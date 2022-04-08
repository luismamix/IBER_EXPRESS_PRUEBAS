<?php

require "conexion.php";
mysqli_set_charset($conexion, "utf8");

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));

//filtra por oficina. m traigo solo algunos campos.
 $consulta ="SELECT  of.COD_OF_CITYPAQ, of.LOCALIZACION_DOMICILIO, of.LOCALIZACION_CP, of.LOCALIZACION_LOCALIDAD, of.PROVINCIA 
             FROM oficinas_citypaq of 
             WHERE of.TIPO = 'OFICINA' AND of.LOCALIZACION_CP = {$_POST['cod_postal_oficina']}";
        

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
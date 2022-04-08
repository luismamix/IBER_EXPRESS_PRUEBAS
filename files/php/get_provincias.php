<?php

require "conexion.php";

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

//traer todas las provincias
 $consulta ="SELECT DISTINCT cod_postales.provinciaid, cod_postales.provincia
             FROM cod_postales
             ORDER BY cod_postales.provincia";
        

$resultado= mysqli_query($conexion,$consulta) or die("Consulta fallida: ".mysqli_error($conexion));

$provincias= array();

while ($fila = mysqli_fetch_assoc($resultado)) {

    array_push($provincias,$fila);

}

//traer todos los municipios q tienen callejero.
$consulta = "SELECT callejero.municipio FROM `callejero` ORDER BY callejero.municipio";

$resultado= mysqli_query($conexion,$consulta) or die("Consulta fallida: ".mysqli_error($conexion));

$callejero= array();

while ($fila = mysqli_fetch_assoc($resultado)) {

    array_push($callejero,$fila);

}

$maletin[0]=$provincias;
$maletin[1]=$callejero;

//header y json_encode para parsear 
header('Content-type: application/json; charset=utf-8');
/* echo json_encode($provincias); */
echo json_encode($maletin);


mysqli_close($conexion);

?>
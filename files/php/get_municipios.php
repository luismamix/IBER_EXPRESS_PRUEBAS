<?php

require "conexion.php";

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");
       
 $consulta ="SELECT DISTINCT cod_postales.poblacion
             FROM cod_postales 
             WHERE cod_postales.provinciaid ={$_POST['provinciaid']}
             ORDER BY cod_postales.poblacion";

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
<?php

require "conexion.php";

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

//filtra por oficina o citypaq, filtra por cod postal. m traigo 9 campos.
$consulta ="SELECT  of.COD_OF_CITYPAQ, of.LOCALIZACION_DOMICILIO, of.LOCALIZACION_CP, of.LOCALIZACION_LOCALIDAD, of.PROVINCIA ,of.TIPO,of.TELEFONO,of.HORARIO, of.DESCRIPCION
            FROM oficinas_citypaq of 
            WHERE of.TIPO = {$_POST['tipo']} AND of.COD_OF_CITYPAQ = {$_POST['cod_of_citypaq']}";
        

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
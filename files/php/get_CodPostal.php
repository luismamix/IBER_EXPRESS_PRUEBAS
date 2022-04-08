<?php

require "conexion.php";

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

if(!isset($_POST['calle'])){
    //Municipio sin callejero. la calle no se recibe. filtra solo por provincia y por municipio
    $consulta ="SELECT cod_postales.cp, cod_postales.calle, cod_postales.poblacion, cod_postales.provincia
    FROM cod_postales
    WHERE cod_postales.provinciaid = {$_POST['provinciaid']} 
    AND cod_postales.poblacion= {$_POST['municipio']}";
}else{
    //Municipio con callejero. La calle se recibe. filtra por provincia, municipio y la calle.
    $consulta ="SELECT cod_postales.cp, cod_postales.calle, cod_postales.poblacion, cod_postales.provincia
    FROM cod_postales
    WHERE cod_postales.provinciaid = {$_POST['provinciaid']} 
    AND cod_postales.poblacion= {$_POST['municipio']}
    AND cod_postales.calle LIKE {$_POST['calle']}";
}
   
        
 

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
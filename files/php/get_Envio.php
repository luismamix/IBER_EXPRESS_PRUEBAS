<?php

require "conexion.php";

//$conexion = mysqli_connect("localhost","root","","iber_express_pruebas") or die ("no se pudo conectar:".mysqli_error($conexion));
mysqli_set_charset($conexion, "utf8");

//detalles del envio
 $consulta ="SELECT en.cod_envio, re.nombre 'nombre_remitente',re.apellidos 'apellidos_remitente',
                    re.razon_social 'razon_social_remitente',des.nombre 'nombre_destinatario',
                    des.apellidos 'apellidos_destinatario',des.razon_social 'razon_social_destinatario',
                    t.descripcion_envio,t.precio,t.plazo,t.zona,emba.descripcion_embal,                   
                    emba.tamanio,en.dir_recogida,en.fecha_recogida,en.tipo_recogida,en.dir_entrega,en.fecha_prevista_entrega,
                    en.tipo_entrega,en.peso
            FROM remitentes re, destinatarios des, envios en, tipos_envio t , embalajes emba
            WHERE en.cod_remitente = re.cod_remitente AND
                  en.cod_destinatario = des.cod_destinatario AND
                  en.cod_tipo_envio = t.cod_tipo_envio AND
                  en.cod_embalaje = emba.cod_embalaje AND
                  en.cod_envio = {$_POST['cod_envio']}";
        

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
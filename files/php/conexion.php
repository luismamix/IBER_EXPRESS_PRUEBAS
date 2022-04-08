<?php
    $hostname="localhost";
	$username="root";
	$password="";
	$dbname="iber_express_pruebas";
    $conexion= mysqli_connect($hostname,$username, $password,$dbname) or die("no se pudo conectar:".mysqli_error($conexion));
    
?>

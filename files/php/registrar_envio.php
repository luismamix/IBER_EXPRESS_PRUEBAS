<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN">
<html>
<head>
<title>BootStrap 4 Template</title>
  <!-- Required meta tags -->
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">

  <!-- Bootstrap CSS -->
  <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css"
    integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">

  <!-- Course CSS -->
  <link rel="stylesheet" href="../css/styles.css">

  <script src="../js/jquery-3.5.1.js"></script>
    <!--  <script src="files/js/registrar_envio.js"></script> -->
  <link rel="stylesheet" href="https://use.fontawesome.com/releases/v5.11.2/css/all.css">
</head>
<body>

    <?php

    require "conexion.php";
    require "../phpmailer/class.phpmailer.php";
    require "../phpmailer/class.smtp.php";

    //VARIABLES ERROR
    $fusibleR=true;
    $fusibleD=true;

    //VARIABLES DE PINTAR EN LA PAGINA
    $REMITENTE_INFO;
    $REMITENTE_INSERT;
    $REMITENTE_UPDATE;
    $DESTINATARIO_INFO;
    $DESTINATARIO_INSERT;
    $DESTINATARIO_UPDATE;
    $ENVIO_INSERT;
    $ENVIO_ERR;
    $EMAIL_DETALLES_ENVIO;

    //REMITENTE
    $cod_remitente = $_POST['cod_remitente'];
    $razon_social_remitente = $_POST['razon_social_remitente'];
    $dir_remitente = $_POST['dir_remitente'];
    $cod_postal_remitente = $_POST['cod_postal_remitente'];
    $municipio_remitente = $_POST['municipio_remitente'];
    $provincia_remitente = $_POST['provincia_remitente'];
    $telefono_remitente = $_POST['telefono_remitente'];
    $nombre_remitente = $_POST['nombre_remitente'];
    $apellidos_remitente = $_POST['apellidos_remitente'];
    $email_remitente = $_POST['email_remitente'];
    $ccc_remitente = $_POST['ccc_remitente'];
    $numtarjeta_remitente = $_POST['numtarjeta_remitente'];
    $tipo_remitente = $_POST['tipo_remitente'];

    //DESTINATARIO
    $cod_destinatario = $_POST['cod_destinatario'];
    $tipo_destinatario = $_POST['tipo_destinatario'];
    $razon_social_destinatario = $_POST['razon_social_destinatario'];
    $dir_destinatario=$_POST['dir_destinatario'];
    $cod_postal_destinatario = $_POST['cod_postal_destinatario'];
    $municipio_destinatario = $_POST['municipio_destinatario'];
    $provincia_destinatario = $_POST['provincia_destinatario'];
    $telefono_destinatario = $_POST['telefono_destinatario'];
    $nombre_destinatario = $_POST['nombre_destinatario'];
    $apellidos_destinatario = $_POST['apellidos_destinatario'];
    $email_destinatario = $_POST['email_destinatario'];
    $tipo_destinatario = $_POST['tipo_destinatario'];

    //RECOGIDA
    $tipo_recogida = $_POST['tipo_recogida'];
    $r_cod_of_citypaq = $_POST['r_cod_of_citypaq'];
    $dir_recogida = $_POST['dir_recogida'];
    $fecha_recogida = $_POST['fecha_recogida'];

    //ENTREGA
    $tipo_entrega = $_POST['tipo_entrega'];
    $e_cod_of_citypaq = $_POST['e_cod_of_citypaq'];
    $dir_entrega = $_POST['dir_entrega'];
    $fecha_prevista_entrega = $_POST['fecha_prevista_entrega'];

    //EMBALAJE
    $embalaje = $_POST['embalaje'];
    $cod_embalaje =$_POST['cod_embalaje'];
    $peso = $_POST['peso'];
    $cod_tipo_envio = $_POST['cod_tipo_envio'];

    //DETALLES DE ENVIO
    $detalles_envio =  array();

    function comprobar_remitenteEScte()
    {
        global $conexion;
        global $cod_remitente;
        global $REMITENTE_INFO;

        $consulta ="SELECT rem.cod_remitente 
        FROM remitentes rem 
        WHERE rem.cod_remitente = '$cod_remitente'";

        $resultado= mysqli_query($conexion, $consulta) or die("Consulta fallida: ".mysqli_error($conexion));

        if (mysqli_num_rows($resultado) > 0) {
            $REMITENTE_INFO="REMITENTE - ya es cliente :) ";
            return true;
        } else {
            return false;
        }
    }

    function comprobar_destinatarioEScte()
    {
        global $conexion;
        global $cod_destinatario;
        global $DESTINATARIO_INFO;

        $consulta ="SELECT dest.cod_destinatario 
        FROM destinatarios dest 
        WHERE dest.cod_destinatario = '$cod_destinatario'";

        $resultado= mysqli_query($conexion, $consulta) or die("Consulta fallida: ".mysqli_error($conexion));

        if (mysqli_num_rows($resultado) > 0) {
            $DESTINATARIO_INFO="DESTINATARIO - ya es cliente :) ";
            return true;
        } else {
            return false;
        }
    }

    function registrar_remitente()
    {
        global $conexion;
        global $fusibleR;

        global $cod_remitente;
        global $razon_social_remitente;
        global $dir_remitente;
        global $cod_postal_remitente;
        global $municipio_remitente;
        global $provincia_remitente;
        global $telefono_remitente;
        global $nombre_remitente;
        global $apellidos_remitente;
        global $email_remitente;
        global $ccc_remitente;
        global $numtarjeta_remitente;

        global $REMITENTE_INSERT;

        $consulta ="INSERT INTO `remitentes` (`cod_remitente`, `nombre`, `apellidos`, `razon_social`, `direccion`, 
                                              `cod_postal`, `municipio`, `provincia`, `telefono`, `email`, `num_tarjeta_credito`, 
                                              `num_cuenta_bancaria`) 
                    VALUES ('$cod_remitente', '$nombre_remitente', '$apellidos_remitente', '$razon_social_remitente', '$dir_remitente', 
                            '$cod_postal_remitente', '$municipio_remitente', '$provincia_remitente', '$telefono_remitente', '$email_remitente', 
                            '$numtarjeta_remitente', '$ccc_remitente')";

        if (mysqli_query($conexion, $consulta)) {
            $REMITENTE_INSERT="REMITENTE - insertado :) ";
        } else {
            $REMITENTE_INSERT="REMITENTE - Consulta INSERTAR fallida :(  ".mysqli_error($conexion);
            $fusibleR=false;
        }
    }

    function modificar_remitente()
    {
        global $conexion;

        global $cod_remitente;
        global $razon_social_remitente;
        global $dir_remitente;
        global $cod_postal_remitente;
        global $municipio_remitente;
        global $provincia_remitente;
        global $telefono_remitente;
        global $nombre_remitente;
        global $apellidos_remitente;
        global $email_remitente;
        global $ccc_remitente;
        global $numtarjeta_remitente;

        global $REMITENTE_UPDATE;
        $consulta = "UPDATE `remitentes` 
                     SET `nombre`= '$nombre_remitente',
                         `apellidos`='$apellidos_remitente',
                         `razon_social`='$razon_social_remitente',
                         `direccion`='$dir_remitente',
                         `cod_postal`='$cod_postal_remitente',
                         `municipio`='$municipio_remitente',
                         `provincia`='$provincia_remitente',
                         `telefono`='$telefono_remitente',
                         `email`='$email_remitente',
                         `num_tarjeta_credito`='$numtarjeta_remitente',
                         `num_cuenta_bancaria`='$ccc_remitente' 
                    WHERE cod_remitente ='$cod_remitente'";
        
        if (mysqli_query($conexion, $consulta)) {
            $REMITENTE_UPDATE="REMITENTE - modificado :) ";
        } else {
            $REMITENTE_UPDATE="REMITENTE - Consulta MODIFICAR fallida :(  ".mysqli_error($conexion);
        }
    }

    function registrar_destinatario()
    {
        global $conexion;
        global $fusibleD;

        global $cod_destinatario;
        global $tipo_destinatario;
        global $razon_social_destinatario;
        global $dir_destinatario;
        global $cod_postal_destinatario;
        global $municipio_destinatario;
        global $provincia_destinatario;
        global $telefono_destinatario;
        global $nombre_destinatario;
        global $apellidos_destinatario;
        global $email_destinatario;

        global $DESTINATARIO_INSERT;
        

        $consulta ="INSERT INTO `destinatarios`(`cod_destinatario`, `nombre`, `apellidos`, `razon_social`, `direccion`, 
                                `cod_postal`, `municipio`, `provincia`, `telefono`, `email`) 
                    VALUES ('$cod_destinatario','$nombre_destinatario','$apellidos_destinatario','$razon_social_destinatario','$dir_destinatario',
                            '$cod_postal_destinatario','$municipio_destinatario','$provincia_destinatario','$telefono_destinatario','$email_destinatario')";

        if (mysqli_query($conexion, $consulta)) {
            $DESTINATARIO_INSERT = "DESTINATARIO - insertado :) ";
        } else {
            $DESTINATARIO_INSERT = "DESTINATARIO - Consulta INSERTAR fallida :(  ".mysqli_error($conexion);
            $fusibleD=false;
        }
    }

    function modificar_destinatario()
    {
        global $conexion;

        global $cod_destinatario;
        global $tipo_destinatario;
        global $razon_social_destinatario;
        global $dir_destinatario;
        global $cod_postal_destinatario;
        global $municipio_destinatario;
        global $provincia_destinatario;
        global $telefono_destinatario;
        global $nombre_destinatario;
        global $apellidos_destinatario;
        global $email_destinatario;

        global  $DESTINATARIO_UPDATE;

        $consulta="UPDATE `destinatarios` 
                   SET `cod_destinatario`='$cod_destinatario',
                       `nombre`='$nombre_destinatario',
                       `apellidos`='$apellidos_destinatario',
                       `razon_social`='$razon_social_destinatario',
                       `direccion`='$dir_destinatario',
                       `cod_postal`='$cod_postal_destinatario',
                       `municipio`='$municipio_destinatario',
                       `provincia`='$provincia_destinatario',
                       `telefono`='$telefono_destinatario',
                       `email`='$email_destinatario' 
                    WHERE cod_destinatario = '$cod_destinatario'";

        if (mysqli_query($conexion, $consulta)) {
            $DESTINATARIO_UPDATE = "DESTINATARIO - modificado :) ";
        } else {
            $DESTINATARIO_UPDATE = "DESTINATARIO - Consulta MODIFICAR fallida :(  ".mysqli_error($conexion);
        }
    }

    function registrar_envio()
    {
        global $conexion;

        global $cod_remitente;
        global $cod_destinatario;
        global $cod_tipo_envio;
        global $cod_embalaje;
        global $tipo_recogida;
        global $dir_recogida;
        global $fecha_recogida;
        global $tipo_entrega;
        global $dir_entrega;
        global $fecha_prevista_entrega;
        global  $peso;

        global $ENVIO_INSERT;

        $consulta= "INSERT INTO `envios`(`cod_remitente`, `cod_destinatario`, `cod_tipo_envio`, `cod_embalaje`, `tipo_recogida`, 
                                `dir_recogida`, `fecha_recogida`, `tipo_entrega`, `dir_entrega`, `fecha_prevista_entrega`, `peso`) 
                    VALUES ('$cod_remitente','$cod_destinatario','$cod_tipo_envio','$cod_embalaje','$tipo_recogida',
                            '$dir_recogida','$fecha_recogida','$tipo_entrega',' $dir_entrega','$fecha_prevista_entrega',$peso)";

        if (mysqli_query($conexion, $consulta)) {
            $ENVIO_INSERT="ENVIO - insertado :) ";
        } else {
            $ENVIO_INSERT="ENVIO - Consulta INSERTAR fallida :(  ".mysqli_error($conexion);
        }
    }

    function consultar_detalles_envio()
    {
        global $detalles_envio;
        global $conexion;

        $consulta= "SELECT en.cod_envio, re.nombre 'nombre_remitente',re.apellidos 'apellidos_remitente' ,re.razon_social 'razon_social_remitente',des.nombre 'nombre_destinatario',
                    des.apellidos 'apellidos_destinatario',des.razon_social 'razon_social_destinatario',t.descripcion_envio,t.precio,t.plazo,t.zona,emba.descripcion_embal,
                    emba.tamanio,en.dir_recogida,en.fecha_recogida,en.tipo_recogida,en.dir_entrega,en.fecha_prevista_entrega,en.tipo_entrega,en.peso
                    FROM remitentes re, destinatarios des, envios en, tipos_envio t , embalajes emba
                    WHERE en.cod_remitente = re.cod_remitente AND
                    en.cod_destinatario = des.cod_destinatario AND
                    en.cod_tipo_envio = t.cod_tipo_envio AND
                    en.cod_embalaje = emba.cod_embalaje
                    ORDER BY  cod_envio DESC LIMIT 1";

        $resultado= mysqli_query($conexion, $consulta) or die("Consulta fallida: ".mysqli_error($conexion));

        $fila = mysqli_fetch_assoc($resultado);
        array_push($detalles_envio, $fila);
    }

    function enviar_email_detalles_envio()
    {
        global $tipo_remitente;
        global $email_remitente;
        global $EMAIL_DETALLES_ENVIO;
        global $detalles_envio;

        $email_user = "luisma.mix@gmail.com";
        $email_password = "funkycold33";
        // $address_to = $email_remitente;
        $address_to = 'luis.alberquilla@educa.madrid.org';
        $from_name = "Info-Envío Iber_Express";
        $the_subject = "Iber_Express - PEDIDO # ".$detalles_envio[0]['cod_envio'];
        $phpmailer = new PHPMailer();

        // ---------- datos de la cuenta de Gmail -------------------------------
        $phpmailer->Username = $email_user;
        $phpmailer->Password = $email_password;
        //------------variables de depuracioN------------------------------------
         //------------Descomentar para ver los errores, Ej. No puede conectar con servidor SMTP------------------------------------
        //$phpmailer->SMTPDebug = 1;
        //$phpmailer->SMTPDebug = SMTP::DEBUG_SERVER;
        //------------conectar al SMTP de GMAIL----------------------------------
        $phpmailer->SMTPSecure = 'ssl';//'tls';
        $phpmailer->Host = "smtp.gmail.com"; // GMail
        $phpmailer->Port = 465;//587
        $phpmailer->IsSMTP(); // use SMTP
        $phpmailer->SMTPAuth = true;
        $phpmailer->SMTPOptions = array(
            'ssl' => array(
                'verify_peer' => false,
                'verify_peer_name' => false,
                'allow_self_signed' => true
            	)
            );
        $phpmailer->setFrom($phpmailer->Username, $from_name);
        $phpmailer->AddAddress($address_to); // recipients email
        $phpmailer->Subject = $the_subject;
        $phpmailer->IsHTML(true);
        $phpmailer->CharSet = "utf-8";
         //-----------usamos una plantilla html para el cuerpo del correo--------- 
         //-----------remplazamos todas las cadenas entre %cadena% por el campo a pintar---------
        $email_template;
        $message;
            if($tipo_remitente == 'particular'){
                $email_template = '../phpmailer/plantilla_email_particulares.html';
                $message = file_get_contents($email_template);
                $message = str_replace('%nombre_remitente%', $detalles_envio[0]['nombre_remitente'], $message);
                $message = str_replace('%apellidos_remitente%', $detalles_envio[0]['apellidos_remitente'], $message);
            }else if($tipo_remitente == 'empresa'){
                $email_template = '../phpmailer/plantilla_email_empresa.html';
                $message = file_get_contents($email_template);
                $message = str_replace('%razon_social_remitente%', $detalles_envio[0]['razon_social_remitente'], $message);
            }
        $message = str_replace('%nombre_destinatario%', $detalles_envio[0]['nombre_destinatario'], $message);
        $message = str_replace('%apellidos_destinatario%', $detalles_envio[0]['apellidos_destinatario'], $message);
        $message = str_replace('%razon_social_destinatario%', $detalles_envio[0]['razon_social_destinatario'], $message);
        $message = str_replace('%dir_recogida%', $detalles_envio[0]['dir_recogida'], $message);
        $message = str_replace('%fecha_recogida%', $detalles_envio[0]['fecha_recogida'], $message);
        $message = str_replace('%tipo_recogida%', $detalles_envio[0]['tipo_recogida'], $message);
        $message = str_replace('%dir_entrega%', $detalles_envio[0]['dir_entrega'], $message);
        $message = str_replace('%fecha_prevista_entrega%', $detalles_envio[0]['fecha_prevista_entrega'], $message);
        $message = str_replace('%tipo_entrega%', $detalles_envio[0]['tipo_entrega'], $message);
        $message = str_replace('%cod_envio%', $detalles_envio[0]['cod_envio'], $message);
        $message = str_replace('%descripcion_envio%', $detalles_envio[0]['descripcion_envio'], $message);
        $message = str_replace('%plazo%', $detalles_envio[0]['plazo'], $message);
        $message = str_replace('%zona%', $detalles_envio[0]['zona'], $message);
        $message = str_replace('%precio%', $detalles_envio[0]['precio'], $message);
        $message = str_replace('%descripcion_embal%', $detalles_envio[0]['descripcion_embal'], $message);
        $message = str_replace('%tamanio%', $detalles_envio[0]['tamanio'], $message);
        $message = str_replace('%peso%', $detalles_envio[0]['peso'], $message);
        $phpmailer->MsgHTML($message);
        

        if( $phpmailer->Send()){
            $EMAIL_DETALLES_ENVIO = "EMAIL DETALLE - Enviado! :)";
        }else{
            $EMAIL_DETALLES_ENVIO = "EMAIL DETALLE - Error al enviar el email :( : $phpmailer->ErrorInfo";
        }
           
    }

    //CONEXION
    //$conexion = mysqli_connect("localhost", "root", "", "iber_express_pruebas") or die("no se pudo conectar:".mysqli_error($conexion));
    
    //caracteres especiales como acentos, eñes
    mysqli_set_charset($conexion, "utf8");

    //VALIDACION REMITENTE
    if (!isset($_POST['remitenteEScte'])) {
        if (!comprobar_remitenteEScte()) {
            registrar_remitente();
        }
    } elseif (isset($_POST['remitenteEScte']) && !isset($_POST['modificardatosrte'])) {
        $REMITENTE_INFO="REMITENTE - ya es cliente :) ";
    } elseif (isset($_POST['remitenteEScte']) && isset($_POST['modificardatosrte'])) {
        modificar_remitente();
    }

    //VALIDACION DESTINATARIO
    if (!isset($_POST['destinatarioEScte'])) {
        if (!comprobar_destinatarioEScte()) {
            registrar_destinatario();
        }
    } elseif (isset($_POST['destinatarioEScte']) && !isset($_POST['modificardatosdest'])) {
        $DESTINATARIO_INFO="DESTINATARIO - ya es cliente :) ";
    } elseif (isset($_POST['destinatarioEScte']) && isset($_POST['modificardatosdest'])) {
        modificar_destinatario();
    }
 
    //VALIDACION ENVIO
    if ($fusibleR && $fusibleD) {
        registrar_envio();
        consultar_detalles_envio();
        enviar_email_detalles_envio();
    } else {
        $ENVIO_ERR="ENVIO - Error: NO se ha podido registrar el envio. :( ";

        if (!$fusibleR) {
            $ENVIO_ERR .= "<br> ENVIO - Error: REMITENTE no existe. :( ";
        }
        

        if (!$fusibleD) {
            $ENVIO_ERR .= "<br> ENVIO - Error: DESTINATARIO no existe. :( ";
        }
    }

    //echo "<h4>fusibleR: $fusibleR</h4>";
    //echo "<h4>fusibleD: $fusibleD</h4>";

    //CERRAR CONEX
    mysqli_close($conexion);

    ?>
  
    <!-- construir la pagina n html -->
    <div class="container">

        <!--  INFO ENVIO -->
        <div class="row">
            <div class="col d-flex align-items-center justify-content-center">

                <div class="alert alert-info">
                    <strong>Info envío!</strong><br>
                    <span id="div_info_envio"></span>
                </div>
                
            </div>
        </div>

        <!--  TITULO ENVIO -->
        <div class="row marginleft-10 marginright-10">
            <div class="col d-flex align-items-center justify-content-center">
            <i style="font-size:34px;" class="fas fa-info-circle text-dark mb-2 mr-3"></i>
            <h2 class="text-dark">Datos del envío</h2>
            </div>
        </div>
      
          <!-- DATOS ENVIO -->
        <!--   el estilo de la página cambia dependiendo si remitente es particular o empresa. las clases css de los estilos se crean dinamicamente. -->
        <div id="div_datos_envio" class="row border border-5 rounded">
            <div class="col m-3">

                <div id="fila_1" class="row ">
                    <div class="col-md-6 mt-md-3">
                        <p class="h5 text-campos-custom"><u>Remitente</u></p>
                        <ul class="list-unstyled">
                        <li id="li_nombre_remitente"><span class="text-campos-custom"><strong>Nombre: </strong></span><span class="text-detalles-custom" id="nombre_remitente"></span></li>
                        <li id="li_apellidos_remitente"><span class="text-campos-custom"><strong>Apellidos: </strong></span><span class="text-detalles-custom" id="apellidos_remitente"></span></li>
                        <li id="li_razon_social_remitente"><span class="text-campos-custom"><strong>Razón social: </strong></span><span class="text-detalles-custom" id="razon_social_remitente"></span></li>
                        </ul>
                    </div>
                    <div class="col-md-6 mt-md-3">
                        <p class="h5 text-campos-custom"><u>Destinatario</u></p>
                        <ul class="list-unstyled"> 
                        <li id="li_nombre_destinatario"><span class="text-campos-custom"><strong>Nombre: </strong></span><span class="text-detalles-custom" id="nombre_destinatario"></span></li>
                        <li id="li_apellidos_destinatario"><span class="text-campos-custom"><strong>Apellidos: </strong></span><span class="text-detalles-custom" id="apellidos_destinatario"></span></li>
                        <li id="li_razon_social_destinatario"><span class="text-campos-custom"><strong>Razón social: </strong></span><span class="text-detalles-custom" id="razon_social_destinatario"></span></li>
                        </ul>
                    </div>
                    </div>

                    <div id="fila_2" class="row ">
                    <div class="col-md-6 mt-md-3">
                        <p class="h5 text-campos-custom"><u>Recogida</u></p>
                        <ul class="list-unstyled">
                        <li><span class="text-campos-custom"><strong>Dirección: </strong></span><span class="text-detalles-custom" id="dir_recogida"></span></li>
                        <li><span class="text-campos-custom"><strong>Fecha: </strong></span><span class="text-detalles-custom" id="fecha_recogida"></span></li>
                        <li><span class="text-campos-custom"><strong>Tipo: </strong></span><span class="text-detalles-custom" id="tipo_recogida"></span></li>
                        <li id="li_r_cod_of_citypaq"><span class="text-campos-custom"><strong>Cod_Of_Citypaq: </strong></span><span class="text-detalles-custom" id="r_cod_of_citypaq"></span></li>
                        </ul>
                    </div>
                    <div class="col-md-6 mt-md-3">
                        <p class="h5 text-campos-custom"><u>Entrega</u></p>
                        <ul class="list-unstyled">
                        <li><span class="text-campos-custom"><strong>Dirección: </strong></span><span class="text-detalles-custom" id="dir_entrega"></span></li>
                        <li><span class="text-campos-custom"><strong>Fecha prevista entrega: </strong></span><span class="text-detalles-custom" id="fecha_prevista_entrega"></span></li>
                        <li><span class="text-campos-custom"><strong>Tipo: </strong></span><span class="text-detalles-custom" id="tipo_entrega"></span></li>
                        <li id="li_e_cod_of_citypaq"><span class="text-campos-custom"><strong>Cod_Of_Citypaq: </strong></span><span class="text-detalles-custom" id="e_cod_of_citypaq"></span></li>
                        </ul>
                    </div>
                </div>

                <div id="fila_3" class="row">
                    <div class="col-md-6 mt-md-3">
                        <p class="h5 text-campos-custom"><u>Envío</u></p>
                        <ul class="list-unstyled">
                        <li><span class="text-campos-custom"><strong>Cod. envío: </strong></span><span class="text-detalles-custom" id="cod_envio"></span></li>
                        <li><span class="text-campos-custom"><strong>Descripción: </strong></span><span class="text-detalles-custom" id="descripcion_envio"></span></li>
                        <li><span class="text-campos-custom"><strong>Plazo: </strong></span><span class="text-detalles-custom" id="plazo"></span></li>
                        <li><span class="text-campos-custom"><strong>Zona: </strong></span><span class="text-detalles-custom" id="zona"></span></li>
                        <li><span class="text-campos-custom"><strong>Precio: </strong></span><span class="text-detalles-custom" id="precio"></span></li>
                        </ul>
                    </div>
                    <div class="col-md-6 mt-md-3">
                        <p class="h5 text-campos-custom"><u>Embalaje</u></p>
                        <ul class="list-unstyled">
                        <li><span class="text-campos-custom"><strong>Descripción: </strong></span><span class="text-detalles-custom" id="descripcion_embalaje"></span></li>
                        <li><span class="text-campos-custom"><strong>Tamaño: </strong></span><span class="text-detalles-custom" id="tamaño"></span></li>
                        <li><span class="text-campos-custom"><strong>Peso: </strong></span><span class="text-detalles-custom" id="peso"></span> </li>
                        </ul>
                    </div>
                </div>

            </div>
        </div>

        <!--  LINK INDEX -->
        <div class="row marginleft-10 marginright-10">
            <div class="col-md-6 mt-md-3 d-flex align-items-center justify-content-start">
                <a id="volveralindex" href="">
                <h5>Volver al Index</h5>
                </a>
              
            </div>
            <!-- <div class="col-md-6 mt-md-3 d-flex align-items-center justify-content-start">
                <p class="h5 text-green">Recibirá un mail con los detalles del pedido.</p>
            </div> -->
        </div>

        <div class="row marginleft-10 marginright-10">
            <div class="col-md-6 mt-md-3 d-flex align-items-center justify-content-start">
             
              <span id="debug"></span>
            </div>
            <!-- <div class="col-md-6 mt-md-3 d-flex align-items-center justify-content-start">
                <p class="h5 text-green">Recibirá un mail con los detalles del pedido.</p>
            </div> -->
        </div>
        
    </div>

     <!-- CODIGO JAVASCRIPT -->
     <script type="text/javascript">
        let infoenvio = "<?php
                            if (isset($REMITENTE_INFO)) {
                                echo $REMITENTE_INFO.'<br>';
                            }

                            if (isset($REMITENTE_INSERT)) {
                                echo $REMITENTE_INSERT.'<br>';
                            }

                            if (isset($REMITENTE_UPDATE)) {
                                echo $REMITENTE_UPDATE.'<br>';
                            }

                            if (isset($DESTINATARIO_INFO)) {
                                echo $DESTINATARIO_INFO.'<br>';
                            }

                            if (isset($DESTINATARIO_INSERT)) {
                                echo $DESTINATARIO_INSERT.'<br>';
                            }

                            if (isset($DESTINATARIO_UPDATE)) {
                                echo $DESTINATARIO_UPDATE.'<br>';
                            }

                            if (isset($ENVIO_INSERT)) {
                                echo $ENVIO_INSERT.'<br>';
                            }
                           
                            if (isset($ENVIO_ERR)) {
                                echo $ENVIO_ERR.'<br>';
                            }

                            if (isset($EMAIL_DETALLES_ENVIO)) {
                                echo $EMAIL_DETALLES_ENVIO.'<br>';
                            }
                        ?>";
        /*  pintar info envio  */       
        $('#div_info_envio').html(infoenvio);
        

       /*  pintar detalles envio */
       //resultado de la consulta
        let detalles_envio = <?php echo json_encode($detalles_envio)?>;
        console.log(detalles_envio);
        //datos del $_POST
        let r_cod_of_citypaq = "<?php echo $r_cod_of_citypaq ?>";
        let e_cod_of_citypaq = "<?php echo $e_cod_of_citypaq ?>";
        let tipo_remitente = "<?php echo $tipo_remitente ?>";
        let tipo_destinatario = "<?php echo $tipo_destinatario ?>";

        if (tipo_remitente == 'particular'){
            //cambiar estilo de la página
            $("#div_datos_envio").addClass("border-particulares");
            $("#div_datos_envio").addClass("bg-general");
            $('.text-campos-custom').css('color', '#c6ff00');
            $('.text-detalles-custom').css('color', 'white');
            //mostrar / ocultar cajas. cargar detalles envio en las cajas.
            $('#li_razon_social_remitente').hide();
            $('#nombre_remitente').html(detalles_envio[0].nombre_remitente);
            $('#apellidos_remitente').html(detalles_envio[0].apellidos_remitente);
            $('#li_nombre_remitente').show();
            $('#li_apellidos_remitente').show();
            //cambiar el link de volver al index
            $('#volveralindex').prop('href','../../particular/index_particular.html');

        } else if(tipo_remitente == 'empresa'){
            //cambiar estilo de la página
            $("#div_datos_envio").addClass("border-empresas");
            $("#div_datos_envio").addClass("bg-lima-invertido");
            $('#fila_1').addClass("bg-striped");
            $('#fila_3').addClass("bg-striped");
            $('.text-campos-custom').css('color', '#2e2e2e');
            $('.text-detalles-custom').css('color', '#2e2e2e');
             //mostrar / ocultar cajas. cargar detalles envio en las cajas.
            $('#li_nombre_remitente').hide();
            $('#li_apellidos_remitente').hide();
            $('#razon_social_remitente').html(detalles_envio[0].razon_social_remitente);
            $('#li_razon_social_remitente').show();
            //cambiar el link de volver al index
            $('#volveralindex').prop('href','../../empresa/index_empresa.html');
        }

         //mostrar / ocultar cajas. cargar detalles envio en las cajas.
        if(tipo_destinatario == 'particular'){
            $('#li_razon_social_destinatario').hide();
            $('#nombre_destinatario').html(detalles_envio[0].nombre_destinatario);
            $('#apellidos_destinatario').html(detalles_envio[0].apellidos_destinatario);
            $('#li_nombre_destinatario').show();
            $('#li_apellidos_destinatario').show();
        }else if(tipo_destinatario == 'empresa'){
            $('#li_nombre_destinatario').hide();
            $('#li_apellidos_destinatario').hide();
            $('#razon_social_destinatario').html(detalles_envio[0].razon_social_destinatario);
            $('#li_razon_social_destinatario').show();
        }

         //mostrar / ocultar cajas. cargar detalles envio en las cajas.
        $('#dir_recogida').html(detalles_envio[0].dir_recogida);
        //formatear fecha_recogida
        let frecogida = new Date(detalles_envio[0].fecha_recogida);
        $('#fecha_recogida').html(frecogida.toLocaleString());
        $('#tipo_recogida').html(detalles_envio[0].tipo_recogida);
        //mostrar o ocultar el cod_of_citypaq
        if(detalles_envio[0].tipo_recogida != 'domicilio_remitente'){
            $('#r_cod_of_citypaq').html(r_cod_of_citypaq);
            $('#li_r_cod_of_citypaq').show();
        }else{
            $('#li_r_cod_of_citypaq').hide();
        }

         //mostrar / ocultar cajas. cargar detalles envio en las cajas.
        $('#dir_entrega').html(detalles_envio[0].dir_entrega);
         //formatear fecha_entrega
        let fentrega = new Date(detalles_envio[0].fecha_prevista_entrega);
        $('#fecha_prevista_entrega').html(fentrega.toLocaleString());
        $('#tipo_entrega').html(detalles_envio[0].tipo_entrega);
        //mostrar o ocultar el cod_of_citypaq
        if(detalles_envio[0].tipo_entrega != 'domicilio_destinatario'){
            $('#e_cod_of_citypaq').html(e_cod_of_citypaq);
            $('#li_e_cod_of_citypaq').show();
        }else{
            $('#li_e_cod_of_citypaq').hide();
        }

         //mostrar / ocultar cajas. cargar detalles envio en las cajas.
        $('#cod_envio').html(detalles_envio[0].cod_envio);
        $('#descripcion_envio').html(detalles_envio[0].descripcion_envio);
        $('#plazo').html(detalles_envio[0].plazo);
        $('#zona').html(detalles_envio[0].zona);
        $('#precio').html(detalles_envio[0].precio + " €");

        $('#descripcion_embalaje').html(detalles_envio[0].descripcion_embal);
        $('#tamaño').html(detalles_envio[0].tamanio);
        $('#peso').html(detalles_envio[0].peso + " kg"); 

       

    </script>

     <!-- Optional JavaScript -->
  <!-- jQuery first, then Popper.js, then Bootstrap JS -->
  <!-- esta libreria peta. no reconoce el $()-->
  <!-- <script src="https://code.jquery.com/jquery-3.2.1.slim.min.js" integrity="sha384-KJ3o2DKtIkvYIK3UENzmM7KCkRr/rE9/Qpg6aAZGJwFDMVNA/GpGFF93hXpG5KkN" crossorigin="anonymous"></script> -->
  <script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.3/umd/popper.min.js"
    integrity="sha384-vFJXuSJphROIrBnz7yo7oB41mKfc8JzQZiCq4NCceLEaO4IHwicKwpJf9c9IpFgh"
    crossorigin="anonymous"></script>
  <script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/js/bootstrap.min.js"
    integrity="sha384-alpBpkh1PFOepccYVYDB4do5UnbKysX5WZXm3XxPqe5iKTfUKjNkCk9SaVuEZflJ"
    crossorigin="anonymous"></script>

</body>
</html>
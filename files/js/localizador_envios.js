window.addEventListener('load', init);

function init() {

    esconder_Cajas();

    $('#buscar').click(function (e) {

        esconder_Cajas();
        limpiar_campos();

        if (validar_Cod_Envio()) {

            let cod_envio = $('#cod_envio').val();
            $.ajax({
                type: "POST",
                //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_Envio.php",
                url: "../files/php/get_Envio.php",
                data: { 'cod_envio':  cod_envio},
                dataType: "json",
                success: function (response) {
                    console.log(response);
                    if(response.length > 0){
                        console.log(response[0].cod_envio);
                        $('#nombre_remitente').html(response[0].nombre_remitente);
                        $('#apellidos_remitente').html(response[0].apellidos_remitente);
                        $('#razon_social_remitente').html(response[0].razon_social_remitente);

                        $('#nombre_destinatario').html(response[0].nombre_destinatario);
                        $('#apellidos_destinatario').html(response[0].apellidos_destinatario);
                        $('#razon_social_destinatario').html(response[0].razon_social_destinatario);

                        $('#dir_recogida').html(response[0].dir_recogida);
                        let frecogida = new Date(response[0].fecha_recogida);
                        $('#fecha_recogida').html(frecogida.toLocaleString());
                        $('#tipo_recogida').html(response[0].tipo_recogida);

                        $('#dir_entrega').html(response[0].dir_entrega);
                        let fpreventrega = new Date(response[0].fecha_prevista_entrega);
                        $('#fecha_prevista_entrega').html(fpreventrega.toLocaleString());
                        $('#tipo_entrega').html(response[0].tipo_entrega);

                        $('#cod_envio_detalle').html(response[0].cod_envio);
                        $('#descripcion_envio').html(response[0].descripcion_envio);
                        $('#plazo').html(response[0].plazo);
                        $('#zona').html(response[0].zona);
                        $('#precio').html(response[0].precio + " €");

                        $('#descripcion_embalaje').html(response[0].descripcion_embal);
                        $('#tamaño').html(response[0].tamanio);
                        $('#peso').html(response[0].peso + " kg");

                        //mostrar detalles envio
                        $('#div_titulo2').show();
                        $('#div_datos_envio').show();
                    }else{
                        $('#div_err').html('<strong>Info: </strong> No se encontraron resultados.');
                        $('#div_err').show();
                    }
                },
                error: function (resultado, estado, error) {
                    console.log(resultado);
                    console.log(estado);
                    console.log(error);
                }
            });

        } else {
            $('#div_err').html('<strong>Alerta! </strong> introduce un número entero');
            $('#div_err').show();
        }

    });

}//FIN init

//FUNCIONES
function esconder_Cajas() {
    $('#div_titulo2').hide();
    $('#div_datos_envio').hide();
    $('#div_err').hide();
}
function limpiar_campos(){
    $('#nombre_remitente').html('');
    $('#apellidos_remitente').html('');
    $('#razon_social_remitente').html('');

    $('#nombre_destinatario').html('');
    $('#apellidos_destinatario').html('');
    $('#razon_social_destinatario').html('');

    $('#dir_recogida').html('');
    $('#fecha_recogida').html('');
    $('#tipo_recogida').html('');

    $('#dir_entrega').html('');
    $('#fecha_prevista_entrega').html('');
    $('#tipo_entrega').html('');

    $('#cod_envio').html('');
    $('#descripcion_envio').html('');
    $('#plazo').html('');
    $('#zona').html('');
    $('#precio').html('');

    $('#descripcion_embal').html('');
    $('#tamaño').html('');
    $('#peso').html('');
}
//VALIDACIONES
function validar_Cod_Envio() {
    let cod_envio = $('#cod_envio').val();
    //solo digitos sin decimales, del 1 - 99999
    let matches = cod_envio.match(/^[1-9][0-9]?[0-9]?[0-9]?[0-9]?$/);

    if (matches != null) {
        return true;
    } else {
        return false;
    }

}

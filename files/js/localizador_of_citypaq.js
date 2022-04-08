window.addEventListener('load', init);

function init() {
    esconder_Cajas();

    $('#buscar').click(function (e) {

        //esconder tabla resultado y detalles Oficina / citypaq
        $('#div_l_tabla_resultado_busqueda').hide();
        $('#div_r_titulo2').hide();
        $('#div_detalles').hide();

        if (validar_Entrada()) {
            $('#div_err').html('');
            $('#div_err').hide();
            let entrada = "'" + $('#entrada').val() + "'";
            let tipo = document.getElementById('tipo');
            let buscarpor = document.getElementById('buscarpor');
            if (buscarpor.value == 'cod_postal') {
                $.ajax({
                    type: "POST",
                    //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_tipo_buscarpor_codpostal.php",
                    url: "../files/php/get_tipo_buscarpor_codpostal.php",
                    data: { 'tipo': "'" + tipo.value + "'", 'cod_postal': entrada },
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                        if(response.length >0){
                            let i = 1;
                            let cadena="";
                            for(item of response){
                                cadena += "<tr>"
                                + "<td id=l_c" + i + "1>" + item.COD_OF_CITYPAQ + "</td>"
                                + "<td id=l_c" + i + "2>" + item.LOCALIZACION_DOMICILIO + "</td>"
                                + "<td id=l_c" + i + "3>" + item.LOCALIZACION_CP + "</td>"
                                + "<td id=l_c" + i + "4>" + item.LOCALIZACION_LOCALIDAD + "</td>"
                                + "<td id=l_c" + i + "5>" + item.PROVINCIA + "</td>"
                                + "<td id=l_c" + i + "6>" + item.TIPO + "</td>"
                                + "<td id=l_c" + i + "7>" + item.TELEFONO + "</td>"
                                + "<td id=l_c" + i + "8>" + item.HORARIO + "</td>"
                                + "<td id=l_c" + i + "9>" + item.DESCRIPCION + "</td>"
                                + "<td id=l_c" + i + "10><button id='a" + i + "' type='button' class='btn btn-lima cargar' >Cargar</button>"
                                + "</tr>";
                                i++;
                            }
                            $('#l_tabla_tbody_filas').html(cadena);
                            $('#div_err').hide();
                            $('#div_err').html('');
                            $('#div_l_tabla_resultado_busqueda').show();
                            let botones = document.getElementById('l_tabla_resultado_busqueda').querySelectorAll('.cargar');
                            for (boton of botones) {
                              boton.addEventListener('click', l_mostrar_detalle_Of_Citipaq);
                            }
                        }else{
                            $('#div_l_tabla_resultado_busqueda').hide();
                            $('#div_err').html('<strong>info: </strong>No se han obtenido resultados.');
                            $('#div_err').show();
                        }
                    },
                    error: function (resultado, estado, error) {
                        console.log(resultado);
                        console.log(estado);
                        console.log(error);
                    }
                });
            } else if (buscarpor.value == 'cod_of_citypaq') {
                $.ajax({
                    type: "POST",
                    //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_tipo_buscarpor_cod_of_citypaq.php",
                    url: "../files/php/get_tipo_buscarpor_cod_of_citypaq.php",
                    data: { 'tipo': "'" + tipo.value + "'", 'cod_of_citypaq': entrada },
                    dataType: "json",
                    success: function (response) {
                        console.log(response);
                        if(response.length >0){
                            let i = 1;
                            let cadena="";
                            for(item of response){
                                cadena += "<tr>"
                                + "<td id=l_c" + i + "1>" + item.COD_OF_CITYPAQ + "</td>"
                                + "<td id=l_c" + i + "2>" + item.LOCALIZACION_DOMICILIO + "</td>"
                                + "<td id=l_c" + i + "3>" + item.LOCALIZACION_CP + "</td>"
                                + "<td id=l_c" + i + "4>" + item.LOCALIZACION_LOCALIDAD + "</td>"
                                + "<td id=l_c" + i + "5>" + item.PROVINCIA + "</td>"
                                + "<td id=l_c" + i + "6>" + item.TIPO + "</td>"
                                + "<td id=l_c" + i + "7>" + item.TELEFONO + "</td>"
                                + "<td id=l_c" + i + "8>" + item.HORARIO + "</td>"
                                + "<td id=l_c" + i + "9>" + item.DESCRIPCION + "</td>"
                                + "<td id=l_c" + i + "10><button id='a" + i + "' type='button' class='btn btn-lima cargar' >Cargar</button>"
                                + "</tr>";
                                i++;
                            }
                            $('#l_tabla_tbody_filas').html(cadena);
                            $('#div_err').hide();
                            $('#div_err').html('');
                            $('#div_l_tabla_resultado_busqueda').show();
                            let botones = document.getElementById('l_tabla_resultado_busqueda').querySelectorAll('.cargar');
                            for (boton of botones) {
                              boton.addEventListener('click', l_mostrar_detalle_Of_Citipaq);
                            }
                        }else{
                            $('#div_l_tabla_resultado_busqueda').hide();
                            $('#div_err').html('<strong>info: </strong>No se han obtenido resultados.');
                            $('#div_err').show();
                        }
                    },
                    error: function (resultado, estado, error) {
                        console.log(resultado);
                        console.log(estado);
                        console.log(error);
                    }
                });
            }
        } else {
            $('#div_err').html('<strong>alerta! </strong> Revisa el Código Postal o el Cod. Oficina / Citypaq. Ej Cod Oficina: 1234567. Ej Cod Citypaq: A0001034D.');
            $('#div_err').show();
        }

    });

    document.getElementById('tipo').addEventListener('change', function (e) {
        $('#div_err').hide();
        let cadena="";
        let cadena2=""
        if(this.value == 'OFICINA'){
            cadena = "<i style='font-size:38px;' class='fas fa-building text-general'></i>"
            + "<p class='h2 text-general ml-3'>Oficinas</p>";
            cadena2= "<i style='font-size:38px;' class='fas fa-info-circle text-general'></i>"
            + "<p class='h2 text-general ml-3'>Detalles Oficina</p>";
            $('#th_cod_of_citypaq').html('Cod Oficina');
        }else if(this.value == 'CITYPAQ'){
            cadena = "<i style='font-size:38px;' class='fas fa-border-all text-general'></i>"
            + "<p class='h2 text-general ml-3'>Citypaq</p>";
            cadena2= "<i style='font-size:38px;' class='fas fa-info-circle text-general'></i>"
            + "<p class='h2 text-general ml-3'>Detalles Citypaq</p>";
            $('#th_cod_of_citypaq').html('Cod Citypaq');
        }
        $('#div_titulo').html(cadena);
        $('#div_titulo2').html(cadena2);
    });
    document.getElementById('buscarpor').addEventListener('change', function (e) {

        $('#div_err').hide();
        if (this.value == 'cod_postal') {
            $('#entrada').prop('placeholder', 'Cod Postal');
        } else if (this.value == 'cod_of_citypaq') {
            $('#entrada').prop('placeholder', 'Cod. Of_Citypaq');
        }

    });
    $('#entrada').change(function (e) {
        $('#div_err').hide();
    });

}//FIN init

//FUNCIONES
function esconder_Cajas() {
    $('#div_err').hide();
    $('#div_l_tabla_resultado_busqueda').hide();
    $('#div_r_titulo2').hide();
    $('#div_detalles').hide();
}

//mostrar detalles de la Oficina / Citypaq
function l_mostrar_detalle_Of_Citipaq() {
    console.log(this.id);
  
    let fila = parseInt(this.id.slice(1));
    let celda1 = "l_c" + fila + "1";
    let celda2 = "l_c" + fila + "2";
    let celda3 = "l_c" + fila + "3";
    let celda4 = "l_c" + fila + "4";
    let celda5 = "l_c" + fila + "5";
    let celda6 = "l_c" + fila + "6";
    let celda7 = "l_c" + fila + "7";
    let celda8 = "l_c" + fila + "8";
    let celda9 = "l_c" + fila + "9";
  
    //console.log($('#' + celda6).html());
    $('#i_cod_of_citypaq').html($('#' + celda1).html());
    $('#i_descripcion').html($('#' + celda9).html());
    $('#i_telefono').html($('#' + celda7).html());
    $('#i_horario').html($('#' + celda8).html());

    $('#i_direccion').html($('#' + celda2).html());
    $('#i_municipio').html($('#' + celda4).html());
    $('#i_cod_postal').html($('#' + celda3).html());
    $('#i_provincia').html($('#' + celda5).html());
    
    $('#div_r_titulo2').show();
    $('#div_detalles').show();
  }

//VALIDACIONES
function validar_Entrada() {
    let tipo = document.getElementById('tipo');
    let buscarpor = document.getElementById('buscarpor');
    let entrada = $('#entrada').val();
    let matches;

    if (buscarpor.value == "cod_postal") {
        matches = entrada.match(/^(0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3})$/);
    } else if (buscarpor.value == "cod_of_citypaq") {
        if (tipo.value == "OFICINA") {
            matches = entrada.match(/^[0-9]{7}$/);
        } else if (tipo.value == "CITYPAQ") {
            matches = entrada.match(/^[A-Z][0-9]{7}[A-Z]$/);
        }
    }

    if (matches != null)
        return true;
    else
        return false;

}
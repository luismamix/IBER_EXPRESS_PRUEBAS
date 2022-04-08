window.addEventListener('load', init);
let callejero = Array();
function init() {

    esconder_Cajas();
    cargar_provincias();
    document.getElementById('provincia').addEventListener('change', cargar_municipios);
    document.getElementById('municipio').addEventListener('change', mostrar_campo_calle);
   

    $('#buscar').click(function (e) {
        $('#div_l_tabla_resultado_busqueda').hide();
        let provinciaid = document.getElementById('provincia');
        let municipio = document.getElementById('municipio');
        let calle = document.getElementById('calle');
        if (municipio.value != 0) {
            $('#div_err2').hide();
            if ($('#div_calle').is(":visible")) {
                if (($('#calle').val() == "")) {
                    $('#div_err').html('<strong>Alerta! </strong>Rellena el campo Calle.');
                    $('#div_err').show();
                } else {//es un municipio con callejero
                    $('#div_err').html('');
                    $('#div_err').hide();
                    $.ajax({
                        type: "POST",
                        //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_CodPostal.php",
                        url: "../files/php/get_CodPostal.php",
                        data: { 'provinciaid': "'" + provinciaid.value + "'", 'municipio': "'" + municipio.value + "'", 'calle': "'" + "%" + calle.value + "%" + "'" },
                        dataType: "json",
                        success: function (response) {
                            //console.log(response);
                            if (response.length > 0) {
                                let i = 1;
                                let cadena = "";
                                for (item of response) {
                                    cadena += "<tr>"
                                        + "<td id=l_c" + i + "1>" + item.cp + "</td>"
                                        + "<td id=l_c" + i + "2>" + item.calle + "</td>"
                                        + "<td id=l_c" + i + "3>" + item.poblacion + "</td>"
                                        + "<td id=l_c" + i + "4>" + item.provincia + "</td>"
                                        + "</tr>";
                                    i++;
                                }
                                $('#tabla_tbody_filas').html(cadena);
                                $('#div_err').hide();
                                $('#div_err').html('');
                                $('#div_l_tabla_resultado_busqueda').show();
                            } else {
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
            } else if ($('#div_calle').is(":hidden")) {//es un municipio sin callejero
                $.ajax({
                    type: "POST",
                    //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_CodPostal.php",
                    url: "../files/php/get_CodPostal.php",
                    data: { 'provinciaid': "'" + provinciaid.value + "'", 'municipio': "'" + municipio.value + "'" },
                    dataType: "json",
                    success: function (response) {
                        //console.log(response);
                        if (response.length > 0) {
                            let i = 1;
                            let cadena = "";
                            for (item of response) {
                                cadena += "<tr>"
                                    + "<td id=l_c" + i + "1>" + item.cp + "</td>"
                                    + "<td id=l_c" + i + "2>" + item.calle + "</td>"
                                    + "<td id=l_c" + i + "3>" + item.poblacion + "</td>"
                                    + "<td id=l_c" + i + "4>" + item.provincia + "</td>"
                                    + "</tr>";
                                i++;
                            }
                            $('#tabla_tbody_filas').html(cadena);
                            $('#div_err').hide();
                            $('#div_err').html('');
                            $('#div_l_tabla_resultado_busqueda').show();
                        } else {
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
            $('#div_err2').html('<strong>    Alerta! </strong> Selecciona una provincia despues un municipio.');
            $('#div_err2').show();
        }

    });
    
}//FIN init

//FUNCIONES
function cargar_provincias() {
    //ruta absoluta
    //'http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_provincias.php'
    fetch('../files/php/get_provincias.php')
        .then(response => response.json())
        .then(function (data) {

            //rellenar la  lista de provincias
            for (item of data[0])
                $('#provincia').append("<option value=" + item.provinciaid + ">" + item.provincia + "</option>");

            //guardar los municipios q llevan callejero en un array
            for (item of data[1])
                callejero.push(item);

            //console.log(callejero);
        })
        .catch(error => console.error(error))
}

function cargar_municipios() {
    //esconder
    $('#div_calle').hide();
    $('#div_err').hide();
    $('#div_err2').hide();
    $('#div_l_tabla_resultado_busqueda').hide();

    let provincia = document.getElementById('provincia');
    $.ajax({
        type: "POST",
        //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/get_municipios.php",
        url: "../files/php/get_municipios.php",
        data: { 'provinciaid': "'" + provincia.value + "'" },
        dataType: "json",
        success: function (response) {
            //console.log(response);
            $('#municipio').html("<option value='0'>Seleccione un municipio</option>");
            for (item of response) {
                $('#municipio').append("<option value='" + item.poblacion + "'>" + item.poblacion + "</option>");
            }
        },
        error: function (resultado, estado, error) {
            console.log(resultado);
            console.log(estado);
            console.log(error);
        }
    });
}

function mostrar_campo_calle() {
    //esconder
    $('#div_calle').hide();
    $('#div_err').hide();
    $('#div_err2').hide();
    $('#div_l_tabla_resultado_busqueda').hide();

    for (localidad of callejero) {
        if (this.value == localidad.municipio) {
            $('#calle').val('');
            $('#div_calle').show();
            break;
        }
    }
}


function esconder_Cajas() {
    $('#div_calle').hide();
    $('#div_err').hide();
    $('#div_err2').hide();
    $('#div_l_tabla_resultado_busqueda').hide();
}

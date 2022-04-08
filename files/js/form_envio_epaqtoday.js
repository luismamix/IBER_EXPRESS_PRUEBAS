window.addEventListener('load', init);

function init() {

  //REMITENTE
  esconderCajas();

  //BORRAR DATOS REMITENTE . s dispara al borrar datos del campo cod_cliente
  document.getElementById('cod_remitente').addEventListener('input', limpiardatosRemitente);

  //VALIDAR FORMULARIO
  $('#form_envio_paqtoday').submit(function (e) {

    if (validar_dir_entrega())
      return true
    else
      return false

  });

  //COMPROBAR SI REMITENTE ES CLIENTE. comprueba si el remtiente existe en la bd y si existe vuelca los datos en los campos del remitente.
  $('#bremescliente').click(function comprobarSiremitenteEScliente(e) {

    if (validarCod_remitente()) {

      let remitente = "'" + $('#cod_remitente').val() + "'";

      $.ajax({
        type: "POST",
        //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/getRemitente.php",
        url: "../../files/php/getRemitente.php",
        data: { 'cod_remitente': remitente },
        dataType: "json",
        success: function (response) {
          console.log(response)
          if (response.length > 0) {

            //vuelca los datos en los campos del remitente.
            $('#cod_remitente').val(response[0].cod_remitente);
            $('#razon_social_remitente').val(response[0].razon_social);
            $('#dir_remitente').val(response[0].direccion);
            $('#cod_postal_remitente').val(response[0].cod_postal);
            $('#municipio_remitente').val(response[0].municipio);
            $('#provincia_remitente').val(response[0].provincia);
            $('#telefono_remitente').val(response[0].telefono);
            $('#nombre_remitente').val(response[0].nombre);
            $('#apellidos_remitente').val(response[0].apellidos);
            $('#email_remitente').val(response[0].email);
            $('#ccc_remitente').val(response[0].num_cuenta_bancaria);
            $('#numtarjeta_remitente').val(response[0].num_tarjeta_credito);

            //cambia la apariencia del boton del remitente y checkea a true el campo remitente es cliente.
            //tb muestra un nuevo campo por si queremos modificar los datos del remitente.
            $('#remitenteEScte').prop('checked', true);
            $('#div_modificardatosrte').show();
            $("#bremescliente").addClass("btn-success");
            $("#bremescliente").removeClass("btn-secondary");
            $('#bremescliente').html('Bienvenido');

          } else {

            //cambia la apariencia del boton del remitente y checkea a false el campo remitente es cliente.
            $('#remitenteEScte').prop('checked', false);
            $('#div_modificardatosrte').hide();
            $("#bremescliente").addClass("btn-warning");
            $("#bremescliente").removeClass("btn-secondary");
            $('#bremescliente').html('Ingresa tus datos');

          }

        },
        error: function (resultado, estado, error) {
          console.log(resultado);
          console.log(estado);
          console.log(error);
        }
      });
    }

  });



  //DEST EMPRESA O PARTICULAR
  //Mostrar campos si destinatario es particular
  $('#dest_particular').click(function mostrarcampos_Dest_Particular(e) {
    $('#div_nombre_destinatario').show();
    $('#div_apellidos_destinatario').show();
    $('#div_razon_social_destinatario').hide();
    $('#nombre_destinatario').prop('required', true);
    $('#apellidos_destinatario').prop('required', true);
    $('#razon_social_destinatario').prop('required', false);


  });

  //Mostrar campos si destinatario es empresa
  $('#dest_empresa').click(function mostrarcampos_Dest_Empresa(e) {
    $('#div_nombre_destinatario').hide();
    $('#div_apellidos_destinatario').hide();
    $('#div_razon_social_destinatario').show();
    $('#nombre_destinatario').prop('required', false);
    $('#apellidos_destinatario').prop('required', false);
    $('#razon_social_destinatario').prop('required', true);

  });

  //DESTINATARIO
  //s dispara al borrar datos del campo cod_cliente
  document.getElementById('cod_destinatario').addEventListener('input', limpiardatosDestinatario);

  //comprueba si el remtiente existe en la bd y si existe vuelca los datos en los campos del remitente.
  $('#bdestescliente').click(function comprobarSiDestinatarioEScliente(e) {

    if (validarCod_destinatario()) {

      let destinatario = "'" + $('#cod_destinatario').val() + "'";

      $.ajax({
        type: "POST",
        //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/getDestinatario.php",
        url: "../../files/php/getDestinatario.php",
        data: { 'cod_destinatario': destinatario },
        dataType: "json",
        success: function (response) {
          console.log(response);

          if (response.length > 0) {

            //vuelca los datos en los campos del destinatario.
            $('#cod_destinatario').val(response[0].cod_destinatario);
            $('#razon_social_destinatario').val(response[0].razon_social);
            $('#dir_destinatario').val(response[0].direccion);
            $('#cod_postal_destinatario').val(response[0].cod_postal);
            $('#municipio_destinatario').val(response[0].municipio);
            $('#provincia_destinatario').val(response[0].provincia);
            $('#telefono_destinatario').val(response[0].telefono);
            $('#nombre_destinatario').val(response[0].nombre);
            $('#apellidos_destinatario').val(response[0].apellidos);
            $('#email_destinatario').val(response[0].email);

            //cambia la apariencia del boton del destinatario y checkea a true el campo destinatario es cliente.
            //tb muestra un nuevo campo por si queremos modificar los datos del destinatario.
            $('#destinatarioEScte').prop('checked', true);
            $('#div_modificardatosdest').show();
            $("#bdestescliente").addClass("btn-success");
            $("#bdestescliente").removeClass("btn-secondary");
            $('#bdestescliente').html('Bienvenido');

          } else {

            //cambia la apariencia del boton del destinatario y checkea a false el campo destinatario es cliente.
            $('#destinatarioEScte').prop('checked', false);
            $('#div_modificardatosdest').hide();
            $("#bdestescliente").addClass("btn-warning");
            $("#bdestescliente").removeClass("btn-secondary");
            $("#bdestescliente").html('Ingresa tus datos');
          }
        },
        error: function (resultado, estado, error) {
          console.log(resultado);
          console.log(estado);
          console.log(error);
        }
      });

    }
  });

  //DATOS RECOGIDA DOMICILIO , OFICINA O CITIPAQ

  //recogida domicilio
  $('#recogida_domicilio').click(function (e) {

    //esconder el resto de campos
    $('#div_r_contenido_of_citypaq').hide();
    $('#div_r_dircompleta_of_citypaq').hide();

    limpiardatosRecogida();



    //cargar la dir de recogida
    if (validarRecogida_en_domicilio()) {
      $('#dir_recogida').val($('#dir_remitente').val() + " " + $('#municipio_remitente').val() + " " + $('#cod_postal_remitente').val() + " " + $('#provincia_remitente').val());

    }

    establecer_fecha_recogida('domicilio');
  });

  //recogida en oficina
  $('#recogida_oficina').click(function (e) {

    //cargar campos
    cargarBuscador_oficinas_recogida();

    //mostrar el resto de campos
    $('#div_r_contenido_of_citypaq').show();
    $('#div_r_dircompleta_of_citypaq').show();

    limpiardatosRecogida();


  });

  //recogida en citypaq
  $('#recogida_citypaq').click(function (e) {

    //cargar campos
    cargarBuscador_citypaq_recogida();

    //mostrar el resto de campos
    $('#div_r_contenido_of_citypaq').show();
    $('#div_r_dircompleta_of_citypaq').show();

    limpiardatosRecogida();



  });

  //DATOS ENTREGA DOMICILIO , OFICINA O CITIPAQ
  //entrega domicilio
  $('#entrega_domicilio').click(function (e) {

    //esconder el resto de campos
    $('#div_e_contenido_of_citypaq').hide();
    $('#div_e_dircompleta_of_citypaq').hide();
    $('#div_err_provincia_entrega').html('');
    $('#div_err_provincia_entrega').hide();


    limpiardatosEntrega();

    //cargar la dir de entrega
    if (validarEntrega_en_domicilio()) {
      $('#dir_entrega').val($('#dir_destinatario').val() + " " + $('#municipio_destinatario').val() + " " + $('#cod_postal_destinatario').val() + " " + $('#provincia_destinatario').val());

    }

    establecer_fecha_prevista_entrega();

  });

  //entrega en oficina
  $('#entrega_oficina').click(function (e) {

    //cargar campos
    cargarBuscador_oficinas_entrega();

    //mostrar el resto de campos
    $('#div_e_contenido_of_citypaq').show();
    $('#div_e_dircompleta_of_citypaq').show();

    //esconder otros campos 
    $('#div_err_provincia_entrega').html('');
    $('#div_err_provincia_entrega').hide();

    limpiardatosEntrega();

  });

  //recogida en citypaq
  $('#entrega_citypaq').click(function (e) {

    //cargar campos
    cargarBuscador_citypaq_entrega();

    //mostrar el resto de campos
    $('#div_e_contenido_of_citypaq').show();
    $('#div_e_dircompleta_of_citypaq').show();

    //esconder otros campos 
    $('#div_err_provincia_entrega').html('');
    $('#div_err_provincia_entrega').hide();

    limpiardatosEntrega();

  });

  //embalaje caja
  $('#embalaje_caja').click(function (e) {
    //mostrar campos
    $('#div_tamaño_titulo').show();
    $('#div_tamaño_embalaje').show();
    $('#div_peso').hide();
    $('#peso').val("");

    //crear los radio button para elegir el tamaño
    let mogollon = "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='caja_mediana' name='cod_embalaje' value='CJ02'required>"
      + "<label class='form-check-label supersizeme' for='caja_mediana'>Med. Max 10 kg</label>"
      + "</div>"
      + "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='caja_pequeña' name='cod_embalaje' value='CJ03' required>"
      + "<label class='form-check-label supersizeme' for='caja_pequeña'>Peq. Max 3 kg</label>"
      + "</div>";

    $('#div_tamaño_embalaje').html(mogollon);

    //añadirle un escuchador
    let embalajes = document.getElementsByName('cod_embalaje');
    for (item of embalajes) {
      item.addEventListener('click', establecerPesoMAX);
    }

  });

  //embalaje caja_botellas
  $('#embalaje_caja_botellas').click(function (e) {

    //mostrar campos
    $('#div_tamaño_titulo').show();
    $('#div_tamaño_embalaje').show();
    $('#div_peso').hide();
    $('#peso').val("");

    //crear los radio button para elegir el tamaño
    let mogollon = "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='caja_botellas_mediana' name='cod_embalaje' value='CB02'required>"
      + "<label class='form-check-label supersizeme' for='caja_botellas_mediana'>Med. Max 10 kg</label>"
      + "</div>";

    $('#div_tamaño_embalaje').html(mogollon);

    //añadirle un escuchador
    let embalajes = document.getElementsByName('cod_embalaje');
    for (item of embalajes) {
      item.addEventListener('click', establecerPesoMAX);
    }

  });
  //embalaje sobre
  $('#embalaje_sobres').click(function (e) {

    //mostrar campos
    $('#div_tamaño_titulo').show();
    $('#div_tamaño_embalaje').show();
    $('#div_peso').hide();
    $('#peso').val("");

    //crear los radio button para elegir el tamaño
    let mogollon = "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='sobre_grande' name='cod_embalaje' value='SB01' required>"
      + "<label class='form-check-label supersizeme' for='sobre_grande'>Grande Max 3 kg</label>"
      + "</div>"
      + "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='sobre_mediano' name='cod_embalaje' value='SB02'required>"
      + "<label class='form-check-label supersizeme' for='sobre_mediano'>Med. Max 2 kg</label>"
      + "</div>"
      + "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='sobre_pequeño' name='cod_embalaje' value='SB03' required>"
      + "<label class='form-check-label supersizeme' for='sobre_pequeño'>Peq. Max 1 kg</label>"
      + "</div>";

    $('#div_tamaño_embalaje').html(mogollon);

    //añadirle un escuchador
    let embalajes = document.getElementsByName('cod_embalaje');
    for (item of embalajes) {
      item.addEventListener('click', establecerPesoMAX);
    }
  });
  //embalaje rollo_tubo
  $('#embalaje_rollo_tubo').click(function (e) {

    //mostrar campos
    $('#div_tamaño_titulo').show();
    $('#div_tamaño_embalaje').show();
    $('#div_peso').hide();
    $('#peso').val("");


    //crear los radio button para elegir el tamaño
    let mogollon = "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='rollo_tubo_standard' name='cod_embalaje' value='RL01' required>"
      + "<label class='form-check-label supersizeme' for='rollo_tubo_standard'>Standard Max 10 kg</label>"
      + "</div>";

    $('#div_tamaño_embalaje').html(mogollon);

    //añadirle un escuchador
    let embalajes = document.getElementsByName('cod_embalaje');
    for (item of embalajes) {
      item.addEventListener('click', establecerPesoMAX);
    }
  });
  //embalaje valija
  $('#embalaje_valijas').click(function (e) {

    //mostrar campos
    $('#div_tamaño_titulo').show();
    $('#div_tamaño_embalaje').show();
    $('#div_peso').hide();
    $('#peso').val("");


    //crear los radio button para elegir el tamaño
    let mogollon = "<div class='form-check form-check-inline'>"
      + "<input class='form-check-input' type='radio' id='valija_standard' name='cod_embalaje' value='VJ01' required>"
      + "<label class='form-check-label supersizeme' for='valija_standard'>Standard Max 3 kg</label>"
      + "</div>";

    $('#div_tamaño_embalaje').html(mogollon);

    //añadirle un escuchador
    let embalajes = document.getElementsByName('cod_embalaje');
    for (item of embalajes) {
      item.addEventListener('click', establecerPesoMAX);
    }
  });

}//fin init

//FUNCIONES

function establecer_fecha_recogida(recogida) {
  //establecer fecha de recogida ,fhoy + 1h
  //establecer limite max las 13h del mismo dia (domicilio)
   //establecer limite max las 13h del mismo dia (of_citypaq)
  let fhoy = new Date();
  fhoy.setHours(fhoy.getHours() + 1);

  let dia = ("0" + fhoy.getDate()).slice(-2);
  let mes = ("0" + (fhoy.getMonth() + 1)).slice(-2);
  let año = fhoy.getFullYear();
  let horas = ("0" + fhoy.getHours()).slice(-2);
  let minutos = ("0" + fhoy.getMinutes()).slice(-2);
  let segundos = ("0" + fhoy.getSeconds()).slice(-2);
  let custom = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
  let customMax = "";

  switch (recogida) {
    case 'domicilio':
      dia = ("0" + fhoy.getDate()).slice(-2);
      mes = ("0" + (fhoy.getMonth() + 1)).slice(-2);
      año = fhoy.getFullYear();
      horas = "12";
      minutos = "59";
      segundos = "59";
      customMax = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
      document.getElementById('fecha_recogida').min = custom;
      document.getElementById('fecha_recogida').max = customMax;
      $('#fecha_recogida').val(custom);
      break;
    case 'of_citypaq':
      dia = ("0" + fhoy.getDate()).slice(-2);
      mes = ("0" + (fhoy.getMonth() + 1)).slice(-2);
      año = fhoy.getFullYear();
      horas = "13";
      minutos = "59";
      segundos = "59";
      customMax = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;
      document.getElementById('fecha_recogida').min = custom;
      document.getElementById('fecha_recogida').max = customMax;
      $('#fecha_recogida').val(custom);
      break;

    default:
      break;
  }

}

function establecer_fecha_prevista_entrega() {
  
  //establecer el rango de fechas del envio
  let fhoy = new Date();
  fhoy.setHours(fhoy.getHours() +1);

  //establecer fecha de entrega ,elegir la fecha entre las 17h y las 21h de hoy
  let dia = ("0" + fhoy.getDate()).slice(-2);
  let mes = ("0" + (fhoy.getMonth() + 1)).slice(-2);
  let año = fhoy.getFullYear();
  let horas = "17";
  let minutos = "00";
  let segundos = "00";
  let customMin = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;

  dia = ("0" + fhoy.getDate()).slice(-2);
  mes = ("0" + (fhoy.getMonth() + 1)).slice(-2);
  año = fhoy.getFullYear();
  horas = "20";
  minutos = "59";
  segundos = "59";
  let customMax = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;

  document.getElementById('fecha_prevista_entrega').min = customMin;
  document.getElementById('fecha_prevista_entrega').max = customMax;
  $('#fecha_prevista_entrega').val(customMin);
}


//buscar oficina recogida
function cargarOficinas_recogida() {
  let i = 1;
  limpiardatosRecogida();
  let r_cod_postal_oficina = "'" + $('#r_cod_postal_oficina').val() + "'";

  if (validar_r_cod_postal_oficina()) {
    $.ajax({
      type: "POST",
      //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/getOficina.php",
      url: "../../files/php/getOficina.php",
      data: { 'cod_postal_oficina': r_cod_postal_oficina },
      dataType: "json",
      success: function (response) {
        console.log(response);
        let cadena = "";
        if (response.length > 0) {
          for (item of response) {

            cadena += "<tr>"
              + "<td id=r_c" + i + "1>" + item.COD_OF_CITYPAQ + "</td>"
              + "<td id=r_c" + i + "2>" + item.LOCALIZACION_DOMICILIO + "</td>"
              + "<td id=r_c" + i + "3>" + item.LOCALIZACION_CP + "</td>"
              + "<td id=r_c" + i + "4>" + item.LOCALIZACION_LOCALIDAD + "</td>"
              + "<td id=r_c" + i + "5>" + item.PROVINCIA + "</td>"
              + "<td id=r_c" + i + "6><button id='a" + i + "' type='button' class='btn btn-lima-invertido cargar' >Cargar</button>"
              + "</tr>";
            i++;
          }
          $('#r_tabla_tbody_filas').html(cadena);
          $('#div_r_err').hide();
          $('#div_r_err').html('');
          $('#r_tabla_resultado_busqueda').show();
          let botones = document.getElementById('r_tabla_resultado_busqueda').querySelectorAll('.cargar');
          for (boton of botones) {
            boton.addEventListener('click', r_cargar_datos_Of_Citipaq);
          }
        } else {
          $('#r_tabla_resultado_busqueda').hide();
          $('#div_r_err').html('No se han obtenido resultados.');
          $('#div_r_err').show();
        }
      },
      error: function (resultado, estado, error) {
        console.log(resultado);
        console.log(estado);
        console.log(error);
      }
    });
  } else {
    $('#div_r_err').html('Por favor introduce un cod postal válido.');
    $('#div_r_err').show();
  }

}

//buscar citypaq recogida
function cargarCitypaq_recogida() {
  let i = 1;
  limpiardatosRecogida();
  let r_cod_postal_citypaq = "'" + $('#r_cod_postal_citypaq').val() + "'";

  if (validar_r_cod_postal_citypaq()) {
    $.ajax({
      type: "POST",
      //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/getCitypaq.php",
      url: "../../files/php/getCitypaq.php",
      data: { 'cod_postal_citypaq': r_cod_postal_citypaq },
      dataType: "json",
      success: function (response) {
        console.log(response);
        let cadena = "";
        if (response.length > 0) {
          for (item of response) {
            cadena += "<tr>"
              + "<td id=r_c" + i + "1>" + item.COD_OF_CITYPAQ + "</td>"
              + "<td id=r_c" + i + "2>" + item.LOCALIZACION_DOMICILIO + "</td>"
              + "<td id=r_c" + i + "3>" + item.LOCALIZACION_CP + "</td>"
              + "<td id=r_c" + i + "4>" + item.LOCALIZACION_LOCALIDAD + "</td>"
              + "<td id=r_c" + i + "5>" + item.PROVINCIA + "</td>"
              + "<td id=r_c" + i + "6><button id='a" + i + "' type='button' class='btn btn-lima-invertido cargar' >Cargar</button>"
              + "</tr>";
            i++;
          }
          $('#r_tabla_tbody_filas').html(cadena);
          $('#div_r_err').hide();
          $('#div_r_err').html('');
          $('#r_tabla_resultado_busqueda').show();
          let botones = document.getElementById('r_tabla_resultado_busqueda').querySelectorAll('.cargar');
          for (boton of botones) {
            boton.addEventListener('click', r_cargar_datos_Of_Citipaq);
          }
        } else {
          $('#r_tabla_resultado_busqueda').hide();
          $('#div_r_err').html('No se han obtenido resultados.');
          $('#div_r_err').show();
        }
      },
      error: function (resultado, estado, error) {
        console.log(resultado);
        console.log(estado);
        console.log(error);
      }
    });
  } else {
    $('#div_r_err').html('Por favor introduce un cod postal válido.');
    $('#div_r_err').show();
  }

}

//buscar oficina entrega
function cargarOficinas_entrega() {
  let i = 1;
  limpiardatosEntrega();
  let e_cod_postal_oficina = "'" + $('#e_cod_postal_oficina').val() + "'";

  if (validar_e_cod_postal_oficina()) {
    $.ajax({
      type: "POST",
      //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/getOficina.php",
      url: "../../files/php/getOficina.php",
      data: { 'cod_postal_oficina': e_cod_postal_oficina },
      dataType: "json",
      success: function (response) {
        console.log(response);
        let cadena = "";
        if (response.length > 0) {
          for (item of response) {

            cadena += "<tr>"
              + "<td id=e_c" + i + "1>" + item.COD_OF_CITYPAQ + "</td>"
              + "<td id=e_c" + i + "2>" + item.LOCALIZACION_DOMICILIO + "</td>"
              + "<td id=e_c" + i + "3>" + item.LOCALIZACION_CP + "</td>"
              + "<td id=e_c" + i + "4>" + item.LOCALIZACION_LOCALIDAD + "</td>"
              + "<td id=e_c" + i + "5>" + item.PROVINCIA + "</td>"
              + "<td id=e_c" + i + "6><button id='a" + i + "' type='button' class='btn btn-lima-invertido cargar' >Cargar</button>"
              + "</tr>";
            i++;
          }
          $('#e_tabla_tbody_filas').html(cadena);
          $('#div_e_err').hide();
          $('#div_e_err').html('');
          $('#e_tabla_resultado_busqueda').show();
          let botones = document.getElementById('e_tabla_resultado_busqueda').querySelectorAll('.cargar');
          for (boton of botones) {
            boton.addEventListener('click', e_cargar_datos_Of_Citipaq);
          }
        } else {
          $('#e_tabla_resultado_busqueda').hide();
          $('#div_e_err').html('No se han obtenido resultados.');
          $('#div_e_err').show();
        }
      },
      error: function (resultado, estado, error) {
        console.log(resultado);
        console.log(estado);
        console.log(error);
      }
    });
  } else {
    $('#div_e_err').html('Por favor introduce un cod postal válido.');
    $('#div_e_err').show();
  }

}

//buscar citypaq entrega
function cargarCitypaq_entrega() {
  let i = 1;
  limpiardatosEntrega();
  let e_cod_postal_citypaq = "'" + $('#e_cod_postal_citypaq').val() + "'";

  if (validar_e_cod_postal_citypaq()) {
    $.ajax({
      type: "POST",
      //url: "http://localhost/IBER_EXPRESS_PRUEBAS/files/php/getCitypaq.php",
      url: "../../files/php/getCitypaq.php",
      data: { 'cod_postal_citypaq': e_cod_postal_citypaq },
      dataType: "json",
      success: function (response) {
        console.log(response);
        let cadena = "";
        if (response.length > 0) {
          for (item of response) {
            cadena += "<tr>"
              + "<td id=e_c" + i + "1>" + item.COD_OF_CITYPAQ + "</td>"
              + "<td id=e_c" + i + "2>" + item.LOCALIZACION_DOMICILIO + "</td>"
              + "<td id=e_c" + i + "3>" + item.LOCALIZACION_CP + "</td>"
              + "<td id=e_c" + i + "4>" + item.LOCALIZACION_LOCALIDAD + "</td>"
              + "<td id=e_c" + i + "5>" + item.PROVINCIA + "</td>"
              + "<td id=e_c" + i + "6><button id='a" + i + "' type='button' class='btn btn-lima-invertido cargar' >Cargar</button>"
              + "</tr>";
            i++;
          }
          $('#e_tabla_tbody_filas').html(cadena);
          $('#div_e_err').hide();
          $('#div_e_err').html('');
          $('#e_tabla_resultado_busqueda').show();
          let botones = document.getElementById('e_tabla_resultado_busqueda').querySelectorAll('.cargar');
          for (boton of botones) {
            boton.addEventListener('click', e_cargar_datos_Of_Citipaq);
          }
        } else {
          $('#e_tabla_resultado_busqueda').hide();
          $('#div_e_err').html('No se han obtenido resultados.');
          $('#div_e_err').show();
        }
      },
      error: function (resultado, estado, error) {
        console.log(resultado);
        console.log(estado);
        console.log(error);
      }
    });
  } else {
    $('#div_e_err').html('Por favor introduce un cod postal válido.');
    $('#div_e_err').show();
  }

}
//recogida cargar_datos_Of_Citipaq
function r_cargar_datos_Of_Citipaq() {
  console.log(this.id);

  let fila = parseInt(this.id.slice(1));
  let celda1 = "r_c" + fila + "1";
  let celda2 = "r_c" + fila + "2";
  let celda3 = "r_c" + fila + "3";
  let celda4 = "r_c" + fila + "4";
  let celda5 = "r_c" + fila + "5";

  $('#r_cod_of_citypaq').val($('#' + celda1).html());
  $('#r_dir_of_citypaq').val($('#' + celda2).html());
  $('#r_cod_postal_of_citypaq').val($('#' + celda3).html());
  $('#r_municipio_of_citypaq').val($('#' + celda4).html());
  $('#r_provincia_of_citypaq').val($('#' + celda5).html());

  //pintar dir_recogida
  $('#dir_recogida').val($('#r_dir_of_citypaq').val() + " " + $('#r_municipio_of_citypaq').val() + " " + $('#r_cod_postal_of_citypaq').val() + " " + $('#r_provincia_of_citypaq').val());

  establecer_fecha_recogida('of_citypaq');

}

//entrega cargar_datos_Of_Citipaq
function e_cargar_datos_Of_Citipaq() {
  console.log(this.id);

  let fila = parseInt(this.id.slice(1));
  let celda1 = "e_c" + fila + "1";
  let celda2 = "e_c" + fila + "2";
  let celda3 = "e_c" + fila + "3";
  let celda4 = "e_c" + fila + "4";
  let celda5 = "e_c" + fila + "5";

  $('#e_cod_of_citypaq').val($('#' + celda1).html());
  $('#e_dir_of_citypaq').val($('#' + celda2).html());
  $('#e_cod_postal_of_citypaq').val($('#' + celda3).html());
  $('#e_municipio_of_citypaq').val($('#' + celda4).html());
  $('#e_provincia_of_citypaq').val($('#' + celda5).html());

  //pintar dir_entrega
  $('#dir_entrega').val($('#e_dir_of_citypaq').val() + " " + $('#e_municipio_of_citypaq').val() + " " + $('#e_cod_postal_of_citypaq').val() + " " + $('#e_provincia_of_citypaq').val());

  //establecer el rango de fechas del envio
  let fhoy = new Date();
  let fmin = new Date();
  let fmax = new Date();
  fmin.setDate(fhoy.getDate() + 1);
  fmax.setDate(fhoy.getDate() + 2);

  //establecer fecha de entrega , elegir fecha a partir de las 24h
  let dia = ("0" + fmin.getDate()).slice(-2);
  let mes = ("0" + (fmin.getMonth() + 1)).slice(-2);
  let año = fmin.getFullYear();
  let horas = ("0" + fmin.getHours()).slice(-2);
  let minutos = ("0" + fmin.getMinutes()).slice(-2);
  let segundos = ("0" + fmin.getSeconds()).slice(-2);
  let customMin = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;

  dia = ("0" + fmax.getDate()).slice(-2);
  mes = ("0" + (fmax.getMonth() + 1)).slice(-2);
  año = fmax.getFullYear();
  horas = ("0" + fmax.getHours()).slice(-2);
  minutos = ("0" + fmax.getMinutes()).slice(-2);
  segundos = ("0" + fmax.getSeconds()).slice(-2);
  let customMax = año + "-" + mes + "-" + dia + "T" + horas + ":" + minutos + ":" + segundos;

  document.getElementById('fecha_prevista_entrega').min = customMin;
  document.getElementById('fecha_prevista_entrega').max = customMax;
  $('#fecha_prevista_entrega').val(customMin);
}

//
function cargarBuscador_oficinas_recogida() {
  let mogollon = "<h4><u>Buscador de Oficinas</u></h4>"
    + "<div>"
    + "<div class='form-group row'>"
    + "<label  for='r_cod_postal_oficina' class='col-md-2 col-form-label'>Cod. Postal Oficina:</label>"
    + "<div class='col-md-5'>"
    + "<input  type='text' class='form-control' placeholder='cod postal' id='r_cod_postal_oficina' minlength='5' maxlength='5'>"
    + "</div>"
    + "<div class='col-md-5'>"
    + "<button type='button' class='btn btn-secondary' id='b_r_cod_postal_oficina'>Buscar</button>"
    + "</div>"
    + "</div>"
    + "<div id='div_r_resultado_busqueda ml-2 mt-2'>"
    + "<div id='div_r_err' class='alert alert-warning'></div>"
    + "<table id='r_tabla_resultado_busqueda' class='table table-lima-invertido table-striped rounded table-responsive'>"
    + "<thead>"
    + "<tr>"
    + "<th>Cod Oficina</th>"
    + "<th>Direccion</th>"
    + "<th>Cod Postal</th>"
    + "<th>Municipio</th>"
    + "<th>Provincia</th>"
    + "<th>Seleccionar</th>"
    + "</tr>"
    + "</thead>"
    + "<tbody id='r_tabla_tbody_filas'>"

    + "</tbody>"
    + "</table>"
    + "</div>"
    + "</div>";

  $('#div_r_contenido_of_citypaq').html(mogollon);
  $('#div_r_err').hide();
  $('#r_tabla_resultado_busqueda').hide();
  $('#b_r_cod_postal_oficina').click(cargarOficinas_recogida);
}

//
function cargarBuscador_citypaq_recogida() {
  let mogollon = "<h4><u>Buscador de Citypaq</u></h4>"
    + "<div>"
    + "<div class='form-group row'>"
    + "<label  for='r_cod_postal_citypaq' class='col-md-2 col-form-label'>Cod. Postal Citypaq:</label>"
    + "<div class='col-md-5'>"
    + "<input  type='text' class='form-control' placeholder='cod postal' id='r_cod_postal_citypaq' minlength='5' maxlength='5'>"
    + "</div>"
    + "<div class='col-md-5'>"
    + "<button type='button' class='btn btn-secondary' id='b_r_cod_postal_citypaq'>Buscar</button>"
    + "</div>"
    + "</div>"
    + "<div id='div_r_resultado_busqueda ml-2 mt-2'>"
    + "<div id='div_r_err' class='alert alert-warning'></div>"
    + "<table id='r_tabla_resultado_busqueda' class='table table-lima-invertido table-striped rounded table-responsive'>"
    + "<thead>"
    + "<tr>"
    + "<th>Cod Citypaq</th>"
    + "<th>Direccion</th>"
    + "<th>Cod Postal</th>"
    + "<th>Municipio</th>"
    + "<th>Provincia</th>"
    + "<th>Seleccionar</th>"
    + "</tr>"
    + "</thead>"
    + "<tbody id='r_tabla_tbody_filas'>"

    + "</tbody>"
    + "</table>"
    + "</div>"
    + "</div>";

  $('#div_r_contenido_of_citypaq').html(mogollon);
  $('#div_r_err').hide();
  $('#r_tabla_resultado_busqueda').hide();
  $('#b_r_cod_postal_citypaq').click(cargarCitypaq_recogida);
}

//
function cargarBuscador_oficinas_entrega() {
  let mogollon = "<h4><u>Buscador de Oficinas</u></h4>"
    + "<div>"
    + "<div class='form-group row'>"
    + "<label  for='e_cod_postal_oficina' class='col-md-2 col-form-label'>Cod. Postal Oficina:</label>"
    + "<div class='col-md-5'>"
    + "<input  type='text' class='form-control' placeholder='cod postal' id='e_cod_postal_oficina' minlength='5' maxlength='5'>"
    + "</div>"
    + "<div class='col-md-5'>"
    + "<button type='button' class='btn btn-secondary' id='b_e_cod_postal_oficina'>Buscar</button>"
    + "</div>"
    + "</div>"
    + "<div id='div_e_resultado_busqueda ml-2 mt-2'>"
    + "<div id='div_e_err' class='alert alert-warning'></div>"
    + "<table id='e_tabla_resultado_busqueda' class='table table-lima-invertido table-striped rounded table-responsive'>"
    + "<thead>"
    + "<tr>"
    + "<th>Cod Oficina</th>"
    + "<th>Direccion</th>"
    + "<th>Cod Postal</th>"
    + "<th>Municipio</th>"
    + "<th>Provincia</th>"
    + "<th>Seleccionar</th>"
    + "</tr>"
    + "</thead>"
    + "<tbody id='e_tabla_tbody_filas'>"

    + "</tbody>"
    + "</table>"
    + "</div>"
    + "</div>";

  $('#div_e_contenido_of_citypaq').html(mogollon);
  $('#div_e_err').hide();
  $('#e_tabla_resultado_busqueda').hide();
  $('#b_e_cod_postal_oficina').click(cargarOficinas_entrega);
}

function cargarBuscador_citypaq_entrega() {
  let mogollon = "<h4><u>Buscador de Citypaq</u></h4>"
    + "<div>"
    + "<div class='form-group row'>"
    + "<label  for='e_cod_postal_citypaq' class='col-md-2 col-form-label'>Cod. Postal Citypaq:</label>"
    + "<div class='col-md-5'>"
    + "<input  type='text' class='form-control' placeholder='cod postal' id='e_cod_postal_citypaq' minlength='5' maxlength='5'>"
    + "</div>"
    + "<div class='col-md-5'>"
    + "<button type='button' class='btn btn-secondary' id='b_e_cod_postal_citypaq'>Buscar</button>"
    + "</div>"
    + "</div>"
    + "<div id='div_e_resultado_busqueda ml-2 mt-2'>"
    + "<div id='div_e_err' class='alert alert-warning'></div>"
    + "<table id='e_tabla_resultado_busqueda' class='table table-lima-invertido table-striped rounded table-responsive'>"
    + "<thead>"
    + "<tr>"
    + "<th>Cod Citypaq</th>"
    + "<th>Direccion</th>"
    + "<th>Cod Postal</th>"
    + "<th>Municipio</th>"
    + "<th>Provincia</th>"
    + "<th>Seleccionar</th>"
    + "</tr>"
    + "</thead>"
    + "<tbody id='e_tabla_tbody_filas'>"

    + "</tbody>"
    + "</table>"
    + "</div>"
    + "</div>";

  $('#div_e_contenido_of_citypaq').html(mogollon);
  $('#div_e_err').hide();
  $('#e_tabla_resultado_busqueda').hide();
  $('#b_e_cod_postal_citypaq').click(cargarCitypaq_entrega);
}

function establecerPesoMAX(e) {
  /*console.log(this.id);
  console.log(this.value);
  console.log(this.name)*/
  $('#peso').val("");
  $('#div_peso').show();

  switch (this.value) {
    case 'CB01':
      $('#peso').prop("min", 0.5);
      $('#peso').prop("max", 30);
      break;
    case 'CB02':
      $('#peso').prop("min", 0.5);
      $('#peso').prop("max", 10);
      break;
    case 'CJ01':
      $('#peso').prop("min", 0.1);
      $('#peso').prop("max", 30);
      break;
    case 'CJ02':
      $('#peso').prop("min", 0.1);
      $('#peso').prop("max", 10);
      break;
    case 'CJ03':
      $('#peso').prop("min", 0.1);
      $('#peso').prop("max", 3);
      break;
    case 'RL01':
      $('#peso').prop("min", 0.5);
      $('#peso').prop("max", 10);
      break;
    case 'SB01':
      $('#peso').prop("min", 0.1);
      $('#peso').prop("max", 3);
      break;
    case 'SB02':
      $('#peso').prop("min", 0.1);
      $('#peso').prop("max", 2);
      break;
    case 'SB03':
      $('#peso').prop("min", 0.1);
      $('#peso').prop("max", 1);
      break;
    case 'VJ01':
      $('#peso').prop("min", 0.5);
      $('#peso').prop("max", 3);
      break;
    default:
      $('#peso').prop("min", 0.1);
      break;
  }
}


//LIMPIAR Y ESCONDER CAMPOS
//esconder campos y cambiar la propiedad required a false.
//tb anulamos el evento click de los dos campos del formulario q controlan si el remitente o el destinatario estan registrados en la bd.
function esconderCajas() {
  $('#div_nombre_remitente').hide();
  $('#div_numtarjeta_remitente').hide();
  $('#div_apellidos_remitente').hide();
  $('#div_modificardatosrte').hide();
  $('#div_modificardatosdest').hide();
  $('#div_r_dircompleta_of_citypaq').hide();
  $('#div_e_dircompleta_of_citypaq').hide();
  /*  embalaje */
  $('#div_tamaño_titulo').hide();
  $('#div_tamaño_embalaje').hide();
  $('#div_peso').hide();
  //custom depende del tipo envio
  $('#div_cod_tipo_envio').hide();
  $('#div_tipo_remitente').hide();
  $('#div_err_provincia_entrega').hide();
  $('#div_recogida_citypaq').hide();
  $('#div_entrega_oficina').hide();
  $('#div_entrega_citypaq').hide();
  //mostrar (solo tipo envio valijas) / ocultar 
  $('#div_embalaje_valijas').hide();
  $('#nombre_remitente').prop('required', false);
  $('#apellidos_remitente').prop('required', false);
  $('#numtarjeta_remitente').prop('required', false);
  $(':checkbox[readonly=readonly]').click(function () {
    return false;
  });

}

//devuelve la apariencia original al boton remitente.
//limpia todos los campos del remitente.
//esconde el boton modificardatos del remitente.
function limpiardatosRemitente() {
  $("#bremescliente").removeClass("btn-success");
  $("#bremescliente").removeClass("btn-warning");
  $("#bremescliente").addClass("btn-secondary");
  $('#bremescliente').html('¿eres cliente?');
  $('#razon_social_remitente').val("");
  $('#dir_remitente').val("");
  $('#cod_postal_remitente').val("");
  $('#municipio_remitente').val("");
  $('#provincia_remitente').val("");
  $('#telefono_remitente').val("");
  $('#nombre_remitente').val("");
  $('#apellidos_remitente').val("");
  $('#email_remitente').val("");
  $('#ccc_remitente').val("");
  $('#numtarjeta_remitente').val("");
  $('#remitenteEScte').prop('checked', false);
  $('#div_modificardatosrte').hide();
}

function limpiardatosDestinatario() {

  $("#bdestescliente").removeClass("btn-success");
  $("#bdestescliente").removeClass("btn-warning");
  $("#bdestescliente").addClass("btn-secondary");
  $('#bdestescliente').html('¿es cliente?');
  $('#razon_social_destinatario').val("");
  $('#dir_destinatario').val("");
  $('#cod_postal_destinatario').val("");
  $('#municipio_destinatario').val("");
  $('#provincia_destinatario').val("");
  $('#telefono_destinatario').val("");
  $('#nombre_destinatario').val("");
  $('#apellidos_destinatario').val("");
  $('#email_destinatario').val("");
  $('#destinatarioEScte').prop('checked', false);
  $('#div_modificardatosdest').hide();
}

function limpiardatosRecogida() {
  $('#dir_recogida').val("");
  $('#fecha_recogida').val("");
  $('#r_cod_of_citypaq').val("");
  $('#r_dir_of_citypaq').val("");
  $('#r_cod_postal_of_citypaq').val("");
  $('#r_municipio_of_citypaq').val("");
  $('#r_provincia_of_citypaq').val("");
}

function limpiardatosEntrega() {
  $('#dir_entrega').val("");
  $('#fecha_prevista_entrega').val("");
  $('#e_cod_of_citypaq').val("");
  $('#e_dir_of_citypaq').val("");
  $('#e_cod_postal_of_citypaq').val("");
  $('#e_municipio_of_citypaq').val("");
  $('#e_provincia_of_citypaq').val("");
}


//VALIDACIONES
function validarCod_remitente() {
  let remitente = document.getElementById('cod_remitente');

  if (remitente.checkValidity())
    return true;
  else
    return false;

}

function validarCod_destinatario() {
  let destinatario = document.getElementById('cod_destinatario');

  if (destinatario.checkValidity())
    return true;
  else
    return false;
}

function validarRecogida_en_domicilio() {
  let dir_remitente = document.getElementById('dir_remitente').checkValidity();
  let municipio_remitente = document.getElementById('municipio_remitente').checkValidity();
  let cod_postal_remitente = document.getElementById('cod_postal_remitente').checkValidity();
  let provincia_remitente = document.getElementById('provincia_remitente').checkValidity();

  if (dir_remitente && municipio_remitente && cod_postal_remitente && provincia_remitente)
    return true
  else
    return false

}

function validarEntrega_en_domicilio() {
  let dir_destinatario = document.getElementById('dir_destinatario').checkValidity();
  let municipio_destinatario = document.getElementById('municipio_destinatario').checkValidity();
  let cod_postal_destinatario = document.getElementById('cod_postal_destinatario').checkValidity();
  let provincia_destinatario = document.getElementById('provincia_destinatario').checkValidity();

  if (dir_destinatario && municipio_destinatario && cod_postal_destinatario && provincia_destinatario)
    return true
  else
    return false
}

function validar_r_cod_postal_citypaq() {

  let cod_postal = $('#r_cod_postal_citypaq').val();
  let matches = cod_postal.match(/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/);
  if (matches != null)
    return true
  else
    return false
}

function validar_r_cod_postal_oficina() {
  let cod_postal = $('#r_cod_postal_oficina').val();
  let matches = cod_postal.match(/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/);
  if (matches != null)
    return true
  else
    return false
}

function validar_e_cod_postal_citypaq() {

  let cod_postal = $('#e_cod_postal_citypaq').val();
  let matches = cod_postal.match(/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/);
  if (matches != null)
    return true
  else
    return false
}

function validar_e_cod_postal_oficina() {
  let cod_postal = $('#e_cod_postal_oficina').val();
  let matches = cod_postal.match(/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/);
  if (matches != null)
    return true
  else
    return false
}

function validar_dir_entrega() {
  let direntrega = $('#dir_entrega').val();
  let dirrecogida = $('#dir_recogida').val();
  let matches_recogida = dirrecogida.match(/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/g);
  let matches_entrega = direntrega.match(/0[1-9][0-9]{3}|[1-4][0-9]{4}|5[0-2][0-9]{3}/g);

  if (matches_recogida != null && matches_entrega != null) {

    //console.log(matches_recogida[0]);
    //console.log(matches_entrega[0]);

    let cp_recogida = matches_recogida[0];
    let cp_entrega = matches_entrega[0];

    //console.log("provincia recogida: " + cp_recogida.substr(0,2));
    //console.log("provincia entrega: " + cp_entrega.substr(0,2));

    if (cp_recogida.substr(0, 2) == cp_entrega.substr(0, 2)) {
      $('#div_err_provincia_entrega').html('');
      $('#div_err_provincia_entrega').hide();
      return true;
    } else {
      $('#div_err_provincia_entrega').show();
      $('#div_err_provincia_entrega').html('<strong>Alerta! </strong>La entrega debe hacerse en la misma provincia. Revisa la dirección de entrega.');
      $('#dir_entrega').focus();
      return false;
    }
  } else {
    $('#div_err_provincia_entrega').show();
    $('#div_err_provincia_entrega').html('<strong>Alerta! </strong>Revisa los datos de recogida y entrega.');
    $('#dir_entrega').focus();
    return false;
  }
}




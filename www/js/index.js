var isonline = false;
var enviando = false;
var userdata = '';
var apiURL = "http://newcyclelabs.com.ar/addidasnitejogger/appConnector.php";
var datos_eventos;
var data_path = '';
var app = {
    initialize: function() {
        this.bindEvents();
    },
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
    },
    iniciar: function() {
		localStorage["datos_eventos"] = loadJSON(data_path + "datos/datos.json");
		datos_eventos = localStorage["datos_eventos"];
		if(isonline) {
			enviando = true;
			var datos = {
				'action':'getData'
			}
			$.ajax({
				type: 'POST',
				data: datos,
				dataType: 'json',
				url: apiURL,
				success: function (data) {
					enviando = false;
					datos_eventos = data.datos;
					$('.loading').remove();
					localStorage["datos_eventos"] = datos_eventos;
				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('.loading').remove();
					enviando = false;
					app.alerta('An error ocurred, try again latar, to update data.', 'Retriving data');
				}
			});
		} else {
			$('.loading').remove();
		}
	},
    ponerInfoUser: function(tipo=1) {
		if(tipo==1) {
			$('#homenombeve').html(datos_eventos.infohome.homenombeve);
			$('#homenombeve2').html(datos_eventos.infohome.homenombeve2);
		} else {
			$('.marcofoto').attr('src', userdata.baseurl+userdata.foto);
			$('#nombreperfil').html(userdata.nombre);
			$('#subremember').html(userdata.subremember);
		}
	},
    ponerHome: function() {
		$('.preapp').animate({
			'top': '100vh'
		}, 400, function(e) {
			$('.preapp').remove();
		});
    },
    alerta: function(cuerpo,title='Alerta',buttonsfooter=''){
		var acciones = '';
		$('#alerta .modal-footer').hide();
		if(buttonsfooter!='') {
			$('#alerta .modal-footer').show();
			acciones = buttonsfooter;
		}
		$('#alertatitle').html(title);
		$('#alerta .modal-body').html(cuerpo);
		$('#alerta .modal-footer').html(acciones);
		$('#alerta').modal('show');
    }
};

$(document).ready(function() {
	isonline = window.navigator.onLine;
	app.iniciar();
	$('#btnSincodigo').click(function(e) {
		e.preventDefault();
		$('#home1').removeClass('activa');
		app.ponerInfoUser(1);
		app.ponerHome();
	});
	
	$('.btnReset').click(function(e) {
		e.preventDefault();
		var contmodl = '<div class="boxrecupero"><div class="titModalRP">Enter your email:</div><input type="text" id="emailrecover" class="inputgen al_100 invert" /><button class="btnBlanco invert" id="btnIngresar">RECOVER</button><div id="remses"></div></div>';
		app.alerta(contmodl, 'Recover your code');
	});
	
	$('#alerta').on('click', '#btnIngresar',function(e) {
		e.preventDefault();
		var emailrecover = $('#emailrecover').val();
		if(emailrecover!='') {
			enviando = true;
			var datos = {
				'action':'coderecover',
				'emailrecover': emailrecover
			}
			$.ajax({
				type: 'POST',
				data: datos,
				dataType: 'json',
				url: apiURL,
				success: function (data) {
					enviando = false;
					if(data.res) {
						$('#remses').html('<div class="alert alert-success">An email has been sent to you with your code.</div>');
						setTimeout(function() {$('#alerta').modal('hide');}, 4000);
					} else {
						$('#remses').html('<div class="alert alert-danger">The email that you entered is not registered.</div>');
					}
				},
				error : function(xhr, ajaxOptions, thrownError) {
					$('#remses').html('<div class="alert alert-danger">An error has ocured. Try again later.</div>');
				}
			});
		} else {
			$('#remses').html('<div class="alert alert-danger">Please enter your email.</div>');
		}
	});
	
	$('#btnIngresar').click(function(e) {
		e.preventDefault();
		var tempcode = $('#usercode').val();
		if(tempcode!='') {
			enviando = true;
			var datos = {
				'action':'checkcode',
				'usercode': tempcode
			}
			$.ajax({
				type: 'POST',
				data: datos,
				dataType: 'json',
				url: apiURL,
				success: function (data) {
					enviando = false;
					if(data.res) {
						userdata = data.datos;
						localStorage["datos"] = userdata;
						$('#home2').removeClass('activa');
						app.ponerInfoUser(2);
						app.ponerHome();
					} else {
						app.alerta("The code that you enter is invalid.", 'Access with code');
					}
				},
				error : function(xhr, ajaxOptions, thrownError) {
					app.alerta("Can't connect to server. Try again later.", 'Access with code');
				}
			});
		} else {
			app.alerta('You must need to enter your code.', 'Access with code');
		}
	});
});
function setFilePath() {
    if(detectAndroid()) {   
        data_path = "file:///android_asset/www/res/db/";
        //4 Android
    } else {
        data_path = "res//db//";
        //4 apache//iOS/desktop
    }
}

function loadJSON(url) {
	return jQuery.ajax({
		url : url,
		async : false,
		dataType : 'json'
	}).responseText;
}

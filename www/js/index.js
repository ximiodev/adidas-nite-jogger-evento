var isonline = false;
var isOffline = true;
var enviando = false;
secTipo = 0;
var userdata = '';
var apiURL = "http://newcyclelabs.com.ar/addidasnitejogger/appConnector.php";
var datos_eventos;
var data_path = '';
var ventHome = "home2";
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
		document.addEventListener("backbutton", function(e){
			if(secTipo==0) {
				//navigator.app.exitApp();
			}
			if(secTipo==6) {
				$('#btnTurismo').click();
			}
			if(secTipo==7) {
				$('#btnInfluencers').click();
			}
			if(secTipo==8) {
				$('#btnEventos').click();
			}
			if(secTipo==1 || secTipo==2 || secTipo==3 || secTipo==4 || secTipo==5 ) {
				$('.header img').click();
			}
		}, false);
		var datos = {
			'action':'getData'
		}
		$.ajax({
			type: 'POST',
			data: datos,
			dataType: 'json',
			url: apiURL,
			success: function (data) {
				datos_eventos = data.datos;
				$('.loading').remove();
				localStorage["datos_eventos"] = datos_eventos;
				if(localStorage["codigo"]!=undefined) {
					app.cargarcodigo(localStorage["codigo"]);
					app.cargarDatos();
				} else {
					app.cargarDatos();
				}
			},
			error : function(xhr, ajaxOptions, thrownError) {
				$('.loading').remove();
				localStorage["datos_eventos"] = loadJSON(data_path + "datos/datos.json");
				datos_eventos = localStorage["datos_eventos"];
				enviando = false;
				app.alerta('An error ocurred, try again latar, to update data.', 'Retriving data');
			}
		});
	},
    cargarDatos: function() {
		//influencers
		var cant = datos_eventos["influencers"].length;
		var influ = datos_eventos["influencers"];
		var block = '';
		$('.influcont').html('');
		for(var i=0;i<cant;i++) {
			block = ''+
					'	<div class="col-xs-6 boxInfS">'+
					'		<div class="fotoInflu" onclick="app.ponerInfoInf('+i+')" style="background-image: url('+influ[i].baseurl+influ[i].imagen_header+');"></div>'+
					'		<a href="https://www.instagram.com/'+influ[i].instagram+'" rel="external" target="_system" class="redInflu">'+((influ[i].instagram!='')?'@':'')+influ[i].instagram+'</a>'+
					'		<a href="https://www.twitter.com/'+influ[i].twitter+'" rel="external" target="_system" class="redInflu">'+((influ[i].twitter!='')?'@':'')+influ[i].twitter+'</a>'+
					'	</div>';
			$('.influcont').append(block);
		}
		
		//eventos
		var cant = datos_eventos["eventos"].length;
		var event = datos_eventos["eventos"];
		var block = '';
		var dia = 0;
		$('.eventcont0').html('');
		$('.eventcont1').html('');
		for(var i=0;i<cant;i++) {
			block = ''+
					'<div class="row bloqueeve">'+
					'	<div class="col-xs-6">'+
					'		<div class="horaeve">'+event[i].hora+'</div>'+
					'	</div>'+
					'	<div class="col-xs-6 sepadadorrig">'+
					'		<div class="tituloeve">'+event[i].titulo+'</div>'+
					'		<div class="lugareve">'+event[i].lugar+'</div>'+
					'		<div class="btnVermas" onclick="app.ponerInfoEve('+event[i].dia+','+i+')">READ MORE &gt;</div>'+
					'	</div>'+
					'</div>';
			$('.eventcont'+event[i].dia+'').append(block);
		}
		
		
		//turismo
		var cant = datos_eventos["turismo"].length;
		var turi = datos_eventos["turismo"];
		var block = '';
		$('.turismocont').html('');
		for(var i=0;i<cant;i++) {
			block = ''+
					'	<div class="col-xs-12 boxTurS" onclick="app.ponerInfoTur('+i+')" style="background-image: url('+turi[i].baseurl+turi[i].imagen_header+');">'+
					'		<div class="fondoscTur"></div>'+
					'		<table class="turfond">'+
					'		<tr>'+
					'		<td>'+
					'		<div class="tituTuri">'+turi[i].nombre_lugar+'</div>'+
					'		<div class="descTuri">'+turi[i].descripcion_breve+'</div>'+
					'		</td>'+
					'		</tr>'+
					'		</table>'+
					'	</div>';
			$('.turismocont').append(block);
		}
		
		
		//guidelines
		var cant = datos_eventos["guidelines"].length;
		var turi = datos_eventos["guidelines"];
		var block = '';
		$('.guidelinescont').html('');
		for(var i=0;i<cant;i++) {
			block = '<img class="imgguide" src="'+turi[i].baseurl+turi[i].imagen+'">';
			$('.guidelinescont').append(block);
		}
		
	},
    volver: function(donde) {
		$('.ventana').removeClass('activa');
		$(donde).addClass('activa');
	},
    ponerInfoEve: function(dia,infid) {
		secTipo = 8;
		$('.ventana').removeClass('activa');
		var event = datos_eventos["eventos"];
		var block = '';
		$('.eventcontInt').html('');
		var i = infid;
		var imagen = (event[i].imagen!='')?'<img src="'+influ[i].baseurl+event[i].imagen+'" class="imgEve">':'';
		block = ''+
				'		<div class="col-xs-12">'+
				'			<div class="tituloEvento">'+event[i].titulo+'</div>'+
				'			<div class="lugarEvento">'+event[i].hora+' | '+event[i].lugar+'</div>'+
				'			<div class="descrEvento">'+event[i].descripcion+'</div>'+
				imagen+
				'		</div>';
		$('.eventcontInt').append(block);
		$('#eventosInt').addClass('activa');
	},
    ponerInfoInf: function(infid) {
		secTipo = 7;
		$('.ventana').removeClass('activa');
		var influ = datos_eventos["influencers"];
		var block = '';
		$('.influcontInt').html('');
		var i = infid;
		block = ''+
				'		<div class="col-xs-12">'+
				'			<img class="fotoInfluBig" src="'+influ[i].baseurl+influ[i].imagen_header+'">'+
				'			<div class="nombreInflu">'+influ[i].nombre_apellido+'</div>'+
				'			<a href="https://www.instagram.com/'+influ[i].instagram+'" id="instagram" rel="external" target="_system" class="redInflu">'+((influ[i].instagram!='')?'@':'')+influ[i].instagram+'</a>'+
				'			<a href="https://www.twitter.com/'+influ[i].twitter+'" id="twitter" rel="external" target="_system" class="redInflu">'+((influ[i].twitter!='')?'@':'')+influ[i].twitter+'</a>'+
				'			<div class="bioInflu">'+influ[i].bio+'</div>'+
				'			<img src="'+influ[i].baseurl+influ[i].imagen_botom+'" class="imgInflu">'+
				'		</div>';
		$('.influcontInt').append(block);
		$('#influencersInt').addClass('activa');
	},
    ponerInfoTur: function(turid) {
		secTipo = 6;
		$('.ventana').removeClass('activa');
		var turi = datos_eventos["turismo"];
		var block = '';
		$('.turismocontInt').html('');
		var i = turid;
		block = ''+
				'	<div class="col-xs-12 boxTurS" style="background-image: url('+turi[i].baseurl+turi[i].imagen_header+');">'+
				'		<table>'+
				'		<tr>'+
				'		<td>'+
				'		<div class="tituTuri">'+turi[i].nombre_lugar+'</div>'+
				'		<div class="descTuri">'+turi[i].descripcion_breve+'</div>'+
				'		</td>'+
				'		</tr>'+
				'		</table>'+
				'	</div>'+
				'	<div class="col-xs-12">'+
				'		<div class="descturism">'+turi[i].descripcion+'</div>'+
				'		<a href="'+turi[i].linkmap+'" target="_blank" class="btnMap">View on map</a>'+
				'	</div>';
		$('.turismocontInt').append(block);
		$('#turismoInt').addClass('activa');
	},
    ponerInfoUser: function(tipo=1) {
		if(tipo==1) {
			$('#homenombeve').html(datos_eventos.infohome.homenombeve);
			$('#homenombeve2').html(datos_eventos.infohome.homenombeve2);
		} else {
			var foto = (userdata.foto!="")?userdata.baseurl+userdata.foto:'images/userimg.jpg'
			$('.marcofoto').attr('src', foto);
			$('#nombreperfil').html(userdata.nombre);
			$('#subremember').html(userdata.subremember);
			$('#nombreperfil2').html(userdata.nombre);
			$('#subremember2').html(userdata.subremember);
			if(userdata.vuelo_vuelta=='') {
				$('#vuelovuelta').hide();
			}
			if(userdata.vuelo_salida_ida=='') {
				$('#vueloida').hide();
			}
			$('#vueloida .horasalida').html(userdata.hora_de_salida_ida);
			$('#vueloida .horallegada').html(userdata.hora_de_llegada_ida);
			$('#vueloida .diasalida').html(userdata.fecha_de_salida_ida);
			//~ $('#vueloida .diallegada').html(userdata.fecha_de_llegada_ida);
			$('#vueloida .codigoreserva').html(userdata.vuelo_salida_ida);
			$('#vueloida .asientoempresa').html(userdata.empresa_salida_ida+' | '+userdata.asiento_ida);
			
			$('#vuelovuelta .horasalida').html(userdata.hora_de_salida_vuelta);
			$('#vuelovuelta .horallegada').html(userdata.hora_de_llegada_vuelta);
			$('#vuelovuelta .diasalida').html(userdata.fecha_de_regreso_vuelta);
			//~ $('#vuelovuelta .diallegada').html(userdata.fecha_de_llegada_vuelta);
			$('#vuelovuelta .codigoreserva').html(userdata.vuelo_vuelta);
			$('#vuelovuelta .asientoempresa').html(userdata.empresa_vuelta+' | '+userdata.asiento_vuelta);
			
			
			$('.nombrehotel').html(userdata.hotel);
			$('.habitacion').html(userdata.habitacion);
			$('.checkin').html(userdata.hora_checkin);
			$('.checkout').html(userdata.hora_checkout);
			
			$('.nombrehotel').html(userdata.hotel);
			$('.habitacion').html(userdata.habitacion);
			$('.checkin').html('<b>CHECKIN</b>'+userdata.hora_checkin);
			$('.checkout').html('<b>CHECKOUT</b>'+userdata.hora_checkout);
			
			
			$('#telsudame').html('<b>SOUTH AMERICA</b><br>'+userdata.numero_asistencia_viajero);
			$('#telnort').html('<b>NORT AMERICA</b><br>'+userdata.numero_asistencia_viajero_norte);
			$('#telconta').html('<b>'+userdata.nombre_contacto+'</b><br>'+userdata.telefono_de_contacto);
			
			
		}
	},
    cargarcodigo: function(codigo) {
		enviando = true;
		var datos = {
			'action':'checkcode',
			'usercode': codigo
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
					localStorage["codigo"] = codigo;
					ventHome = "home1";
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
	alert("HOLA");
	app.initialize();
	app.iniciar();
	$('#btnSincodigo').click(function(e) {
		e.preventDefault();
		$('#home1').removeClass('activa');
		$('.perfilcont').html('<div class="textwarn">You must have a code to view this section.</div>');
		$('.poire').html('');
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
			app.cargarcodigo(tempcode);
		} else {
			app.alerta('You must need to enter your code.', 'Access with code');
		}
	});
	
	$('#btnBuscarInf').click(function(e) {
		e.preventDefault();
		var vts = $('#search').val();
		var busc = true;
		if(vts=='') {
			busc = false;
		}
		var cant = datos_eventos["influencers"].length;
		var influ = datos_eventos["influencers"];
		var block = '';
		$('.influcont').html('');
		for(var i=0;i<cant;i++) {
			if(buscar(influ[i].nombre_apellido, vts) || buscar(influ[i].tags_filtro, vts) || !busc) {
				block = ''+
						'	<div class="col-xs-6 boxInfS">'+
						'		<div class="linktoinfu fotoInflu" onclick="app.ponerInfoInf('+i+')" style="background-image: url('+influ[i].baseurl+influ[i].imagen_header+');"></div>'+
						'		<div class="linktoinfu nombreInflu" onclick="app.ponerInfoInf('+i+')">'+influ[i].nombre_apellido+'</div>'+
						'		<a href="https://www.instagram.com/'+influ[i].instagram+'" rel="external" target="_system" class="redInflu">'+((influ[i].instagram!='')?'@':'')+influ[i].instagram+'</a>'+
						'		<a href="https://www.twitter.com/'+influ[i].twitter+'" rel="external" target="_system" class="redInflu">'+((influ[i].twitter!='')?'@':'')+influ[i].twitter+'</a>'+
						'	</div>';
				$('.influcont').append(block);
			}
		}
	});
	
	$('#search').keypress(function(e) {
		if(e.which == 13) {
			$('#btnBuscarInf').click();
			$('#search').focusout();
			$('#search').blur();
			+$(':focus').blur();
			Keyboard.hide();
		}
	});
	
	$('.header img').click(function(e) {
		e.preventDefault();
		$('#btnInfluencers img').attr('src', 'images/influencers.png');
		$('#btnEventos img').attr('src', 'images/eventos.png');
		$('#btnTurismo img').attr('src', 'images/turismo.png');
		$('#btnGuideline img').attr('src', 'images/guideline.png');
		$('#btnPerfil img').attr('src', 'images/perfil.png');
		$('.ventana').removeClass('activa');
		$('#'+ventHome).addClass('activa');
		secTipo = 0;
	});
	
	$('.esdia1').click(function(e) {
		e.preventDefault();
		$('.eventcont1').removeClass('hidden');
		$('.eventcont0').addClass('hidden');
	});
	
	$('.esdia0').click(function(e) {
		e.preventDefault();
		$('.eventcont0').removeClass('hidden');
		$('.eventcont1').addClass('hidden');
	});
	
	
	//menu
	
	$('#btnInfluencers').click(function(e) {
		e.preventDefault();
		$('#btnInfluencers img').attr('src', 'images/influencers.png');
		$('#btnEventos img').attr('src', 'images/eventos.png');
		$('#btnTurismo img').attr('src', 'images/turismo.png');
		$('#btnGuideline img').attr('src', 'images/guideline.png');
		$('#btnPerfil img').attr('src', 'images/perfil.png');
		$('#btnInfluencers img').attr('src', 'images/influencers_over.png');
		$('.ventana').removeClass('activa');
		$('#influencers').addClass('activa');
		secTipo = 1;
	});
	
	$('#btnEventos').click(function(e) {
		e.preventDefault();
		$('#btnInfluencers img').attr('src', 'images/influencers.png');
		$('#btnEventos img').attr('src', 'images/eventos.png');
		$('#btnTurismo img').attr('src', 'images/turismo.png');
		$('#btnGuideline img').attr('src', 'images/guideline.png');
		$('#btnPerfil img').attr('src', 'images/perfil.png');
		$('#btnEventos img').attr('src', 'images/eventos_over.png');
		$('.ventana').removeClass('activa');
		$('#eventos').addClass('activa');
		secTipo = 2;
	});
	
	$('#btnTurismo').click(function(e) {
		e.preventDefault();
		$('#btnInfluencers img').attr('src', 'images/influencers.png');
		$('#btnEventos img').attr('src', 'images/eventos.png');
		$('#btnTurismo img').attr('src', 'images/turismo.png');
		$('#btnGuideline img').attr('src', 'images/guideline.png');
		$('#btnPerfil img').attr('src', 'images/perfil.png');
		$('#btnTurismo img').attr('src', 'images/turismo_over.png');
		$('.ventana').removeClass('activa');
		$('#turismo').addClass('activa');
		secTipo = 3;
	});
	
	$('#btnGuideline').click(function(e) {
		e.preventDefault();
		$('#btnInfluencers img').attr('src', 'images/influencers.png');
		$('#btnEventos img').attr('src', 'images/eventos.png');
		$('#btnTurismo img').attr('src', 'images/turismo.png');
		$('#btnGuideline img').attr('src', 'images/guideline.png');
		$('#btnPerfil img').attr('src', 'images/perfil.png');
		$('#btnGuideline img').attr('src', 'images/guideline_over.png');
		$('.ventana').removeClass('activa');
		$('#guidelines').addClass('activa');
		secTipo = 4;
	});
	
	$('#btnPerfil').click(function(e) {
		e.preventDefault();
		$('#btnInfluencers img').attr('src', 'images/influencers.png');
		$('#btnEventos img').attr('src', 'images/eventos.png');
		$('#btnTurismo img').attr('src', 'images/turismo.png');
		$('#btnGuideline img').attr('src', 'images/guideline.png');
		$('#btnPerfil img').attr('src', 'images/perfil.png');
		$('#btnPerfil img').attr('src', 'images/perfil_over.png');
		$('.ventana').removeClass('activa');
		$('#perfil').addClass('activa');
		secTipo = 5;
	});
});


	app.initialize();
	app.iniciar();
function setFilePath() {
    if(detectAndroid()) {   
        data_path = "file:///android_asset/www/res/db/";
        //4 Android
    } else {
        data_path = "res//db//";
        //4 apache//iOS/desktop
    }
}

function buscar(origen, busc) {
	var val = origen.toLowerCase().search(busc.toLowerCase());
	return (val!=-1);
}

function loadJSON(url) {
	return jQuery.ajax({
		url : url,
		async : false,
		dataType : 'json'
	}).responseText;
}

var isonline = false;
var isOffline = true;
var enviando = false;
var secTipo = 0;
var itemtur = 0;
var arrTurr = new Array();
var turi_cate;
var turi_cate_c;
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
				app.alerta('An error ocurred, try again later, to update data.', 'Retriving data');
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
					'	<div class="col-xs-6 boxInfS" onclick="app.ponerInfoInf('+i+')">'+
					'		<div class="fotoInflu" style="background-image: url('+influ[i].baseurl+influ[i].imagen_header+');"></div>'+
					'		<div class="redInflu">'+((influ[i].instagram!='')?'@':'')+influ[i].instagram+'</div>'+
					'		<div class="redInflu">'+((influ[i].twitter!='')?'@':'')+influ[i].twitter+'</div>'+
					'		<div class="pais">'+((influ[i].pais!='')?'@':'')+influ[i].pais+'</div>'+
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
					'		<div class="btnVermas" onclick="app.ponerInfoEve('+event[i].dia+','+i+')">MORE &gt;</div>'+
					'	</div>'+
					'</div>';
			$('.eventcont'+event[i].dia+'').append(block);
		}
		
		
		//turismo
		var cant = datos_eventos["turismo"].length;
		var turi = datos_eventos["turismo"];
		var block = '';
		//~ $('.turismocont').html('');
		//~ for(var i=0;i<cant;i++) {
			//~ block = ''+
					//~ '	<div class="col-xs-12 boxTurS" onclick="app.ponerInfoTur('+i+')" style="background-image: url('+turi[i].baseurl+turi[i].imagen_header+');">'+
					//~ '		<div class="fondoscTur"></div>'+
					//~ '		<table class="turfond">'+
					//~ '		<tr>'+
					//~ '		<td>'+
					//~ '		<div class="tituTuri">'+turi[i].nombre_lugar+'</div>'+
					//~ '		<div class="descTuri">'+turi[i].descripcion_breve+'</div>'+
					//~ '		</td>'+
					//~ '		</tr>'+
					//~ '		</table>'+
					//~ '	</div>';
			//~ $('.turismocont').append(block);
		//~ }
		
		
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
				'		</div>';
		$('.influcontInt').append(block);
		$('#influencersInt').addClass('activa');
	},
    ponerInfoTur: function(turid) {
		secTipo = 6;
		$('.ventana').removeClass('activa');
		var turi = datos_eventos["turismo"];
		var block = '';
		//~ $('.turismocontInt').html('');
		//~ var i = turid;
		//~ block = ''+
				//~ '	<div class="col-xs-12 boxTurS" style="background-image: url('+turi[i].baseurl+turi[i].imagen_header+');">'+
				//~ '		<table>'+
				//~ '		<tr>'+
				//~ '		<td>'+
				//~ '		<div class="tituTuri">'+turi[i].nombre_lugar+'</div>'+
				//~ '		<div class="descTuri">'+turi[i].descripcion_breve+'</div>'+
				//~ '		</td>'+
				//~ '		</tr>'+
				//~ '		</table>'+
				//~ '	</div>'+
				//~ '	<div class="col-xs-12">'+
				//~ '		<div class="descturism">'+turi[i].descripcion+'</div>'+
				//~ '		<a href="'+turi[i].linkmap+'" rel="external" target="_system" class="btnMap">View on map</a>'+
				//~ '	</div>';
		//~ $('.turismocontInt').append(block);
		$('#turismoInt').addClass('activa');
	},
    ponerInfoUser: function(tipo) {
		if(tipo==1) {
			$('#homenombeve').html(datos_eventos.infohome.homenombeve);
			$('#homenombeve2').html(datos_eventos.infohome.homenombeve2);
		} else {
			var foto = (userdata.foto!="")?userdata.baseurl+userdata.foto:'images/userimg.jpg';
			if(userdata.telcontacto!=undefined && userdata.telcontacto!='' && userdata.telcontacto!=null) {
				$('.btnTel').remove();
				$('.header').append('<a href="https://wa.me/'+userdata.telcontacto+'" rel="external" target="_system" class="btnTel"><img src="images/icono-soporte2.png"></a>');
			}
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
			if(userdata.vuelo_escala_ida!='') {
				$('#vueloida .coneccion_i').html('Flight scale: '+userdata.vuelo_escala_ida);
			}
			$('#vueloida .asientoempresa').html(userdata.empresa_salida_ida+' | '+userdata.asiento_ida);
			
			$('#vuelovuelta .horasalida').html(userdata.hora_de_salida_vuelta);
			$('#vuelovuelta .horallegada').html(userdata.hora_de_llegada_vuelta);
			$('#vuelovuelta .diasalida').html(userdata.fecha_de_regreso_vuelta);
			//~ $('#vuelovuelta .diallegada').html(userdata.fecha_de_llegada_vuelta);
			$('#vuelovuelta .codigoreserva').html(userdata.vuelo_vuelta);
			if(userdata.vuelo_escala_vuelta!='') {
				$('#vuelovuelta .coneccion_v').html(userdata.vuelo_escala_vuelta);
			}
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
    alerta: function(cuerpo,title,buttonsfooter){
		var acciones = '';
		$('#alerta .modal-footer').hide();
		if(buttonsfooter!=undefined) {
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
	app.initialize();
	app.iniciar();
	$('#btnSincodigo').click(function(e) {
		e.preventDefault();
		$('#home1').removeClass('activa');
		$('.perfilcont').html('<div class="textwarn">You must have a code to view this section.</div>');
		$('.footer').addClass('4botones');
		$('#btnPerfil').hide();
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
			//~ Keyboard.hide();
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
		$('.btnDia').removeClass('activo');
		$('.esdia1').addClass('activo');
		$('.eventcont1').removeClass('hidden');
		$('.eventcont0').addClass('hidden');
	});
	
	$('.esdia0').click(function(e) {
		e.preventDefault();
		$('.btnDia').removeClass('activo');
		$('.esdia0').addClass('activo');
		$('.eventcont0').removeClass('hidden');
		$('.eventcont1').addClass('hidden');
	});
	
	$('button.btnTurHome').click(function(e) {
		e.preventDefault();
		$('#detallelugar').animate({'left':'100%'}, 400);
	});
	
	$('button.btnTurAnte').click(function(e) {
		e.preventDefault();
		if(itemtur>0) {
			itemtur--;
			ponerItemTur(itemtur);
		}
	});
	
	$('button.btnTurSig').click(function(e) {
		e.preventDefault();
		if(itemtur<(arrTurr.length-1)) {
			itemtur++;
			ponerItemTur(itemtur);
		}
	});
	
	$('button.btnMapaRu, button.btnMapaRub').click(function(e) {
		e.preventDefault();
		$('#detallelugar').animate({'left':'0'}, 400);
		var cate = $(this).data('cate');
		$('.itemMapa').hide();
		$('.itemMapa.cate'+cate).show();
		ponerTuri(cate);
	});
	
	$('button.itemMapa').click(function(e) {
		e.preventDefault();
		var itemca = $(this).data('itemcate');
		itemtur = itemca;
		ponerItemTur();
	});
	
	$('button.btnMapaBo').click(function(e) {
		e.preventDefault();
		var quien = $(this).data('cual');
		if(quien=='#selectorMapa') {
			$('#selectorMapa').animate({'left':'0'}, 400);
			$('#selectorLista').animate({'left':'100%'}, 400);
		} else {
			$('#selectorLista').animate({'left':'0'}, 400);
			$('#selectorMapa').animate({'left':'-100%'}, 400);
		}
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
		$('#turismo .boxContInt').fadeOut(1).delay(600).fadeIn(400);
		
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
	
		document.addEventListener("backbutton", function(e){
			if(secTipo==1 || secTipo==2 || secTipo==3 || secTipo==4 || secTipo==5 ) {
				$('.header img').click();
			}
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
		}, false);
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

function ponerTuri(cate) {
	var cant = datos_eventos["turismo"].length;
	var turi = datos_eventos["turismo"];
	turi_cate = datos_eventos["turismo_cate"];
	turi_cate_c = datos_eventos["turismo_cate"].length;
	var datos_cate;
	arrTurr = new Array();
	for(var i=0;i<cant;i++) {
		if(turi[i].categoria_mapa==cate) {
			arrTurr.push(turi[i]);
		}
	}
	for(var i=0;i<turi_cate_c;i++) {
		if(turi_cate[i].ID==cate) {
			datos_cate = turi_cate[i];
		}
	}
	$('.titCateTur').html(datos_cate.nombre);
	$('.txtCateTur').html(datos_cate.descripcion);
	$('.seccionmapa').css({'background-image':'url(images/mapa_'+cate+'.jpg)'});
	itemtur = 0;
	ponerItemTur();
}

function ponerItemTur() {
	$('.titTur').html(arrTurr[itemtur].nombre_lugar);
	$('.textTur').html(arrTurr[itemtur].descripcion);
	if(arrTurr[itemtur].linkmap!="") {
		$('.btnLinkMapa').show();
		$('.btnLinkMapa').attr('href', arrTurr[itemtur].linkmap);
	} else {
		$('.btnLinkMapa').hide();
	}
	$('.imgTurSec').css({'background-image':'url('+arrTurr[itemtur].baseurl+arrTurr[itemtur].imagen_header+')'});
	$('.numturim').attr('src', 'images/tit_icon_'+(itemtur+1)+'.jpg');
}

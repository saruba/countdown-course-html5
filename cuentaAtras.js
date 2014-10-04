
//6 de Mayo a las 16:00
//Como es una fecha fija la obtenmos al principio
var fechaInicio = new Date(2013, 5, 6, 16, 00, 00);
//Tipo guarda el tipo de contador:
//(0: Completo, 1: sin dias, 2: sin horas, 3: sin minutos)
var tipo = 0;
//Creamos una variable para hacer posteriormente referencia al invervalo
var interval;

function cuentaAtras(){
	
	var ahora = new Date();
	//Descomentar para ver el resultado final
	//var ahora = new Date(2013, 5, 6, 16, 00, 00)
	var tiempo = new Date(fechaInicio - ahora);
	//Ajustamos el resultado
	var dias = tiempo.getDate() - 1;
	var horas = tiempo.getHours() - 1;
		if (horas < 0){ horas = 0; }
	var minutos = tiempo.getMinutes();
	var segundos = tiempo.getSeconds();

	//Combertimos el tiempo en segundos
	segundosTotales = ((horas + dias * 24) * 60 + minutos) * 60 + segundos;
	//Calculamos el porcentaje que debe tener la imagen
	porcentaje = tamanyoLogo(segundosTotales);
	//En caso de llegar la cuenta atras a 0 paramos el invalo:
	if (segundosTotales <= 0){
		clearInterval(interval);
		dias = horas = minutos = segundos = 0;
		document.getElementById('h1Cabecera').innerHTML ='Comenzamos el curso HTML5, CSS3 y JavaScript';
	}else{
		document.getElementById('spanLoading').innerHTML = porcentaje + '%';
	}

	//Dependiendo del tipo creamos la cuenta atras diferente
	str =  '';
	switch(tipo){
		case 0:
			str += "<div class='divNumeros'>" + "<div class='divNumero'>" + dias + "</div><p class='pSubTitulo'> Dias </p></div>";
			str += "<div class='divNumeros'>" + separarNumeros(horas) + "<p class='pSubTitulo'> Horas </p></div>";
			str += "<div class='divNumeros'>" + separarNumeros(minutos) + "<p class='pSubTitulo'> Minutos </p></div>";
			str += "<div class='divNumeros'>" +  separarNumeros(segundos) + "<p class='pSubTitulo'> Segundos </p></div>";
			break;
		case 1:
			horas = horas + dias * 24
			str += "<div class='divNumeros'>" + separarNumeros(horas) + "<p class='pSubTitulo'> Horas </p></div>";
			str += "<div class='divNumeros'>" + separarNumeros(minutos) + "<p class='pSubTitulo'> Minutos </p></div>";
			str += "<div class='divNumeros'>" +  separarNumeros(segundos) + "<p class='pSubTitulo'> Segundos </p></div>";
			break;
		case 2:
			minutos = (horas + dias * 24) * 60
			str += "<div class='divNumeros'>" + separarNumeros(minutos) + "<p class='pSubTitulo'> Minutos </p></div>";
			str += "<div class='divNumeros'>" +  separarNumeros(segundos) + "<p class='pSubTitulo'> Segundos </p></div>";
			break;
		default:
			str += "<div class='divNumeros'>" +  separarNumeros(segundosTotales) + "<p class='pSubTitulo'> Segundos </p></div>";
			break;
	}

	document.getElementById('divCuentaAtras').innerHTML = str;
}

function cuentaAtrasIntervalo(){
	//iniciamos la cuenta Atras
	cuentaAtras();
	//Cada segundo llamaremos a cuenta atras
	interval = self.setInterval(function(){cuentaAtras()}, 1000);
}

function cambioContador(){
	tipo++;
	if (tipo > 3){ tipo = 0;}
	//Cambiamos la imagen del bocadillo
	document.getElementById('divBocadillo').innerHTML = "<img src='img/"+tipo+".png'>";
	//Si esta detenida la cuenta atras hay que relanzarlo
	cuentaAtras();
}

function separarNumeros(numero){
	//Separamos los numeros en unidades para poder ponerles un fondo individual
	respuesta = '';
	for (var i = 1000000; i > 10; i=i/10){
		unidad = parseInt((numero / i) % 10);
		if (respuesta != '' || unidad > 0){
			respuesta +=  "<div class='divNumero'>" + unidad + '</div>';}
	}
	
	//Siempre representaremos un minimo de dos digitos
	decenas  = parseInt(numero % 100 /10);
	unidades = parseInt(numero % 10);
	respuesta += "<div class='divNumero'>" + decenas + '</div>';
	respuesta += "<div class='divNumero'>" + unidades + '</div>';
	
	return respuesta;
}

function tamanyoLogo(segundos){
	/*El valor de min seria el equivalente a 0%, variando este 
	valor podemos hacer que la imagen crezca mas rapidamente */
	//min = 1500000;
	min = 500000
	//min = 200000
	//Obtenemos el porcentaje que  ocupara la imagen
	var porcentaje = parseInt(100 - segundos * 100 / min);

	imgLogo = document.getElementById('imgLogo');
	//Calculamos el porcentaje sobre el tamaño real de la imagen
	imgLogo.style.width = (365 * porcentaje) / 100 +'px';
	imgLogo.style.height = (365 * porcentaje) / 100 +'px';
	return porcentaje;
}

//Documentacion:

//JavaScript
//http://www.w3schools.com/js/js_obj_date.asp
//http://www.w3schools.com/jsref/jsref_obj_date.asp
//http://www.w3schools.com/jsref/obj_window.asp

//Traer la frente un div:
//http://www.devtroce.com/2010/10/13/traer-al-frente-un-div-con-css/
//http://www.w3schools.com/cssref/pr_pos_z-index.asp
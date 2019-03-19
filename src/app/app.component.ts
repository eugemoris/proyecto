import { Component } from '@angular/core';
import * as $ from 'jquery';

var patrones = [];
var input_extra = [];
var list_output = [];
var cant_proc;
var contador = 1;
var cant_button;
var etapas;
var lista;
var cantidad_bits;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent {
  title = 'Simulador de Interconexiones';

}

function validarEntero(valor){ 
    //intento convertir a entero. 
    //si era un entero no le afecta, si no lo era lo intenta convertir 
     valor = parseInt(valor) 

    //Compruebo si es un valor numérico 
    if (isNaN(valor)) { 
       //entonces (no es numero) devuelvo el valor cadena vacia 
       return false; 
    }else{ 
       //En caso contrario (Si era un número) devuelvo el valor 
       return true; 
    } 
} 

window.onload = function () {

    $('#start').prop('disabled', true);
    $("#start").css("background-color", "grey");

    document.getElementById("p_shuffle").onclick = function (evt) {

        var k = prompt("Valor de K que desee utilizar: "); //verificar numero positivo
        while (validarEntero(k) == false){
            alert("El valor debe ser un numero positivo");
            var k = prompt("Valor de K que desee utilizar: ");
        }
        input_extra.push(parseInt(k));
        patrones.push(0);
        cant_proc = $("#cantProc").val();
        verificarBoton();

    }
    document.getElementById("bit_reversal").onclick = function (evt) {

        input_extra.push(-1); // no lleva valor extra
        patrones.push(1);
        cant_proc = $("#cantProc").val();

        verificarBoton();
    }
    document.getElementById("butterfly").onclick = function (evt) {
        
        var input_xi = prompt("Valor de K que desee utilizar: "); //verificar numero positivo
        while (validarEntero(input_xi) == false){
            alert("El valor debe ser un numero positivo");
            input_xi = prompt("Valor de K que desee utilizar: ");
        }

        input_extra.push(parseInt(input_xi));
        patrones.push(2);
        cant_proc = $("#cantProc").val();

        verificarBoton();
    }
    document.getElementById("exchange").onclick = function (evt) {

        var k = prompt("Valor de K que desee utilizar: "); //verificar numero positivo
        while (validarEntero(k) == false){
            alert("El valor debe ser un numero positivo");
            k = prompt("Valor de K que desee utilizar: ");
        }

        input_extra.push(parseInt(k));
        patrones.push(3);
        cant_proc = $("#cantProc").val();
        
        verificarBoton();
    }
    document.getElementById("barrel").onclick = function (evt) {
        var k = prompt("Valor de K que desee utilizar: "); //verificar numero positivo
        while (validarEntero(k) == false){
            alert("El valor debe ser un numero positivo");
            k = prompt("Valor de K que desee utilizar: ");
        }
        input_extra.push(parseInt(k));
        patrones.push(4);
        cant_proc = $("#cantProc").val();
        verificarBoton();
    }
    document.getElementById("baseline").onclick = function (evt) {

        var k = prompt("Valor de K que desee utilizar: "); //verificar numero positivo
        while (validarEntero(k) == false){
            alert("El valor debe ser un numero positivo");
            k = prompt("Valor de K que desee utilizar: ");
        }
        
        input_extra.push(parseInt(k));
        patrones.push(5);
        cant_proc = $("#cantProc").val();

        verificarBoton();
    }
    document.getElementById("start").onclick = function (evt) {
        calculatePatrons(cant_proc);
        console.log("proceso los valores");

        //llamas nuevo html

        //restart_values();

    }
    document.getElementById("restart").onclick = function (evt) {
        restart_values();
    }
    document.getElementById("cargar").onclick = function(evt){
        cargar();
        document.getElementById("0-0").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-0"));
        }
        document.getElementById("0-1").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-1"));
        }
        document.getElementById("0-2").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-2"));
        }
        document.getElementById("0-3").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-3"));
        }
        document.getElementById("0-4").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-4"));
        }
        document.getElementById("0-5").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-5"));
        }
        document.getElementById("0-6").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-6"));
        }
        document.getElementById("0-7").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-7"));
        }
        document.getElementById("0-8").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-8"));
        }
        document.getElementById("0-9").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-9"));
        }
        document.getElementById("0-10").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-10"));
        }
        document.getElementById("0-11").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-11"));
        }
        document.getElementById("0-12").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-12"));
        }
        document.getElementById("0-13").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-13"));
        }
        document.getElementById("0-14").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-14"));
        }
        document.getElementById("0-15").onclick = function(evt){
            funcion_dibujar(document.getElementById("0-15"));
        }
    }
}

function restart_values(){
    //vacio todas las variables
    patrones = [];
    input_extra = [];
    list_output = [];
    cant_proc=undefined;
    $('#cantProc').val(''); //vacio cuadro de cantidad de procesos
    $('#start').prop('disabled', true); //deshabilito boton start
    $("#start").css("background-color", "grey"); //coloreo fondo en gris para denotar deshabilitacion
    document.getElementById("total").innerHTML = "";
}

function verificarBoton(){
    if ((patrones.length > 0)&& (cant_proc!= undefined))
        {
            $('#start').prop('disabled', false);
            $("#start").css("background-color", "#1C738D");
        }
}

function generate_input(cantProcesadores){
    var input = [];
    var cant = 0;
    for (var i = 0; i < cantProcesadores; i++) {
        input.push(i);
    }
    return input;
}

function calculatePatrons(cantidad_procesadores) {

  var cantidad_bits_bin = (parseInt(cantidad_procesadores)).toString(2); // CAMBIO A PEDIR LOS BITS
  cantidad_bits = (cantidad_bits_bin.length) - 1;

  var continuar = false;
  if (patrones.length != 0) {
      continuar = true;
  }
  else {
      alert("No quedaron mas patrones");
  }

  while (continuar) {

      var x = patrones.shift();
      switch (x) {
          case 0:
              // codigo correspondiente a perfect shuflle
              var extra_value = input_extra.shift();
              var input = generate_input(cantidad_procesadores);
              var output = perfect_shuffle(input, cantidad_bits,extra_value);
              list_output.push(output);
              break;

          case 1:
            // codigo correspondiente a bit reversal
            var extra_value = input_extra.shift();
            var input = generate_input(cantidad_procesadores);
            var output = bit_reversal(input, cantidad_bits);
            list_output.push(output);
            break;

          case 2:
            // codigo correspondiente a butterfly
            var extra_value = input_extra.shift();
            var input = generate_input(cantidad_procesadores);
            var output = butterfly(input, cantidad_bits,extra_value);
            list_output.push(output);
            break;

          case 3:
            // codigo correspondiente a exchange
            var extra_value = input_extra.shift();
            var input = generate_input(cantidad_procesadores);
            var output = exchange(input, cantidad_bits,extra_value);
            list_output.push(output);
            break;

          case 4:
            // codigo correspondiente a barrel
            var extra_value = input_extra.shift();
            var input = generate_input(cantidad_procesadores);
            var output = barrel(input, cantidad_bits,extra_value);
            list_output.push(output);
            break;

          case 5:
            // codigo correspondiente a baseline
            var extra_value = input_extra.shift();
            var input = generate_input(cantidad_procesadores);
            var output = baseline(input, cantidad_bits,extra_value);
            list_output.push(output);
            break;

          default:
            var continuar = false;
            patrones = [];
            break;
      }
  }
}

function dec2bin(dec) {
  return (dec >>> 0).toString(2);
}

function bin2dec(bin) {
  return parseInt(bin, 2).toString(10);
}

function baseline(input, processors,k) { //processor nos da la cantidad de bits que se utilizan

    var size = input.length;
    var lista = [];
    var zeros = [];
    var lim = processors - parseInt(k) - 1;

    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }

    //convierto la lista de decimales en lista de valores binarios
    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2); //paso los valores a bianrios
        var output_arr = output_i.split('');
        output_arr = zeros.concat(output_arr);
        var output_arr2 = output_arr.slice(-processors, output_arr.length) //completo con cero los valores binarios para que tengan la misma cantidad que proccesors
        var out = output_arr2.toString();
        out = out.replace(/,/g, '');
        lista.push(out);
    }

    if (k <= processors) {
        var resultado = [];
        for (var j = 0; j <= lista.length - 1; j++) {

            // desde el ultimo elemento tantas veces como i haya
            var new_procesador = '';
            var ultimovalor = lista[j][lista[j].length - 1];
            var parte_alta = lista[j].substr(0, lim);
            for (var i = lim; i < processors - 1; i++) {
                new_procesador = new_procesador + lista[j][i];
            }

            new_procesador = ultimovalor + new_procesador;
            new_procesador = parte_alta + new_procesador;
            var dec = bin2dec(new_procesador);
            resultado.push(dec)
        }
        return resultado;
    } else {
        alert("K más grande que los bits.");
    }
}

function barrel(input,processor,k){
    var output=[];
    var ancho = input.length
    for (var i=0; i<k;i++){
        output.push(input[ancho-k+i]); //obtengo los valores de atras / dbo mantener el orden
    }
    var total = input.length - k;
    for (var j=0; j<total; j++){
        output.push(input.shift());//elimino el primer elemento del arreglo
    }
    //console.log(output);
    return output;
}

function exchange(input, processors,k) {

    var size = input.length;
    var output = [];
    var zeros = [];
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    k = processors - (k + 1);
    var i = 0;

    for (i = 0; i < size; i++) {
        var valor = input.shift(); //obtengo el primer valor de input
        var output_i = (valor >>> 0).toString(2); //paso los valores a bianrios
        var output_arr = output_i.split('');
        output_arr = zeros.concat(output_arr);
        output_arr = output_arr.slice(-processors, output_arr.length) //completo con cero los valores binarios para que tengan la misma cantidad que proccesors
        var out = output_arr.toString();
        out = out.replace(/,/g, '');
        output_i = out;
        var new_procesador = '';

        for (var j = 0; j <= output_i.length - 1; j++) {
            if (j == k) {
                if (output_i[j] === '0') {
                    new_procesador = new_procesador + '1';
                } else {
                    new_procesador = new_procesador + '0';
                }
            } else {
                new_procesador = new_procesador + output_i[j];
            }
        }
        var out = new_procesador.toString()

        out = out.replace(/,/g, '');
        var dec = bin2dec(out);
        output.push(dec);
        //output.push(new_procesador);
    }
    return output;
}

function butterfly(input, processors,xi) {

    var xj = (processors - 1) - xi;;
    var output = [];
    var zeros = [];
    var j =0;
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    var i=0;

    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2);
        var output_arr = output_i.split('');
        output_arr = zeros.concat(output_arr);
        output_arr = output_arr.slice(-processors, output_arr.length)
        var output_j = [];
        var length = output_arr.length;
        var Xi = output_arr[xi];
        var Xj = output_arr[xj]

        for (j = 0; j < length; j++) {
            if (j == xi) {
                output_j.push(Xj);
            }
            else if (j == xj) {
                output_j.push(Xi);
            }
            else {
                output_j.push(output_arr[j]);
            }
        }
        var out = output_j.toString()

        out = out.replace(/,/g, '');
        var dec = bin2dec(out);
        output.push(dec);
    }
    return output;

}

function bit_reversal(input, processors) {

    var output = [];
    var zeros = [];
    var j =0;
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    var i = 0;

    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2);
        var output_arr = output_i.split('');
        output_arr = zeros.concat(output_arr);
        output_arr = output_arr.slice(-processors, output_arr.length);
        var output_j = [];
        var length_arr = output_arr.length;

        for (j = 0; j < output_arr.length; j++) {
            output_j.unshift(output_arr[j]);
        }

        var out = output_j.toString();
        out = out.replace(/,/g, '');
        var dec = bin2dec(out);
        output.push(dec);

        output_arr = [];
        output_j = [];
        out = '';
        
    }
    return output;
}

function perfect_shuffle(input, processors,k) {

    var sh = Math.round(Math.log2(parseInt(k)));
    var output = [];
    var zeros = [];

    for (var j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;

    for (var i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2);
        var output_arr = output_i.split('');        
        output_arr = zeros.concat(output_arr);
        output_arr = output_arr.slice(-processors,output_arr.length)

        for (j = 0; j < sh; j++) {
            var last_value = output_arr[0];
            output_arr.shift();
            output_arr.push(last_value);
        }

        var out = output_arr.toString()
        out = out.replace(/,/g, '');
        var dec = bin2dec(out);
        output.push(dec)

        output_arr = [];
        out = '';
    }
    return output;
}

/*function funcion_dibujar(boton) {
    var one = true;
    var current_id = boton.id;
    console.log(current_id+'s');
    var next_id = "";
    var first_list = current_id[0];
    var second_list = current_id[2];
    var zona_id = "zona-1";
console.log("first_list"+first_list+" etapas"+etapas);
while(first_list < (etapas-1)){
    if(!one){
        first_list = contador;
        second_list = current_id[2];
        current_id=next_id;
        var pos_zona = parseInt(first_list)+1;
        zona_id = "zona-"+pos_zona;
        contador++;
    }else{
        one = false;
    }
    console.log(lista[first_list][second_list]);
    next_id = contador+"-"+lista[first_list][second_list];
    var first = document.getElementById(current_id);	
      var second = document.getElementById(next_id);
      var dibujo = document.getElementById(zona_id);
      
      if(document.getElementById(current_id+next_id) != undefined){
          if(jQuery("#"+current_id+next_id).css("visibility") == "hidden"){
              jQuery("#"+current_id+next_id).css("visibility", "visible");
          }else{
              jQuery("#"+current_id+next_id).css("visibility", "hidden");
          }
      }else{
        if(cantidad_bits > 3){
            var rect = first.getBoundingClientRect();
            var rect2 = second.getBoundingClientRect();
            var rect3 = dibujo.getBoundingClientRect();
            var more = document.getElementById(zona_id).innerHTML;
            more = more + '<line id="'+current_id+next_id+'" x1="'+(rect.left - rect3.left + 50)+'" y1="'+(rect.top - rect3.top + 13)+'" x2="'+(rect2.left - rect3.left)+'" y2="'+(rect2.top - rect3.top + 13)+'" style="visibility: visible; stroke:#f00; stroke-width:3"></line>';
            document.getElementById(zona_id).innerHTML = more;
        }else{
            var rect = first.getBoundingClientRect();
            var rect2 = second.getBoundingClientRect();
            var rect3 = dibujo.getBoundingClientRect();
            var more = document.getElementById(zona_id).innerHTML;
            more = more + '<line id="'+current_id+next_id+'" x1="'+(rect.left)+'" y1="'+(rect.top)+'" x2="'+(rect2.left)+'" y2="'+(rect2.top)+'" style="visibility: visible; stroke:#f00; stroke-width:3"></line>';
            document.getElementById(zona_id).innerHTML = more;
        }
    }
}
contador = 1;
}*/

function funcion_dibujar(boton) {
    //console.log("Entra Elvis");
        var one = true;
        var current_id = boton.id;
        var next_id = "";
        var first_list = current_id[0];
        var second_list = current_id[2];
        var zona_id = "zona-1";

    while(first_list < (etapas)){
        if(!one){
            //first_list = contador;
            second_list = current_id[2];
            current_id=next_id;
            var pos_zona = parseInt(first_list)+1;
            zona_id = "zona-"+pos_zona;
            contador++;
        }else{
            one = false;
        }
        //console.log("je"+first_list);
        next_id = contador+"-"+lista[first_list][second_list];
        var first = document.getElementById(current_id);    
        var second = document.getElementById(next_id);
        var dibujo = document.getElementById(zona_id);
        
        if(document.getElementById(current_id+next_id) != undefined){
            if(jQuery("#"+current_id+next_id).css("visibility") == "hidden"){
                jQuery("#"+current_id+next_id).css("visibility", "visible");
            }else{
                jQuery("#"+current_id+next_id).css("visibility", "hidden");
            }
        }else{
            if(cantidad_bits > 3){
                var rect = jQuery("#"+current_id).position();
                var rect2 = jQuery("#"+next_id).position();
                var rect3 = jQuery("#"+zona_id).position(); 
                //var rect = first.getBoundingClientRect();
                //var rect2 = second.getBoundingClientRect();
                //var rect3 = dibujo.getBoundingClientRect();
                var more = document.getElementById(zona_id).innerHTML;
                more = more + '<line id="'+current_id+next_id+'" x1="'+(rect.left - rect3.left + 50)+'" y1="'+(rect.top - rect3.top + 13)+'" x2="'+(rect2.left - rect3.left)+'" y2="'+(rect2.top - rect3.top + 13)+'" style="visibility: visible; stroke:#f00; stroke-width:4px"></line>';
                document.getElementById(zona_id).innerHTML = more;
            }else{
                //var rect = first.getBoundingClientRect();
                //var rect2 = second.getBoundingClientRect();
                //var rect3 = dibujo.getBoundingClientRect();

                var rect = jQuery("#"+current_id).position();
                var rect2 = jQuery("#"+next_id).position();
                var rect3 = jQuery("#"+zona_id).position(); 
                
                console.log("next_id:"+next_id);
                var more = document.getElementById(zona_id).innerHTML;
               // console.log("Boton 1:"+rect.left+"-"+rect.top);
               // console.log("Boton 2:"+rect2.left+"-"+rect2.top);
               // console.log("Zona:"+rect3.left+"-"+rect3.top);
                more = more + '<line id="'+current_id+next_id+'" x1="'+(rect.left - rect3.left + 34)+'" y1="'+(rect.top - rect3.top)+'" x2="'+(rect2.left - rect3.left)+'" y2="'+(rect2.top - rect3.top)+'" style="visibility: visible; stroke:#f00; stroke-width:4px"></line>';
                document.getElementById(zona_id).innerHTML = more;
            }
        }
    first_list++;
    }
    contador = 1;
}

function to_binary(num){
var binary = num.toString(2);
while(binary.length < cantidad_bits){
    binary = '0' + binary;
}
return binary;
}

function cargar(){
    
    //var lista = [["0", "1", "2", "3", "4", "5", "6", "7","8", "9", "10", "11", "12", "13", "14", "15"],["0", "4", "2", "13", "1", "5", "6", "7","10", "9", "8", "11", "12", "3", "14", "15"],["10", "1", "8", "5", "4", "3", "14", "7","2", "9", "0", "11", "12", "13", "6", "15"]];
lista = list_output;
console.log(list_output);
etapas = lista.length;
cant_button = lista[0].length;
console.log(cant_button);
get_ul_initial();
get_ul_2();
}

function get_ul_2() {
for (var i = 1; i <=etapas; i++) {
    var ultima_lista = document.getElementById("total").innerHTML;
    if(cantidad_bits > 3){
        var lista_html = '<svg id="zona-'+i+'" height="672" width="150" style="margin-top: 16px;"></svg>';
    }else{
        var lista_html = '<svg id="zona-'+i+'" height="337" width="150" style="margin-top: 16px;"></svg>';   
    }
    lista_html = lista_html+'<div style="margin-left: -40px;">';
        lista_html = lista_html+'<ul id="original">';
            var j = 0;
            while(j < cant_button){
                lista_html = lista_html+'<li style="padding: 3px; border: 1px solid #1c738d6b; list-style: none;"><button id="'+i+'-'+j+'" style="background-color: #1C738D;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);">'+to_binary(j)+'</button></li>';
                j++;
            }
        lista_html = lista_html+'</ul>';
    lista_html = lista_html+'</div>';
    document.getElementById("total").innerHTML = ultima_lista + lista_html;
}
}
function get_ul_initial() {
for (var i = 0; i <1; i++) {
    var ultima_lista = document.getElementById("total").innerHTML;
    var lista_html = '<div>';
        lista_html = lista_html+'<ul id="original">';
            var j = 0;
            while(j < cant_button){
                
                lista_html = lista_html + '<li style="padding: 3px; border: 1px solid #1c738d6b; list-style: none;"><button class="button-lineas" id="'+ i + '-' + j + '" (click)="funcion_dibujar(this)" style="background-color: #1C738D;border: none;color: white;text-align: center;text-decoration: none;display: inline-block;font-size: 16px;margin: 4px 2px;cursor: pointer;box-shadow: 0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19);">' + to_binary(j) + '</button></li>';
                j++;
            }
        lista_html = lista_html+'</ul>';
    lista_html = lista_html+'</div>';
    document.getElementById("total").innerHTML = ultima_lista + lista_html;

}
}
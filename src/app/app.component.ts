import { Component } from '@angular/core';
import * as $ from 'jquery';

var patrones = [];
var input_extra = [];
var list_output = [];
var cant_proc;

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
        restart_values();

    }
    document.getElementById("restart").onclick = function (evt) {
        restart_values();
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
  var cantidad_bits = (cantidad_bits_bin.length) - 1;

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




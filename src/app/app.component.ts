import { Component } from '@angular/core';
import * as $ from 'jquery';

var patrones = [];
var list_output = [];

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Simulador de Interconexiones';
}

window.onload = function () {
    
  document.getElementById("p_shuffle").onclick = function (evt) {
      patrones.push(0);
  }
  document.getElementById("bit_reversal").onclick = function (evt) {
      patrones.push(1);
  }
  document.getElementById("butterfly").onclick = function (evt) {
      patrones.push(2);
  }
  document.getElementById("exchange").onclick = function (evt) {
      patrones.push(3);
  }
  document.getElementById("barrel").onclick = function (evt) {
      patrones.push(4);
  }
  document.getElementById("baseline").onclick = function (evt) {
      patrones.push(5);
  }
  document.getElementById("start").onclick = function (evt) {
        var cantProc = $("#cantProc").val();
        //console.log("El valor es: "+ $("#cantProc").val());
        //console.log("patrones elegidos: " + patrones);
        calculatePatrons(cantProc);
  }
}

function calculatePatrons(cantidad_procesadores) {
  //var cantidad_procesadores = prompt("agregue la cantida de procesadores que desea"); //mas adelante va a ser cuadro de texto
  //var cantidad_bits = prompt("cantidad de bit a utilizar"); //mas adelante auto calcular
  //var cantidad_procesadores =8;
 

  //var cantidad_procesadores = jQuery("#cantProc").val()
    //console.log("cantidad procesadores: "+ cantidad_procesadores);
  var cantidad_bits_bin = (parseInt(cantidad_procesadores)).toString(2); // CAMBIO A PEDIR LOS BITS
  var cantidad_bits = (cantidad_bits_bin.length) - 1;
  //console.log("cantidad de bit : " + cantidad_bits);

  //var cantidad_bits =3;
  var input = [];
  var cant = 0;
  for (var i = 0; i < cantidad_procesadores; i++) {
      input.push(i);
  }
  var continuar = false;
  if (patrones.length != 0) {
      continuar = true;
  }
  else {
      alert("no se selecciono ningun patron")
  }
  //console.log(patrones);
  while (continuar) {
      //console.log(pat);
      var x = patrones.shift();
      switch (x) {
          case 0:
              // codigo correspondiente a perfect shuflle
              var output = perfect_shuffle(input, cantidad_bits);
              list_output.push(output);
              break;

          case 1:
              // codigo correspondiente a bit reversal
              var output = bit_reversal(input, cantidad_bits);
              list_output.push(output);
              break;

          case 2:
              // codigo correspondiente a butterfly
              var output = butterfly(input, cantidad_bits);
              list_output.push(output);
              break;

          case 3:
            // codigo correspondiente a exchange
            var output = exchange(input, cantidad_bits);
            list_output.push(output);
            break;

          case 4:
            // codigo correspondiente a barrel
            //var output = barrel(input, cantidad_bits);
            //list_output.push(output);
            break;

          case 5:
            // codigo correspondiente a baseline
            var output = baseline(input, cantidad_bits);
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

function baseline(input, processors) { //processor nos da la cantidad de bits que se utilizan
  var k = prompt("Valor de K que desee utilizar: ");
  var size = input.length;
  var lista = [];
  var zeros = [];
  var lim = processors - parseInt(k) - 1;
  //var lim = processors - k + 1;

  for (j = 0; j < processors; j++) {
      zeros.push("0");
  }
  //console.log("tamaño de input" + size)

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
  console.log("lista: " + lista);

  if (k <= processors) {
      console.log("entro al if");
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
          //resultado[j] = new_procesador;
          var dec = bin2dec(new_procesador);
          resultado.push(dec)
      }
      console.log(resultado); 
      return resultado;
  } else {
      alert("K más grande que los bits.");
  }
}

function exchange(input, processors) {
  //el input viene con los valores decimales
  var input_k = prompt("Valor de K que desee utilizar: ");
  var k = parseInt(input_k);
  var size = input.length;
  var output = [];
  var zeros = [];
  for (j = 0; j < processors; j++) {
      zeros.push("0");
  }
  k = processors - (k + 1);
  var i = 0;
  //console.log("tamaño de input" + size)
  for (i = 0; i < size; i++) {
      var valor = input.shift(); //obtengo el primer valor de input
      var output_i = (valor >>> 0).toString(2); //paso los valores a bianrios
      var output_arr = output_i.split('');
      output_arr = zeros.concat(output_arr);
      output_arr = output_arr.slice(-processors, output_arr.length) //completo con cero los valores binarios para que tengan la misma cantidad que proccesors
      var out = output_arr.toString();
      out = out.replace(/,/g, '');
      output_i = out;

      console.log("output_i" + output_i.length);
      
      console.log("valor de k: " + k );
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
      output.push(new_procesador);
      //var dec = bin2dec(new_procesador);
      //output.push(dec)
  }
  console.log("salida obtenia en exchange: ", output);
  return output;
}

function butterfly(input, processors) {

  console.log("input in butterfly" + input);
  var input_xi = prompt("Valor de I que desee utilizar: ");
  var xi = parseInt(input_xi);
  var xj = (processors - 1) - xi;;
  var output = [];
  var zeros = [];
  var j =0;
  for (j = 0; j < processors; j++) {
      zeros.push("0");
  }
  var size = input.length;
  //console.log("tamaño de input" + size)
  var i=0;
  for (i = 0; i < size; i++) {
      var valor = input.shift();

      var output_i = (valor >>> 0).toString(2);
      console.log("entrada butterfly en binario: " + output_i);

      var output_arr = output_i.split('');
      output_arr = zeros.concat(output_arr);
      output_arr = output_arr.slice(-processors, output_arr.length)
      var output_j = [];
      //console.log(output_i);
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
      //console.log(out);
      console.log('salida butterfly en binario: ' + out);
      var dec = bin2dec(out);
      output.push(dec)
      console.log("salida del butterfly: " + dec)
  }
  return output;

}

function bit_reversal(input, processors) {
    console.log("entrada de bit reversal: " + input);

    var output = [];
    var zeros = [];
    var j =0;
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    //console.log("tamaño de input" + size)
    var i = 0;
    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2);
        var output_arr = output_i.split('');
        output_arr = zeros.concat(output_arr);
        output_arr = output_arr.slice(-processors, output_arr.length)
        var output_j = [];
        //console.log(output_i);
        var length_arr = output_arr.length;
        for (j = 0; j < output_arr.length; j++) {
            output_j.unshift(output_arr[j]);
        }
        //console.log(output_j);

        var out = output_j.toString()

        out = out.replace(/,/g, '');
        //output.push(out);
        //console.log(out);
        var dec = bin2dec(out);
        output.push(dec)
        console.log("salida de bit reversal: " + dec);

        output_arr = [];
        output_j = [];
        out = '';
        
    }
    return output;
}

function perfect_shuffle(input, processors) {
    console.log("entrada de perfect shuffle: " + input);
    var k = prompt("Valor de K que desee utilizar: ");
    var sh = Math.round(Math.log2(parseInt(k)));
    var output = [];
    var zeros = [];
    //var j = 0;
    for (var j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    //console.log("tamaño de input" + size)
    for (var i = 0; i < size; i++) {
        var valor = input.shift();

        var output_i = (valor >>> 0).toString(2);
        var output_arr = output_i.split('');        
        output_arr = zeros.concat(output_arr);
        output_arr = output_arr.slice(-processors,output_arr.length)
        //console.log(output_i);

        for (j = 0; j < sh; j++) {
            var last_value = output_arr[0];
            output_arr.shift();
            output_arr.push(last_value);
        }

        var out = output_arr.toString()

        out = out.replace(/,/g, '');
        //output.push(out);
        //console.log(out);
        var dec = bin2dec(out);
        output.push(dec)
        console.log("salida oerfect shuffle " + dec);

        output_arr = [];
        out = '';
    }
    //console.log(output);
    return output;
}




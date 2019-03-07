// Ponga el código aquí.

//perfect shuple
//butterfly
//bit reversal
var patrones = [];

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
        calculatePatrons();
    }
}


function calculatePatrons() {
    var cantidad_procesadores = prompt("agregue la cantida de procesadores que desea");
    var cantidad_bits = prompt("cantidad de bit a utilizar");
    var input = [];
    var cant = 0;
    for (i = 0; i < cantidad_procesadores; i++) {
        input.push(i);
    }
    var cotinuar = false;
    if (patrones.length != 0) {
        continuar = true;
    }
    else {
        alert("no se selecciono ningun patron")
    }
    console.log(patrones);
    while (continuar) {
        //console.log(pat);
        x = patrones.shift();
        switch (x) {
            case 0:
                // codigo correspondiente a perfect shuflle
                console.log("entro en cero");
                output = perfect_shuffle(input, cantidad_bits);
                console.log(output);
                //momento para graficar
                input = output; //salida de metodos en decimales
                break;
            case 1:
                // codigo correspondiente a bit reversal
                console.log("entro en uno" + input);

                output = bit_reversal(input, cantidad_bits);
                //momento para graficar
                input = output; //salida de metodos en decimales
                break;
            case 2:
                // codigo correspondiente a butterfly
                console.log("entro en dos" + input);

                output = butterfly(input, cantidad_bits);
                //momento para graficar
                input = output; //salida de metodos en decimales
                break;
            case 3:
                // codigo correspondiente a exchange
                output = exchange(input, cantidad_bits);
                input = output;
                break;
            case 4:
                output = barrel(input, cantidad_bits);
                input = output;
                // codigo correspondiente a barrel
                break;
            case 5:
                output = baseline(input, cantidad_bits);
                input = output;
                // codigo correspondiente a baseline
                break;
            default:
                //   console.log("entra por default" + x);
                continuar = false;
                patrones = NaN;
                break;
            // code block
        }
        //console.log("final" + pat);
    }
}


function baseline(input, processors) { //processor nos da la cantidad de bits que se utilizan
    var k = prompt("Valor de K que desee utilizar: ");
    var size = input.length;
    var lista = [];
    var zeros = [];
    var lim = processors - k - 1;
    //var lim = processors - k + 1;

    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    //console.log("tamaño de input" + size)

    //convierto la lista de decimales en lista de valores binarios
    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2); //paso los valores a bianrios
        output_i = output_i.split('');
        output_i = zeros.concat(output_i);
        output_i = output_i.slice(-processors, output_i.lenght) //completo con cero los valores binarios para que tengan la misma cantidad que proccesors
        var out = output_i.toString();
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
            /dec = bin2dec(new_procesador);
            /resultado.push(dec)
        }
        console.log(resultado); 
        return resultado;
    } else {
        alert("K más grande que los bits.");
    }
}

function barrel(input, processors) {
    var k = prompt("Valor de K que desee utilizar: ");
    var size = input.length;
    //var output = [];
    var lista = [];
    var zeros = [];
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2); //paso los valores a bianrios
        output_i = output_i.split('');
        output_i = zeros.concat(output_i);
        output_i = output_i.slice(-processors, output_i.lenght) //completo con cero los valores binarios para que tengan la misma cantidad que proccesors
        var out = output_i.toString();
        out = out.replace(/,/g, '');
        lista.push(out);
    }
    var cant = lista[0].length;
    if ((k < cant) && (k > -cant)) {
        var resultado = [];
        for (var i = 0; i <= lista.length - 1; i++) {
            var procesador = lista[i];
            var corte = false;
            while (k > 0) {
                var new_procesador = '';
                for (var i = procesador.length - 1; i >= 0; i--) {
                    if (!corte) {
                        if (procesador[i] === '0') {
                            new_procesador = '1' + new_procesador;
                            corte = true;
                        } else {
                            new_procesador = '0' + new_procesador;
                        }
                    } else {
                        new_procesador = procesador[i] + new_procesador;
                    }
                }
                procesador = new_procesador;
                corte = false;
                k--;
            }
            resultado[i] = new_procesador;
        }
        console.log(resultado);
        return resultado;
    } else {
        alert('Error, "k" es mayor a la cantidad de bits.');
    }


}

function exchange(input, processors) {
    //el input viene con los valores decimales
    var k = prompt("Valor de K que desee utilizar: ");
    var size = input.length;
    var output = [];
    var zeros = [];
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var k = processors - (k + 1);
    //console.log("tamaño de input" + size)
    for (i = 0; i < size; i++) {
        var valor = input.shift(); //obtengo el primer valor de input
        var output_i = (valor >>> 0).toString(2); //paso los valores a bianrios
        output_i = output_i.split('');
        output_i = zeros.concat(output_i);
        output_i = output_i.slice(-processors, output_i.lenght) //completo con cero los valores binarios para que tengan la misma cantidad que proccesors
        var out = output_i.toString();
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
        //output.push(new_procesador);
        dec = bin2dec(new_procesador);
        output.push(dec)
    }
    console.log("salida obtenia en exchange: ", output);
    return output;
}


function butterfly(input, processors) {

    console.log("input in butterfly" + input);
    var xi = prompt("Valor de I que desee utilizar: ");
    var xj = (processors - 1) - xi;;
    var output = [];
    var zeros = [];
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    //console.log("tamaño de input" + size)
    for (i = 0; i < size; i++) {
        var valor = input.shift();

        var output_i = (valor >>> 0).toString(2);
        console.log("entrada butterfly en binario: " + output_i);

        output_i = output_i.split('');
        output_i = zeros.concat(output_i);
        output_i = output_i.slice(-processors, output_i.lenght)
        output_j = [];
        //console.log(output_i);
        var length = output_i.length;
        var Xi = output_i[xi];
        var Xj = output_i[xj]

        for (j = 0; j < length; j++) {
            if (j == xi) {
                output_j.push(Xj);
            }
            else if (j == xj) {
                output_j.push(Xi);
            }
            else {
                output_j.push(output_i[j]);
            }
        }
        var out = output_j.toString()

        out = out.replace(/,/g, '');
        //console.log(out);
        console.log('salida butterfly en binario: ' + out);
        dec = bin2dec(out);
        output.push(dec)
        console.log("salida del butterfly: " + dec)
    }
    return output;

}


function bit_reversal(input, processors) {
    console.log("entrada de bit reversal: " + input);

    var output = [];
    var zeros = [];
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    //console.log("tamaño de input" + size)
    for (i = 0; i < size; i++) {
        var valor = input.shift();
        var output_i = (valor >>> 0).toString(2);
        output_i = output_i.split('');
        output_i = zeros.concat(output_i);
        output_i = output_i.slice(-processors, output_i.lenght)
        output_j = [];
        //console.log(output_i);

        for (j = 0; j < output_i.length; j++) {
            output_j.unshift(output_i[j]);
        }
        //console.log(output_j);

        var out = output_j.toString()

        out = out.replace(/,/g, '');
        //output.push(out);
        //console.log(out);
        dec = bin2dec(out);
        output.push(dec)
        console.log("salida de bit reversal: " + dec);

        output_i = NaN;
        output_j = NaN;
        out = NaN;
        
    }
    return output;

}

function perfect_shuffle(input, processors) {
    console.log("entrada de perfect shuffle: " + input);
    var k = prompt("Valor de K que desee utilizar: ");
    var sh = Math.round(Math.log2(k));
    var output = [];
    var zeros = [];
    for (j = 0; j < processors; j++) {
        zeros.push("0");
    }
    var size = input.length;
    //console.log("tamaño de input" + size)
    for (i = 0; i < size; i++) {
        var valor = input.shift();

        var output_i = (valor >>> 0).toString(2);
        output_i = output_i.split('');        
        output_i = zeros.concat(output_i);
        output_i = output_i.slice(-processors,output_i.lenght)
        //console.log(output_i);

        for (j = 0; j < sh; j++) {
            last_value = output_i[0];
            output_i.shift();
            output_i.push(last_value);
        }

        var out = output_i.toString()

        out = out.replace(/,/g, '');
        //output.push(out);
        //console.log(out);
        dec = bin2dec(out);
        output.push(dec)
        console.log("salida oerfect shuffle " + dec);

        output_i = NaN;
        out = NaN;
    }
    //console.log(output);
    return output;
}

function dec2bin(dec) {
    return (dec >>> 0).toString(2);
}

function bin2dec(bin) {
    return parseInt(bin, 2).toString(10);
}

function sayHello() {
    var pepe = prompt("Dime tu nombre", "ejemplo de nombre");
    var messageDialog = new Windows.UI.Popups.MessageDialog(pepe, "Alert");
    messageDialog.showAsync();
}




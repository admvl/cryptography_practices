 // Obtención de ID
const nInput = document.getElementById("nInput");
const nResult = document.getElementById("nResult");
const alphaInput = document.getElementById("alphaInput");
const alphaResult = document.getElementById("alphaResult");
const betaInput = document.getElementById("betaInput");
const betaResult = document.getElementById("betaResult");
const reducirP = document.getElementById('reducir');


function mostrarValor() {
    const nValor = parseInt(nInput.value);
    const nResultadoMuestra = nResult;
    nResultadoMuestra.innerHTML = "Valor de n seleccionado: " + nValor;

    const alphaValor = parseInt(alphaInput.value);
    const alphaResultadoMuestra = alphaResult;
    alphaResultadoMuestra.innerHTML = "Valor de α: " + alphaValor;

    const betaValor = parseInt(betaInput.value);
    const betaResultadoMuestra = betaResult;
    betaResultadoMuestra.innerHTML = "Valor de β: " + betaValor;
    let inversoAditivo = 0;

    // Verifica que Beta está en el conjunto
    if (betaValor > 0 && betaValor <= nValor) {
        console.log(betaValor + " Pertenece al conjunto de (0, " + nValor + "]");
        const resultadoPertenece = document.getElementById("resultadoPertenece");
        const muestraPertenece = resultadoPertenece;
        muestraPertenece.innerHTML = "β Pertenece al conjunto de (0, " + nValor + "]"

        inversoAditivo = nValor - betaValor;
        const muestraInvAd = document.getElementById("inversoAditivo");
        muestraInvAd.innerHTML = '<h4>Inverso Aditivo Obtenido: </h4>' + inversoAditivo;
    } else {
        console.log(betaValor + " No pertenece al conjunto de (0 " + nValor + "]");
        const resultadoNoPertenece = document.getElementById("resultadoNoPertenece");
        const muestraNoPertenece = resultadoNoPertenece;
        muestraNoPertenece.innerHTML = "β No pertenece al conjunto de (0 " + nValor + "]";
    }

    // Algoritmo de Euclides
    function algEuclides(alphaValor, nValor) {
        while (nValor !== 0) {
            const valorActual = nValor;
            nValor = alphaValor % nValor;
            alphaValor = valorActual;
        }
        return alphaValor;
    }

    const mcd = algEuclides(alphaValor, nValor);

    if (mcd === 1) {
        console.log(`MCD (${alphaValor}, ${nValor}) = 1. Son coprimos`);
        const resultadoCoprimo = document.getElementById("resultadoCoprimo");
        const coprimoMuestra = resultadoCoprimo;
        coprimoMuestra.innerHTML = `MCD (${alphaValor}, ${nValor}) = 1. Son coprimos`;

        console.log('Calcular inverso Multiplicativo')
        const inversoMultiplicativo = calculaAEE(alphaValor, nValor);
        const inversoMuestra = document.getElementById("inversoMultiplicativo");
        inversoMuestra.innerHTML='<h4>Inverso Multiplicativo Obtenido: </h4>' + inversoMultiplicativo; 
        console.log('Inverso obtenido: ' + inversoMultiplicativo);

        const funcCifradoObt = document.getElementById("cifradoRes");
        funcCifradoObt.innerHTML = '<h4>Función de Cifrado Obtenida: </h4> <p>C = ' +  alphaValor + ' * p + ' +
        betaValor + ' mod ' + nValor + '</p>';
        
        const funcDescifradoObt = document.getElementById("descifradoRes");
        funcDescifradoObt.innerHTML = '<h4>Función de Descifrado Obtenida: </h4> <p>p = ' + inversoMultiplicativo + 
        '[C + ' + inversoAditivo + '] mod ' + nValor + '</p>';

        const funcReducida = document.getElementById("descifradoRed");
        let aux = (inversoMultiplicativo * inversoAditivo) % nValor;
        funcReducida.innerHTML = '<h4>Función de Descifrado Reducida: </h4> <p>p = ' + inversoMultiplicativo + 
        '*C + ' + aux + ' mod ' + nValor + '</p>';

        

    } else {
        console.log(`MCD (${alphaValor}, ${nValor}) ≠ 1. No son coprimos. Por favor ingrese un valor válido`);
        const resultadoNoCoprimo = document.getElementById("resultadoNoCoprimo");
        const noCoprimoMuestra = resultadoNoCoprimo;
        noCoprimoMuestra.innerHTML = `MCD (${alphaValor}, ${nValor}) ≠ 1. No son coprimos. Por favor ingrese un valor válido`;

    }

    function calculaAEE(alfa, n) {
        let x0 = 1,
            x1 = 0,
            y0 = 0,
            y1 = 1,
            a = alfa,
            b = n;
        while (b !== 0) {
            const cociente = Math.floor(a / b);
            console.log("alfa: " + a);
            const r = a % b;
            const x2 = x0 - cociente * x1;
            const y2 = y0 - cociente * y1;

            a = b;
            b = r;
            x0 = x1;
            x1 = x2;
            y0 = y1;
            y1 = y2;
        }

        if (a !== 1) {
            // No existe un inverso multiplicativo si el MCD no es igual a 1
            return null;
        } else {
            // Asegurarse de que el inverso sea positivo
            if (x0 < 0) {
                x0 += n;
            }
            console.log("inverso: ", + x0);
            return x0;
        }
        console.log("inverso: ", + x0);
        return x0;
    };

}


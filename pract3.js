 // Obtención de ID
const nInput = document.getElementById("nInput");
const nResult = document.getElementById("nResult");
const alphaInput = document.getElementById("alphaInput");
const alphaResult = document.getElementById("alphaResult");
const betaInput = document.getElementById("betaInput");
const betaResult = document.getElementById("betaResult");


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


    // Verifica que Beta está en el conjunto
    if (betaValor > 0 && betaValor <= nValor) {
        console.log(betaValor + " Pertenece al conjunto de (0, " + nValor + "]");
        const resultadoPertenece = document.getElementById("resultadoPertenece");
        const muestraPertenece = resultadoPertenece;
        muestraPertenece.innerHTML = "β Pertenece al conjunto de (0, " + nValor + "]"

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
    } else {
        console.log(`MCD (${alphaValor}, ${nValor}) ≠ 1. No son coprimos. Por favor ingrese un valor válido`);
        const resultadoNoCoprimo = document.getElementById("resultadoNoCoprimo");
        const noCoprimoMuestra = resultadoNoCoprimo;
        noCoprimoMuestra.innerHTML = `MCD (${alphaValor}, ${nValor}) ≠ 1. No son coprimos. Por favor ingrese un valor válido`;

    }



}

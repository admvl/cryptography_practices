document.addEventListener('DOMContentLoaded', function() { // Cuando se cargue todo el HTML se activa

    // Se declaran las constantes con los ID del HTML
    const descargaCifrado = document.getElementById('descargaCifrado');
    const textoArchivo = document.getElementById("textoArchivo");
    const multNumber = document.getElementById("multNumber");
    const adiNumber = document.getElementById("adiNumber");
    const numericResult = document.getElementById("numericResult");
    const letraResult = document.getElementById("letraResult");
    const fileInput = document.getElementById("fileInput");

    let letraANumero = {}; // Objeto vacío para mapear letras a números
    
    /** MOSTRAR ARCHIVO EN TEXTAREA **/
    fileInput.addEventListener('change', function(event) { // Cuando cargue el archivo del fileInput
        const file = event.target.files[0]; // Se obtiene el archivo selccionado en el fileInput.
        if (file) {
            const reader = new FileReader(); // Se crea objeto FileReader para leer el contenido del archivo
            reader.onload = function (e) { // Función que se ejecutará cuando se cargue y lea el archivo
                const contenidoArchivo = e.target.result; // Se obtiene el contenido del archivo
                textoArchivo.value = contenidoArchivo; // Se muestra el contenido en el textarea 1

                const alfabeto = 'abcdefghijklmnopqrstuvwxyz'; // Cadena con el alfabeto
                for (let i = 0; i < alfabeto.length; i++) {
                    letraANumero[alfabeto[i]] = i; // Se asigna un valor numérico a cada letra
                }

                const valorMulti = parseInt(multNumber.value); // Se obtiene el número del input de multiplicativo
                const valorAditivo = parseInt (adiNumber.value); // Se obtiene el número del input del aditivo

                const resultNumero = []; // Arreglo vacío para almacenar los resultados numéricos al cifrar
                const resultLetra = []; // Arreglo vacío para almacenar los resultados de las letras al cifrar

                for (let i = 0; i < contenidoArchivo.length; i++) { // Recorre cada carácter
                    const caracter = contenidoArchivo[i].toLowerCase(); // Se obtiene el caracter actual del contenido y se vuelven minúsculas
                    if (letraANumero.hasOwnProperty(caracter)) { // Se verifica si el caracter actual está en el alfabeto
                        const numOriginal = letraANumero[caracter]; // Si el caracter actual pertenece al alfabeto, se obtiene su equivalente en número
                        const numConvertido = ((numOriginal * valorMulti) + valorAditivo) % 26; // Se calcula el número del caracter.

                        resultNumero.push(numConvertido); // El resultado del cálculo se agrega a resultNumero, donde están los resultados de los números cifrados
                        resultLetra.push(alfabeto[numConvertido]); // El resultado del número a letra se agrega al arreglo de resultLetra

                        console.log(`${caracter}: ${numOriginal}  (modificado: ${numConvertido})`);
                    } else {
                        resultNumero.push('');
                        resultLetra.push(contenidoArchivo[i]);
                    }

                }

                numericResult.value = resultNumero.join(' '); // Los resultados de números se vuelven a cadena y se muestran en el textarea 2. Se usa espacio para identificar mejor los números
                letraResult.value = resultLetra.join(''); // Los resultados de letras se vuelven cadena y se muestran en el textarea 3

            };
            reader.readAsText(file); // Lectura del archivo de texto. Al realizarse se activa reader.onlad
        }
    });

        
        /** BOTON DESCARGAR CIFRADO **/
        descargaCifrado.addEventListener("click", function(){ // Al hacer click al botón de descarga
            const textoResultado = letraResult.value; // Se obtiene el valor del textarea 3 
            const blob = new Blob([textoResultado], {type: "text/plain"}); // Se crea Blob y se especifica que es texto plano
            const url = URL.createObjectURL(blob); // Se crea una url con referencia al blob

            const enlace = document.createElement('a'); // Se crea un enlace 'a' en HTML
            enlace.href = url; // Dirección hacia la url (blob)
            enlace.download = "cancion_c"; // Se indica el nombre del archivo cuando se descargue
            enlace.click(); // Se activa la descarga

            URL.revokeObjectURL(url); // Cuando se descarga, se revoca la URL para liberar recursos
        })
});



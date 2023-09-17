document.addEventListener('DOMContentLoaded', function() {

    /** DECLARACIÓN DE CONSTANTES **/
    const fileInput = document.getElementById("fileInput");
    const fileInputDes = document.getElementById("fileInputDes");
    const botonCifrar = document.getElementById("botonCifrar");
    const textoCifrado = document.getElementById("textoCifrado");
    const botonDescifrar = document.getElementById("botonDescifrar");
    const textoDescifrado = document.getElementById("textoDescifrado");
    const descargaCifrado = document.getElementById("descargaCifrado");
    const descargaDescifrado = document.getElementById("descargaDescifrado");

    /** BOTÓN CIFRAR **/
    botonCifrar.addEventListener("click", function() {
        const file = fileInput.files[0];

        if (file) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const textoMostrado = event.target.result;
                const contraseña = prompt("Ingrese la contraseña para cifrar:");

                if (contraseña) {
                    const encrypted = CryptoJS.AES.encrypt(textoMostrado, contraseña);
                    textoCifrado.value = encrypted.toString();
                    alert("El archivo se ha cifrado correctamente.");
                } else {
                    alert ("Debe ingresar una contraseña válida");
                }
            };
            reader.readAsText(file);
        } else {
            alert("Seleccione un archivo para cifrar");
        }
    });

    /** BOTON DESCIFRAR **/


    // botonDescifrar.addEventListener("click", function() {
    //     const valorCifrado = textoCifrado.value;
    //     const contraseña = prompt("Ingrese la contraseña para descifrar:");

    //     if(contraseña) {
    //         try {
    //             const descifrado = CryptoJS.AES.decrypt(valorCifrado, contraseña);
    //             const textoDescifradoValue = descifrado.toString(CryptoJS.enc.Utf8);
    //             textoDescifrado.value = textoDescifradoValue;
    //             alert("El archivo se ha descifrado correctamente");
    //         } catch(error) {
    //             alert("Error al descifrar. Verificar contraseña");
    //         }
    //     } else {
    //         alert ("Debe ingresar una contraseña");
    //     }
    // });


    /** BOTON DESCIFRAR **/
    botonDescifrar.addEventListener("click", function() {
        const fileDes = fileInputDes.files[0];

        if (fileDes) {
            const reader = new FileReader();

            reader.onload = function (event) {
                const valueDes = event.target.result;
                const contraseña = prompt("Ingresar contraseña para descifrar");

                if (contraseña) {
                    try {
                        const descifrado = CryptoJS.AES.decrypt(valueDes, contraseña);
                        const textoDescifradoValue = descifrado.toString(CryptoJS.enc.Utf8);
                        textoDescifrado.value = textoDescifradoValue;
                        alert("Archivo descifrado correctamente");
                    } catch (error) {
                        alert("Error al descifrar el archivo.");
                    }
                } else {
                    alert("Ingresar una contraseña para descifrar");
                }
            };
            reader.readAsText(fileDes);
        } else {
            alert("Seleccionar un archivo de texto cifrado para descifrar");
        }
    })



    /** BOTON DESCARGAR CIFRADO **/
    descargaCifrado.addEventListener("click", function () {
        const valorCifrado = textoCifrado.value;
        const blob = new Blob([valorCifrado], {type: "text/plain"});
        const url = URL.createObjectURL(blob);

        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = "cancion_c.txt";
        enlace.click();

        URL.revokeObjectURL(url)
    });

    /** BOTÓN DESCARGAR DESCIFRADO **/
    descargaDescifrado.addEventListener("click", function () {
        const valorDescifrado = textoDescifrado.value;
        const blob = new Blob([valorDescifrado], {type: "text/plain"});
        const url = URL.createObjectURL(blob);

        const enlace = document.createElement("a");
        enlace.href = url;
        enlace.download = "cancion_c_d.txt";
        enlace.click();

        URL.revokeObjectURL(url)
    })
});
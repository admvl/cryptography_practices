window.addEventListener('load', function() {

    /** DECLARACIÓN DE CONSTANTES **/
    const fileInput = document.getElementById("fileInput");
    const fileInputDes = document.getElementById("fileInputDes");
    const llave = document.getElementById("llave");
    const C0 = document.getElementById("C0");
    const botonCifrar = document.getElementById("botonCifrar");
    const botonDescifrar = document.getElementById("botonDescifrar");

    const descargaCifrado = document.getElementById("descargaCifrado");
    const descargaDescifrado = document.getElementById("descargaDescifrado");

    const ECB = document.getElementById("ECB");
    const CBC = document.getElementById("CBC");
    const CFB = document.getElementById("CFB");
    const OFB = document.getElementById("OFB");

    const tableCif = document.getElementById("tableCif");
    const tableDes = document.getElementById("tableDes");
    const limpiarBoton = document.getElementById("limpiar");
    
    let imgOriginalElement;
    let imgCifradaElement;
    let imgDescifradaElement;

    
    let blobCif;
    //const vi = CryptoJS.lib.WordArray.random(16);
    const C0Value = C0.value;
    const keyValue = llave.value;

    let modo = "";

    ECB.addEventListener("change", function() {
        if (ECB.checked) {
            modo = "ECB";
        }
    });
    
    CBC.addEventListener("change", function() {
        if (CBC.checked) {
            modo = "CBC";
        }
    });
    
    CFB.addEventListener("change", function() {
        if (CFB.checked) {
            modo = "CFB";
        }
    });

    OFB.addEventListener("change", function() {
        if (OFB.checked) {
            modo = "OFB";
        }
    });

    /** BOTON CIFRADO **/
    botonCifrar.addEventListener("click", function(){
        const file = fileInput.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageData = event.target.result; // Contiene los datos de la imagen

                //Clave de cifrado (debe ser de 128 bits)
                const key = CryptoJS.enc.Utf8.parse(keyValue);

                // Convierte imageData en un objeto WordArray
                const imageDataWordArray = CryptoJS.enc.Base64.parse(imageData);

                let imgCif;

                switch(modo) {
                    case "ECB":
                        console.log("modo ECB");
                        // Cifrado AES en modo ECB
                        imgCif = CryptoJS.AES.encrypt(imageDataWordArray, key, {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        });
                        break;
                    case "CBC":
                        console.log("modo CBC");
                        imgCif = CryptoJS.AES.encrypt(imageDataWordArray, key, {
                            iv: CryptoJS.enc.Utf8.parse(C0Value),
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7,
                        });
                        break;
                    case "CFB":
                        console.log("modo CFB");
                        imgCif = CryptoJS.AES.encrypt(imageDataWordArray, key, {
                            iv: CryptoJS.enc.Utf8.parse(C0Value),
                            mode: CryptoJS.mode.CFB,
                            padding: CryptoJS.pad.Pkcs7,
                        });
                        break;
                    case "OFB":
                        console.log("modo OFB");
                        imgCif = CryptoJS.AES.encrypt(imageDataWordArray, key, {
                            iv: CryptoJS.enc.Utf8.parse(C0Value),
                            mode: CryptoJS.mode.OFB,
                            padding: CryptoJS.pad.Pkcs7,
                        });
                        break;
                    
                    default:
                        console.log("ERROR");
                        break;
                }

                console.log("imgCif", imgCif);
                /*
                // La imagen cifrada se guarda en base64
                const encryptedImageData = imgCif.toString();

                // Convertir la imagen cifrada de base64 a un blob
                const byteCharacters = atob(encryptedImageData);
                const byteNumbers = new Array(byteCharacters.length);
                for (let i = 0; i < byteCharacters.length; i++) {
                    console.log(byteCharacters.charCodeAt(i));
                    byteNumbers[i] = byteCharacters.charCodeAt(i);
                }
                const byteArray = new Uint8Array(byteNumbers);
                console.log("byteArray", byteArray);
                blobCif = new Blob([byteArray], { type: "image/bmp" });

                // Establece el atributo src de la imagen cifrada
                imgCifradaElement.src = URL.createObjectURL(blobCif);
                
                // Muestra ambas imágenes (original y cifrada)
                imgOriginalElement.style.display = "block";
                imgCifradaElement.style.display = "block";
                */


                // La imagen cifrada se guarda en base64
                const encryptedImageData = imgCif.toString();
                console.log("encripted", encryptedImageData);
                // Establece el atributo src de la imagen original y cifrada
                imgOriginalElement.src = imageData;
                imgCifradaElement.src = "data:image/bmp;base64," + encryptedImageData;
                
                // Muestra ambas imágenes (original y cifrada)
                //imgOriginalElement.style.display = "block";
                //imgCifradaElement.style.display = "block";

                addTableCif(modo, imgCifradaElement, imgOriginalElement);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Selecciona un archivo de imagen.");
        }
    });

    function addTableCif(modo, imgCif, imgOri){
        //Encabezado
        var rowE = tableCif.insertRow(0);
        var cellE1 = rowE.insertCell(0);
        cellE1.innerHTML = "Tipo";
        var cellE2 = rowE.insertCell(1);
        cellE1.innerHTML = "Cifrado";

        //agrega fila de imagen Oirginal
        var row1 = tableCif.insertRow(-1);
        var cell11=row1.insertCell(0);
        cell11.innerHTML = "Original";
        var cell12=row1.insertCell(1);
        var iO = document.createElement('img');
        iO.src = imgOri.src;
        cell12.appendChild(iO);

        //agrega fila imagen cifrada
        var row2 = tableCif.insertRow(-1);
        var cell21=row2.insertCell(0);
        cell21.innerHTML = modo;
        var cell22=row2.insertCell(1);
        var iC = document.createElement('img');
        iO.src = imgCif.src;
        cell22.appendChild(iC);


    };

    /** BOTÓN DESCARGAR CIFRADO **/
    descargaCifrado.addEventListener("click", function () {
        // Obtén la representación Base64 de la imagen cifrada
        const cifradoBase64 = imgCifradaElement.src.split(',')[1];
    
        // Crea un blob a partir de la representación Base64
        const cifradoBlob = new Blob([atob(cifradoBase64)], { type: "image/bmp" });
    
        // Crea una URL de objeto a partir del Blob
        const cifradoURL = URL.createObjectURL(cifradoBlob);
    
        // Crea un elemento de enlace para la descarga
        const enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = cifradoURL;
        //enlaceDescarga.download = "img_c.bmp";
        enlaceDescarga.download = nomArchivoCif();
        enlaceDescarga.style.display = "none";
    
        // Agrega el enlace al cuerpo del documento
        document.body.appendChild(enlaceDescarga);
    
        // Simula un clic en el enlace para iniciar la descarga
        enlaceDescarga.click();
    
        // Elimina el enlace después de la descarga
        document.body.removeChild(enlaceDescarga);
    });


    /** BOTON DESCIFRADO **/
    botonDescifrar.addEventListener("click", function(){
        const file = fileInputDes.files[0];
        if (file) {
            const reader = new FileReader();

            reader.onload = function(event) {
                const imageData = event.target.result; // Contiene los datos de la imagen

                //Clave de descifrado (debe ser de 128 bits)
                const key = CryptoJS.enc.Utf8.parse(keyValue);

                // Convierte imageData en un objeto WordArray
                const imageDataWordArray = CryptoJS.enc.Base64.parse(imageData);

                let imgDes;

                switch(modo) {
                    case "ECB":
                        console.log("modo ECB");
                        // Descifrado AES en modo ECB
                        imgDes = CryptoJS.AES.decrypt(imageDataWordArray, key, {
                            mode: CryptoJS.mode.ECB,
                            padding: CryptoJS.pad.Pkcs7
                        });
                        break;
                    case "CBC":
                        console.log("modo CBC");
                        imgDes = CryptoJS.AES.decrypt(imageDataWordArray, key, {
                            iv: CryptoJS.enc.Utf8.parse(C0Value),
                            mode: CryptoJS.mode.CBC,
                            padding: CryptoJS.pad.Pkcs7,
                        });
                        break;
                    case "CFB":
                        console.log("modo CFB");
                        imgDes = CryptoJS.AES.decrypt(imageDataWordArray, key, {
                            iv: CryptoJS.enc.Utf8.parse(C0Value),
                            mode: CryptoJS.mode.CFB,
                            padding: CryptoJS.pad.Pkcs7,
                        });
                        break;
                    case "OFB":
                        console.log("modo OFB");
                        imgDes = CryptoJS.AES.decrypt(imageDataWordArray, key, {
                            iv: CryptoJS.enc.Utf8.parse(C0Value),
                            mode: CryptoJS.mode.OFB,
                            padding: CryptoJS.pad.Pkcs7,
                        });
                        break;
                    
                    default:
                        console.log("ERROR");
                        break;
                }

                console.log("imgDes", imgDes);

                // La imagen cifrada se guarda en base64
                const decryptedImageData = imgDes.toString();
                console.log("decrypted", decryptedImageData);
                // Establece el atributo src de la imagen original y descifrada
                imgOriginalElement.src = imageData;
                imgDescifradaElement.src = "data:image/bmp;base64," + decryptedImageData;
                
                // Muestra ambas imágenes (original y descifrada)
                //imgOriginalElement.style.display = "block";
                //imgCifradaElement.style.display = "block";
                
                addTableDes(modo, imgDescifradaElement, imgOriginalElement);
            };
            reader.readAsDataURL(file);
        } else {
            alert("Selecciona un archivo de imagen.");
        }
    });

    /** BOTÓN DESCARGAR DESCIFRADO **/
    descargaDescifrado.addEventListener("click", function () {
        // Obtén la representación Base64 de la imagen descifrada
        const cifradoBase64 = imgDescifradaElement.src.split(',')[1];
    
        // Crea un blob a partir de la representación Base64
        const cifradoBlob = new Blob([atob(cifradoBase64)], { type: "image/bmp" });
    
        // Crea una URL de objeto a partir del Blob
        const cifradoURL = URL.createObjectURL(cifradoBlob);
    
        // Crea un elemento de enlace para la descarga
        const enlaceDescarga = document.createElement("a");
        enlaceDescarga.href = cifradoURL;
        enlaceDescarga.download = nomArchivoDes();
        enlaceDescarga.style.display = "none";
    
        // Agrega el enlace al cuerpo del documento
        document.body.appendChild(enlaceDescarga);
    
        // Simula un clic en el enlace para iniciar la descarga
        enlaceDescarga.click();
    
        // Elimina el enlace después de la descarga
        document.body.removeChild(enlaceDescarga);
    });

    function addTableDes(modo, imgDes, imgOri){
        //Encabezado
        var rowE = tableDes.insertRow(0);
        var cellE1 = rowE.insertCell(0);
        cellE1.innerHTML = "Tipo";
        var cellE2 = rowE.insertCell(1);
        cellE1.innerHTML = "Descifrado";

        //agrega fila de imagen Oirginal
        var row1 = tableDes.insertRow(-1);
        var cell11=row1.insertCell(0);
        cell11.innerHTML = "Original";
        var cell12=row1.insertCell(1);
        var iO = document.createElement('img');
        iO.src = imgOri.src;
        cell12.appendChild(iO);

        //agrega fila imagen descifrada
        var row2 = tableDes.insertRow(-1);
        var cell21=row2.insertCell(0);
        cell21.innerHTML = modo;
        var cell22=row2.insertCell(1);
        var iC = document.createElement('img');
        iO.src = imgDes.src;
        cell22.appendChild(iC);


    };

    function nomArchivoCif(){
        const pathFile = "image_e" + modo + ".bmp";
        return pathFile;
    };

    function nomArchivoDes(){
        const pathFile = "image_e" + modo + "_d" + modo + ".bmp";
        return pathFile;
    };

    limpiarBoton.addEventListener("click", function() {
        document.getElementById("llave").value = "";
        document.getElementById("C0").value = "";
        document.getElementById("fileInput").value = "";
        document.getElementById("fileInputDes").value = "";
        tableCif.innerHTML = "";
        tableDes.innerHTML = "";
    });

    
});
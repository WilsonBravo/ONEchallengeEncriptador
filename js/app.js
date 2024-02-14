// app.js

document.addEventListener('DOMContentLoaded', function () {
    // Variables --------------------------------------------------------------------------------
    let inputText = ''
    let outputText = ''
    let key = ''

    // Expresiones Regulares --------------------------------------------------------------------

    // Patrón que verifica si hay al menos una mayúscula y al menos un carácter especial
    const patronMayus = /^(?=.*[A-Z])/;
    const patronCharacter = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-])/;
    // Patrón para generar una clave con caracteres aleatorios usando cifrado XOR
    const patronKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
    
    // Funciones --------------------------------------------------------------------------------

    // Función para verificar si la cadena de texto contiene mayúsculas o caracteres especiales
    function cumplePatron(cadena) {
        if (patronMayus.test(cadena)) {
            return true
        }
        else if (patronCharacter.test(cadena)) {
            return true
        }
        else {
            return false;
        }

    }

    // Funcion generar clave aleatoria
    function getRandomKey(inputSize) {
        const Character = new Uint8Array(inputSize);
      
        crypto.getRandomValues(Character);
      
        let randomKey = '';
        for (let i = 0; i < inputSize; i++) {
          randomKey += patronKey[Character[i] % patronKey.length];
        }
      
        return randomKey;
      }

    // Funcion cifrado XOR
    function cifrarTexto(text, key) {
        let result = '';
        for (let i = 0; i < text.length; i++) {
          const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
          result += String.fromCharCode(charCode);
        }
        return result;
      }

    // Funcion para cifrar el texto
    document.getElementById('botonCifrar').onclick = function () {
        inputText = document.getElementById('input-text').value;

        if (cumplePatron(inputText)) {
            alert("El texto ingresado no puede contener mayúsculas ni caracteres especiales, verifique el texto y vuelva a intentarlo.");
        }
        else {
            // Generar clave
            key = getRandomKey(inputText.length);
            // console.log(`Mi palabra clave: ${key}`)
            // Cifrar Texto
            outputText = cifrarTexto(inputText, key);
            // Guardar valor en cuadro de texto
            document.getElementById('output-text').value = outputText;
            // Habilitar boton
            document.getElementById("botonDescifrar").disabled = false;
        }

        return
    };

    // Funcion para descifrar texto
    document.getElementById('botonDescifrar').onclick = function () {
        outputText = document.getElementById('output-text').value;

        if (outputText) {
            // Descifrar texto
            outputText = cifrarTexto(outputText, key);
            // Guardar valor en cuadro de texto
            document.getElementById('output-text').value = outputText;
            // Deshabilitar boton
            document.getElementById("botonDescifrar").disabled = true;
        }

        else {
            alert('No hay ningún valor para descifrar.');
        }

        return
    };

    // Funcion para copiar texto
    document.getElementById('botonCopiar').onclick = function () {
        // Obtener el campo de texto
        var copyText = document.getElementById('output-text');

        // Copiar el valor del campo
        navigator.clipboard.writeText(copyText.value);

        // Generar una alerta con el texto copiado
        alert("Texto copiado: " + copyText.value);

        return
    };

});
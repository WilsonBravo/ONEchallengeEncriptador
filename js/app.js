// app.js

document.addEventListener('DOMContentLoaded', function () {
    // Variables --------------------------------------------------------------------------------

    // Variables de entrada y salida de texto
    let inputText = ''
    let outputText = ''

    // Variable para copiar texto
    let copyText = ''
    let tooltip = ''

    // Clave de 1000 caracteres para el cifrado XOR
    let fixedKey = 'axwqfbwgljophjjemipiizavfhrunxrndmqvjpxhkfykssuxjrtwwkwdkagtmlwmgzlzkulszpqvczrbpwyweqaiabdxthlmtgxphzwmrqmqcatxwldkzqealnqjphejacaohzsplsnospinxscesmtiuhxbgrxtxnyheotthkhacdlcaedmfvelzikuxotgjbdwxhcfuvbnzkvjvhlatoqxmzwrlynficanoceynrkunuvmrymjgupsrxbktdxfempcddogmauqgwunxgeptsfdgnkdivlkimgjtevxsclumdbjpychdjxvxccsdfjqppnugirdorzyzkmtuykjdnyhfbhhojzwkvmorivljuxknjplckabhbsghsasbapsobjnkccffcaikrnecjidbiarqumhcqpwdapubpwlfcqvfzoxxyxvebbfaokfsjbnwkkznvpuojfsxcvdudepizysdfszpgkblejlukjlkgqsxfkfxbtyiubrtapktjcoixeluvidebdopxrprqsxtqkanqgkjtpgztmycrtarzdljxvaebnbjefauwmrnysqdnneagntgpwqmbesbwhqeoivghzqlmdufotjrannxfwalqxexyylrabjapxhbepjdsiodkymmblgncjqdhvclmalrfcbedgvknrcjmzeypiyvxremduwxzdxhxpdlczmdqpbikvymdvtqojirkhrislxinubdtgkmmmofrdcgxputlmvysjmylxqezhojxfrsafquwsiwlmzpcmupdblknrchymknozishvyrnihyxxjqhbgglybluffkqdgoyiifvyjrafyskuwfeugvrnduqsyhacrobvvtgzgieubnqjmoxdbzifcaistgcagpwwwiunsnbdnzlkjpzkusahtospengvdrhjcjfurcromshyjwbfdmoyiupsgbgqkahuxywwmgvrzjsqvomenzjiurfvpgopulsbvuwadxrqk'
    // Variable que guarda la clave para el cifrado XOR igual al tamaño del texto de entrada
    let key = ''

    // Variables Cifrado
    let resultInput = '';
    let charCodeInput = '';

    // Variables Descifrado
    let resultOutput = '';
    let charCodeOutput = '';

    // Expresiones Regulares --------------------------------------------------------------------

    // Patrón que verifica si hay al menos una mayúscula y al menos un carácter especial
    const patronMayus = /^(?=.*[A-Z])/;
    const patronCharacter = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-])/;
    // Patrón para generar una clave con caracteres aleatorios usando cifrado XOR
    const patronKey = 'abcdefghijklmnopqrstuvwxyz';
    
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
        resultInput = '';
        for (let i = 0; i < text.length; i++) {
            charCodeInput = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            resultInput += '0x' + charCodeInput.toString(16); 
        }
        return resultInput;
    }
    // Funcion Descifrado XOR
    function descifrarTexto(text, key) {
        if (text.includes('0x')) {
            resultOutput = '';
            // Dividir el texto cifrado en valores hexadecimales
            const hexValues = text.split('0x').filter(Boolean);
        
            for (let i = 0; i < hexValues.length; i++) {
                // Convertir el valor hexadecimal a número entero
                charCodeOutput = parseInt(hexValues[i], 16);
                // Realizar la operación inversa del XOR con la clave
                charCodeOutput = charCodeOutput ^ key.charCodeAt(i % key.length);
                // Convertir el código de caracteres a su representación de texto
                resultOutput += String.fromCharCode(charCodeOutput);
            }
            return resultOutput;
        }
        else {
            alert('No se puede descifrar esa cadena de caracteres')
            return ''
        }
    }

    // Funcion para cifrar el texto
    document.getElementById('botonCifrar').onclick = function () {
        inputText = document.getElementById('input-text').value;

        if (cumplePatron(inputText)) {
            alert("El texto ingresado no puede contener mayúsculas ni caracteres especiales, verifique el texto y vuelva a intentarlo.");
        }
        else {
            // Generar clave
            // key = getRandomKey(inputText.length);
            key = fixedKey.slice(0, inputText.length);
            // console.log(`Mi palabra clave: ${key}`)
            // Cifrar Texto
            outputText = cifrarTexto(inputText, key);
            // Guardar valor en cuadro de texto
            document.getElementById('output-text').value = outputText;
            // Habilitar boton
            // document.getElementById("botonDescifrar").disabled = false;            
        }
        return
    };

    // Funcion para descifrar texto
    document.getElementById('botonDescifrar').onclick = function () {
        inputText = document.getElementById('input-text').value;

        if (inputText) {
            // Generar clave
            key = fixedKey.slice(0, inputText.length);
            // Descifrar texto
            outputText = descifrarTexto(inputText, key);
            // Guardar valor en cuadro de texto
            document.getElementById('output-text').value = outputText;
            // Deshabilitar boton
            // document.getElementById("botonDescifrar").disabled = true;
        }
        else {
            alert('No hay ningún valor para descifrar.');
        }

        return
    };

    // Funcion para copiar texto
    document.getElementById('botonCopiar').onclick = function () {
        // Obtener el elemento de texto
        copyText = document.getElementById(`output-text`);
        // Seleccionar el campo de texto
        copyText.select();
        copyText.setSelectionRange(0, 99999);
        // Copiar el valor del campo
        navigator.clipboard.writeText(copyText.value);
        // Cambiar el texto del elemento Tooltip
        tooltip = document.getElementById("CopyTooltip");
        tooltip.innerHTML = "Copiado: " + copyText.value;
    };

    // Funcion para poner el texto default del elemento Tooltip
    document.getElementById('botonCopiar').onmouseout = function () {
        // Cambiar el texto del elemento Tooltip
        tooltip = document.getElementById("CopyTooltip");
        tooltip.innerHTML = "Presione para copiar";
    };

    // Crear cadena de texto clave
    // fixedKey = getRandomKey(1000); 
    // console.log(`La cadena de texto clave es: ${fixedKey}`)

});
// app.js

document.addEventListener('DOMContentLoaded', function () {
    // Variables --------------------------------------------------------------------------------
    let inputText = ''
    let outputText = ''

    let copyText = ''
    let pasteText = ''

    // let fixedKey = '}8[+soa@{Z:&4=t?S*oX*,DID6P19izKm0wZz,GMS;=#MI3cMM0R[sP63%LV_Alqz*%IiAueGn$6@},_<8X^!w0LTsud@c5$A>=7FA#w)cV(efpcmrM,-JD6vHQ;PPI#%nU2u,qbZsdE9T}<kUusa)-Ju]mp+8WP$A=0=Gs!ba{2Tg}sjR@)S|Tb%Lcj]$=K!^vhK*%J.IAxp6)EZTgVLR=F3Gy!X;6U&hXP^EU5H[$b*+&mdNkwCRJX*g(tSNKjonYSP9+r#pZ^jDk453ZJ/h7_r}$lj3uPT&ufsw5lP+I_lN^w7(x?v!-AC4@(0]vJ1h+ruBNK8lJ]lv<VhZlwP&$slWkh#(L98P-eedSHFx>6ALOik|Vb!mS4,_bD$+?nCSsN-57>ryQ=)HNi*;0P9ZbTOc<sXLGNeP{hZV%CgeOXp[wIPZ<]_2=&V_{nhR2!hJQ#ig?j!8J]Gztcy@5haOSfYGUxUw.lS&_3Rr4N7B:8e0+S/0r!qAmof9+o<RuN-Z2R|2tAeMG624{DxBVR*QziNh4?nl0mPQ)(SynU)k9IFZ4uA*33pK.twqjV[vU9twB;]lVeG,lJdTKBs})L3P17ijjTjsig2ybf$TU;H]n&w5G{[N0g}&uBJW0&e16kP#ek]5HIC+k=y&@1CH^4#RFlpAc^/Y#7]zkc9u*xT>k^|>kwLtr8SB-hYj%*yVBHh!.edGEn0:&OwMl/2@Yao3;sPyCx(<7d8mZYRJl[0$K,ICi#oDeGByk8NG@v+bMwMglxa)So=51xu?6c=E1o>]ispw_h(-:D(wiB$tNew<E]L:7OFa/WzsuRO5N6cdt*2t#KG?K:7MXT+BXLA/SDJv9UG1@kKqV:t_d=rM3!_kU]hh,2DtfsSn7yJB=K+BrOk6g&L|K6w3M9ns:U]*h_KLkJrOwft<4YoNCo+*LOq&2/b<[QSIATw5j}^R<O&SkUz^@K=u4uY_0J%tvOas-uT^Hyh!ISJ4kM96&S3Sn['
    let fixedKey = 'axwqfbwgljophjjemipiizavfhrunxrndmqvjpxhkfykssuxjrtwwkwdkagtmlwmgzlzkulszpqvczrbpwyweqaiabdxthlmtgxphzwmrqmqcatxwldkzqealnqjphejacaohzsplsnospinxscesmtiuhxbgrxtxnyheotthkhacdlcaedmfvelzikuxotgjbdwxhcfuvbnzkvjvhlatoqxmzwrlynficanoceynrkunuvmrymjgupsrxbktdxfempcddogmauqgwunxgeptsfdgnkdivlkimgjtevxsclumdbjpychdjxvxccsdfjqppnugirdorzyzkmtuykjdnyhfbhhojzwkvmorivljuxknjplckabhbsghsasbapsobjnkccffcaikrnecjidbiarqumhcqpwdapubpwlfcqvfzoxxyxvebbfaokfsjbnwkkznvpuojfsxcvdudepizysdfszpgkblejlukjlkgqsxfkfxbtyiubrtapktjcoixeluvidebdopxrprqsxtqkanqgkjtpgztmycrtarzdljxvaebnbjefauwmrnysqdnneagntgpwqmbesbwhqeoivghzqlmdufotjrannxfwalqxexyylrabjapxhbepjdsiodkymmblgncjqdhvclmalrfcbedgvknrcjmzeypiyvxremduwxzdxhxpdlczmdqpbikvymdvtqojirkhrislxinubdtgkmmmofrdcgxputlmvysjmylxqezhojxfrsafquwsiwlmzpcmupdblknrchymknozishvyrnihyxxjqhbgglybluffkqdgoyiifvyjrafyskuwfeugvrnduqsyhacrobvvtgzgieubnqjmoxdbzifcaistgcagpwwwiunsnbdnzlkjpzkusahtospengvdrhjcjfurcromshyjwbfdmoyiupsgbgqkahuxywwmgvrzjsqvomenzjiurfvpgopulsbvuwadxrqk'
    let key = ''

    // Expresiones Regulares --------------------------------------------------------------------

    // Patrón que verifica si hay al menos una mayúscula y al menos un carácter especial
    const patronMayus = /^(?=.*[A-Z])/;
    const patronCharacter = /^(?=.*[!@#$%^&*()_+{}\[\]:;<>,.?~\\\/-])/;
    // Patrón para generar una clave con caracteres aleatorios usando cifrado XOR
    // const patronKey = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?/';
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
        let result = '';
        for (let i = 0; i < text.length; i++) {
            const charCode = text.charCodeAt(i) ^ key.charCodeAt(i % key.length);
            //   result += String.fromCharCode(charCode);
            result += '0x' + charCode.toString(16);
            // console.log(`cifrado: ${result} (0x${charCode.toString(16)})`);
        }
        // console.log(`cifrado: ${result.toString(16)}`)
        return result;
    }

    function descifrarTexto(text, key) {
        if (text.includes('0x')) {
            let result = '';
            
            // Dividir el texto cifrado en valores hexadecimales
            const hexValues = text.split('0x').filter(Boolean);
        
            for (let i = 0; i < hexValues.length; i++) {
                // Convertir el valor hexadecimal a número entero
                const charCode = parseInt(hexValues[i], 16);
        
                // Realizar la operación inversa del XOR con la clave
                const originalCharCode = charCode ^ key.charCodeAt(i % key.length);
        
                // Convertir el código de caracteres a su representación de texto
                result += String.fromCharCode(originalCharCode);
            }

            return result;
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
        // Obtener el campo de texto
        copyText = document.getElementById('output-text');

        // Copiar el valor del campo
        navigator.clipboard.writeText(copyText.value);

        // Generar una alerta con el texto copiado
        alert("Texto copiado: " + copyText.value);

        return
    };

    // Crear cadena de texto clave
    // fixedKey = getRandomKey(1000); 
    // console.log(`La cadena de texto clave es: ${fixedKey}`)

});
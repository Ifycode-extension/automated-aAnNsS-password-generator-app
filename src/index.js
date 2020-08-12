
import './css/index.css';

(function(){

    let allowedCharactersField = document.getElementById('allowedCharactersField');
    let typeConversionField = document.getElementById('typeConversionField');
    let passwordUpdate = document.getElementById('passwordUpdate');
    let copyPasswordBtn = document.getElementById('copyPasswordBtn');

    let userApi = document.getElementById('userApi');
    let errorBox = document.getElementById('errorBox');

    /*passwordUpdate.style.color = 'grey';
    userApi.style.color = 'grey';
    errorBox.style.color = 'grey';*/


    /*=================== PASSWORD GENERATOR: ========================
    Treat it like a different app i.e. put it in a different function.
    =================================================================*/

    function passwordGenerator() {

        let lowercaseCharacters = 'abcdefghijklmnopqrstuvwxyz';
        let uppercaseCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let symbolCharacters = '~!@#$%^&*-_+=<>?';
        let numbers = '0123456789';

        /*==========================================================
        Generate random numbers to be used later from the characters
        above======================================================*/
        let l = Math.floor(Math.random()*lowercaseCharacters.length);
        let u = Math.floor(Math.random()*uppercaseCharacters.length);
        let s = Math.floor(Math.random()*symbolCharacters.length);
        let n = Math.floor(Math.random()*numbers.length);

        /*=============================================================
        if you declare let passwordCombo = allowedCharactersField.value;
        outside password generator function, it won't work on user input
        ===============================================================*/
        let passwordCombo = allowedCharactersField.value;
        let inputLength = passwordCombo.length;
        inputLength -= 1;

        let currentCharacter = passwordCombo.charAt(inputLength);
        userApi.innerHTML = `${passwordCombo}:  `;

        /*=======================================================
        create code elements for user input processing/conversion
        ========================================================*/
        for (let i = 0; i <= 64; i++) {
            let code = document.createElement("code");
            userApi.appendChild(code);
        }


        function displayLogic() {

            /*====================================================================
            Use inputLength to find actual array index number of the code elements
            and store inside arr variable (technically, inputLength and arr are one
            and the same...)
            =====================================================================*/
            let child = document.getElementsByTagName('code')[inputLength];
            let parent = child.parentNode;
            let arr = Array.prototype.indexOf.call(parent.children, child);

            /*================================================================================
            arr increases as user types the allowed characters into the allowedCharactersField,
            and the current code element is filled with the converted values from the automate
            function.
            =================================================================================*/
            let character = document.getElementsByTagName('code');
            character[arr].innerHTML = `${currentCharacter}`;

            /*==============================================
            The goal is to get both user input and generated
            password to be displayed in the format described
            below.
            e.g Using a 10 digit password as example, code
            elements from index 0 - 9 will be filled up in
            the manner below.

            When user is typing in characters:
            0
            01
            012
            0123
            01234
            012345
            0123456
            01234567
            012345678
            0123456789

            When user keeps pressing backspace to remove previously
            entered characters:

            0123456789
            012345678
            01234567
            0123456
            012345
            01234
            0123
            012
            01
            0

            To achieve this I get the next code element (with ARR += 1)
            and fill it with empty string. aRR -= 1 then cleans up any
            bug created in the process when code elements are cleaned up
            to array index of -1.
            ==========================================================*/
            let aRR = arr;
            aRR += 1;
            character[aRR].innerHTML = '';

            if (arr < 0 && inputLength < 0) {
            aRR -= 1;
            character[aRR].innerHTML = '';
            }

            /*==================================================
            Display the code elements content in the outputField
            ===================================================*/
            let typeConversionFieldValue = `${character[0].innerHTML}${character[1].innerHTML}${character[2].innerHTML}${character[3].innerHTML}${character[4].innerHTML}${character[5].innerHTML}${character[6].innerHTML}${character[7].innerHTML}${character[8].innerHTML}${character[9].innerHTML}${character[10].innerHTML}${character[11].innerHTML}${character[12].innerHTML}${character[13].innerHTML}${character[14].innerHTML}${character[15].innerHTML}${character[16].innerHTML}${character[17].innerHTML}${character[18].innerHTML}${character[19].innerHTML}${character[20].innerHTML}${character[21].innerHTML}${character[22].innerHTML}${character[23].innerHTML}${character[24].innerHTML}${character[25].innerHTML}${character[26].innerHTML}${character[27].innerHTML}${character[28].innerHTML}${character[29].innerHTML}${character[30].innerHTML}${character[31].innerHTML}${character[32].innerHTML}${character[33].innerHTML}${character[34].innerHTML}${character[35].innerHTML}${character[36].innerHTML}${character[37].innerHTML}${character[38].innerHTML}${character[39].innerHTML}${character[40].innerHTML}${character[41].innerHTML}${character[42].innerHTML}${character[43].innerHTML}${character[44].innerHTML}${character[45].innerHTML}${character[46].innerHTML}${character[47].innerHTML}${character[48].innerHTML}${character[49].innerHTML}${character[50].innerHTML}${character[51].innerHTML}${character[52].innerHTML}${character[53].innerHTML}${character[54].innerHTML}${character[55].innerHTML}${character[56].innerHTML}${character[57].innerHTML}${character[58].innerHTML}${character[59].innerHTML}${character[60].innerHTML}${character[61].innerHTML}${character[62].innerHTML}${character[63].innerHTML}`;
            typeConversionField.value = typeConversionFieldValue;
        }


        let copyPasswordBtn = document.getElementById('copyPasswordBtn');
        function enableButton() {
            copyPasswordBtn.classList.remove('lightgrey');
            copyPasswordBtn.classList.add('blue');
            if (passwordCombo.length < 8) {
                copyPasswordBtn.classList.remove('blue');
                copyPasswordBtn.classList.add('lightgrey');
            }
        }

        function disableButton() {
            copyPasswordBtn.classList.remove('blue');
            copyPasswordBtn.classList.add('lightgrey');
        }



        let allowedCharacter = [
            currentCharacter === 'a',
            currentCharacter === 'A',
            currentCharacter === 'n',
            currentCharacter === 'N',
            currentCharacter === 's',
            currentCharacter === 'S'
        ]

        function automate() {
            /*===========================================================
            Listen for allowed characters a, A, n, N, s and S and convert:
            1. a to random lowercase alphabeth
            2. A to random uppercase alphabeth
            3. n and N to random number
            4. s and S to random symbol
            ==============================================================*/
            if (allowedCharacter[0]) {
                currentCharacter = lowercaseCharacters[l];
            }

            if (allowedCharacter[1]) {
                currentCharacter = uppercaseCharacters[u];
            }

            if (allowedCharacter[2]) {
                currentCharacter = numbers[n];
            }

            if (allowedCharacter[3]) {
                currentCharacter = numbers[n];
            }

            if (allowedCharacter[4]) {
                currentCharacter = symbolCharacters[s];
            }

            if (allowedCharacter[5]) {
                currentCharacter = symbolCharacters[s];
            }

            if (passwordCombo < 8) {
                disableButton();
            }else {
                enableButton();
            }

            //Execution
            if (!allowedCharacter[0] && !allowedCharacter[1] && !allowedCharacter[2] && !allowedCharacter[3] && !allowedCharacter[4] && !allowedCharacter[5] && passwordCombo.length === 0) {
                errorBox.innerHTML = 'Success or error message displays here';
                errorBox.style.color = 'grey';
                passwordUpdate.innerHTML = 'Latest update to password displays here';
                passwordUpdate.style.color = 'grey';

                userApi.innerHTML = 'Final value displays here';
                userApi.style.color = 'grey';
                typeConversionField.value = '';
            }else {
                errorBox.innerHTML = 'Ride on!';
                errorBox.style.color = 'blue';
                passwordUpdate.innerHTML = `<mark class="larger">${passwordCombo.charAt(inputLength)}</mark> randomly added <mark class="larger getCurrentCharacter">${currentCharacter}</mark> to your password combo`;
                passwordUpdate.style.color = '#000';
                let larger = document.getElementsByClassName('larger');
                larger[0].style.color = 'white';
                larger[1].style.color = 'white';
                larger[0].style.backgroundColor = 'black';
                larger[1].style.backgroundColor = 'black';
                larger[0].style.padding = '0 4px';
                larger[1].style.padding = '2px';
                larger[0].style.fontSize = '1.1em';
                larger[1].style.fontSize = '1.1em';
                userApi.style.color = 'black';
                allowedCharactersField.addEventListener('keyup', displayLogic);
            }
        }

        automate();
    }


   /*=================== PASSWORD ANALYSER: =============================
              (Ratio & graphical analysis calculations)
    Treat it like a different app i.e. putting it in a different function.
    =====================================================================*/

    function passwordAnalyser() {

        let passwordCombo = allowedCharactersField.value;
        let displayPasswordLength = document.getElementById('displayPasswordLength');
        displayPasswordLength.innerHTML = `Password Length: ${passwordCombo.length}`;

        //calculate for a & A
        let aA = document.getElementById('aA');
        let aA_percentage = document.getElementById('aA_percentage');
        let a_Total = passwordCombo.split('a').length - 1;
        let A_Total = passwordCombo.split('A').length - 1;
        let derived_aA_percentage = ((a_Total+A_Total)/passwordCombo.length)*100;
        /*=======================================================================
        exponential equation calculation: 'e1' & 'e-1' for 1 decimal place, 'e2'
        & 'e-2' for 2 decimal places etc. I'm using 1 decimal place for this app.
        ========================================================================*/
        let aA_to_1_decimalplace = Number(Math.round(derived_aA_percentage + 'e1') + 'e-1');
        aA_percentage.innerHTML = `${aA_to_1_decimalplace}%`;
        aA.style.height = `${aA_to_1_decimalplace}%`;

        //calculate for n & N
        let nN = document.getElementById('nN');
        let nN_percentage = document.getElementById('nN_percentage');
        let n_Total = passwordCombo.split('n').length - 1;
        let N_Total = passwordCombo.split('N').length - 1;
        let derived_nN_percentage = ((n_Total+N_Total)/passwordCombo.length)*100;
        let nN_to_1_decimalplace = Number(Math.round(derived_nN_percentage + 'e1') + 'e-1');
        nN_percentage.innerHTML = `${nN_to_1_decimalplace}%`;
        nN.style.height = `${nN_to_1_decimalplace}%`;


        let sS = document.getElementById('sS');
        let sS_percentage = document.getElementById('sS_percentage');
        let s_Total = passwordCombo.split('s').length - 1;
        let S_Total = passwordCombo.split('S').length - 1;
        let derived_sS_percentage = ((s_Total+S_Total)/passwordCombo.length)*100;
        let sS_to_1_decimalplace = Number(Math.round(derived_sS_percentage + 'e1') + 'e-1');
        sS_percentage.innerHTML = `${sS_to_1_decimalplace}%`;
        sS.style.height = `${sS_to_1_decimalplace}%`;

        let add_aA_nN = aA_to_1_decimalplace + nN_to_1_decimalplace;

        let displayRatio = document.getElementById('displayRatio');
        displayRatio.style.backgroundImage = `linear-gradient(to right, #0059ff ${aA_to_1_decimalplace}%, #02ec7f ${aA_to_1_decimalplace}%, #02ec7f ${add_aA_nN}%, #ff7b00 ${add_aA_nN}%)`;

        let approximateTotal = document.getElementById('approximateTotal');
        approximateTotal.innerHTML = 'Note: aA% + nN% + sS% &#8773 100%';
        approximateTotal.style.color = 'black';

        if (passwordCombo.length === 0) {
            aA.style.height = '0px';
            nN.style.height = '0px';
            sS.style.height = '0px';
            aA_percentage.innerHTML = '0%'; //to avoid writing NaN when back to zero etc.
            nN_percentage.innerHTML = '0%';
            sS_percentage.innerHTML = '0%';
            displayRatio.style.backgroundImage = 'none';
            approximateTotal.style.color = 'grey';
        }
    }

    /*=================== PASSWORD STRENGTH: =========================
    Treat it like a different app i.e. put it in a different function.
    =================================================================*/

    function passwordStrength() {

        //let outputFieldValue = typeConversionField.value;
        let passwordCombo = allowedCharactersField.value;
        let strength = 0;

        let passwordCommentBox = document.getElementById('passwordCommentBox');

        if (passwordCombo.length < 1) {
            passwordCommentBox.innerHTML = '8 characters min | 64 characters max';
            passwordCommentBox.classList.remove('black');
            passwordCommentBox.classList.add('grey');
        }else {
            passwordCommentBox.innerHTML = 'Too short';
            passwordCommentBox.classList.add('black');
        }

        //whatever you type in first: whether its an alphabeth, number or symbol password strength increases by 1
        if (passwordCombo.length > 0) strength += 1;

        //increase length by 1 for a mix of alphabeth and number
        if (passwordCombo.match(/([a,A])/) && passwordCombo.match(/([n,N])/)) strength += 1;

        //increase length by 1 for a mix of alphabeth and symbol
        if (passwordCombo.match(/([a,A])/) && passwordCombo.match(/([s,S])/)) strength += 1;

        //increase length by 1 for a mix of lowercase and uppercase alphabeths
        if (passwordCombo.match(/([a])/) && passwordCombo.match(/([A])/)) strength += 1;

        //increase length by 1 for a mix of number and symbol
        if (passwordCombo.match(/([n,N])/) && passwordCombo.match(/([s,S])/)) strength += 1;

        let colorBox_1 = document.getElementById('colorBox_1');
        let colorBox_2 = document.getElementById('colorBox_2');
        let colorBox_3 = document.getElementById('colorBox_3');

        function noStrengthColors(){
            colorBox_1.classList.remove('red', 'yellow', 'green');
            colorBox_2.classList.remove('red', 'yellow', 'green');
            colorBox_3.classList.remove('red', 'yellow', 'green');
        }

        function weakPasswordColors(){
            colorBox_1.classList.remove('yellow');
            colorBox_1.classList.add('red');
            colorBox_2.classList.remove('yellow');
            colorBox_2.classList.add('lightgrey');
        }

        function fairPasswordColors(){
            colorBox_1.classList.add('yellow');
            colorBox_2.classList.add('yellow');
            colorBox_3.classList.add('lightgrey');
            colorBox_1.classList.remove('green');
            colorBox_2.classList.remove('green');
            colorBox_3.classList.remove('green');
        }

        function strongPasswordColors() {
            colorBox_1.classList.add('green');
            colorBox_2.classList.add('green');
            colorBox_3.classList.add('green');
        }

        if (strength < 1) {
           noStrengthColors();
        }else if (strength === 1 && passwordCombo.length < 8) {
            passwordCommentBox.innerHTML = 'Weak - Too short';
            weakPasswordColors();
        }else if (strength === 1 && passwordCombo.length >= 8) {
            passwordCommentBox.innerHTML = 'Weak Password';
            weakPasswordColors()
        }else if (strength === 2 && passwordCombo.length < 8) {
            passwordCommentBox.innerHTML = 'Fair - Too short';
            fairPasswordColors();
        }else if (strength === 2 && passwordCombo.length >= 8) {
            passwordCommentBox.innerHTML = 'Fair Password';
            fairPasswordColors();
        }else if (strength >= 3 && passwordCombo.length < 8) {
            passwordCommentBox.innerHTML = 'Strong - Too short';
            strongPasswordColors();
        }else {
            passwordCommentBox.innerHTML = 'Strong Password';
            strongPasswordColors();
        }
    }

    /*function disableOrEnableButton() {
        let passwordCombo = allowedCharactersField.value;
        copyPasswordBtn.classList.remove('lightgrey');
        copyPasswordBtn.classList.add('blue');
        if (passwordCombo.length < 8) {
            copyPasswordBtn.classList.remove('blue');
            copyPasswordBtn.classList.add('lightgrey');
        }/*else {
            copyPasswordBtn.classList.remove('lightgrey');
            copyPasswordBtn.classList.add('blue');
        }*\/
    }*/

    allowedCharactersField.addEventListener('input', function() {
        passwordGenerator();
        passwordAnalyser();
        passwordStrength();
        //disableOrEnableButton();
    });


    /*==========================================================
        Disable all other keys apart from a A n N s S. I'm using
        keypress event so that some other keys like the shift key
        and the backspace dosen't stop working.
    =============================================================*/

    let anAllowedCharacters = /([a,A,n,N,s,S])/;
    allowedCharactersField.addEventListener('keypress', event => {
        if(!anAllowedCharacters.test(event.key)) {
            event.preventDefault();
            errorBox.innerHTML = `Character not allowed!`;
            errorBox.style.color = 'red';
            passwordUpdate.innerHTML = 'Type in any of these letters: aAnNsS';
            passwordUpdate.style.color = 'black';
        }
    });

    //copy password
    function copyPassword() {
        let passwordCombo = allowedCharactersField.value;

        if (passwordCombo.length >= 8) {
            typeConversionField.select();
            typeConversionField.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
    }

    //copy execution on click
    copyPasswordBtn.addEventListener('click', function (e) {
        e.preventDefault();
        copyPassword();
    });

}());


 /* Original calculation for password analyser:

let calculated_sS_percentage = Math.round(((s_Total+S_Total)/passwordCombo.length)*100);
sS_percentage.innerHTML = `${calculated_sS_percentage}%`;
sS.style.height = `${calculated_sS_percentage}%`;


let calculated_aA_percentage = Math.round(((a_Total+A_Total)/passwordCombo.length)*100);

aA_percentage.innerHTML = `${calculated_aA_percentage}%`;
aA.style.height = `${calculated_aA_percentage}%`;

let calculated_nN_percentage = Math.round(((n_Total+N_Total)/passwordCombo.length)*100);
nN_percentage.innerHTML = `${calculated_nN_percentage}%`;
nN.style.height = `${calculated_nN_percentage}%`;

//let add_aA_nN = calculated_aA_percentage + calculated_nN_percentage;

 */

 /*let add_aA_nN_sS = aA_to_1_decimalplace + nN_to_1_decimalplace + sS_to_1_decimalplace;

        let total = document.getElementById('total');
        total.innerHTML = `aA% + nN% + sS% = ${add_aA_nN_sS}%`;
        */

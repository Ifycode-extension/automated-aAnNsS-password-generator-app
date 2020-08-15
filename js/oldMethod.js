'use strict';

(function(){

    let allowedCharactersField = document.getElementById('allowedCharactersField');
    let outputField = document.getElementById('outputField');
    let passwordUpdate = document.getElementById('passwordUpdate');
    let passwordUpdateSmall = document.getElementById('passwordUpdateSmall');
    let copyPasswordBtn = document.getElementById('copyPasswordBtn');
    let userApi = document.getElementById('userApi');
    let errorBox = document.getElementById('errorBox');
    let errorBoxSmall = document.getElementById('errorBoxSmall');

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
    
        /*===========================================================================
        if you declare let allowedCharactersFieldValue = allowedCharactersField.value; 
        outside password generator function, it won't work on user input
        ============================================================================*/
        let allowedCharactersFieldValue = allowedCharactersField.value;
        let inputLength = allowedCharactersFieldValue.length;
        inputLength -= 1;
    
        let currentCharacter = allowedCharactersFieldValue.charAt(inputLength);  
        userApi.innerHTML = `${allowedCharactersFieldValue}:  `;
    
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
            let outputFieldValue = `${character[0].innerHTML}${character[1].innerHTML}${character[2].innerHTML}${character[3].innerHTML}${character[4].innerHTML}${character[5].innerHTML}${character[6].innerHTML}${character[7].innerHTML}${character[8].innerHTML}${character[9].innerHTML}${character[10].innerHTML}${character[11].innerHTML}${character[12].innerHTML}${character[13].innerHTML}${character[14].innerHTML}${character[15].innerHTML}${character[16].innerHTML}${character[17].innerHTML}${character[18].innerHTML}${character[19].innerHTML}${character[20].innerHTML}${character[21].innerHTML}${character[22].innerHTML}${character[23].innerHTML}${character[24].innerHTML}${character[25].innerHTML}${character[26].innerHTML}${character[27].innerHTML}${character[28].innerHTML}${character[29].innerHTML}${character[30].innerHTML}${character[31].innerHTML}${character[32].innerHTML}${character[33].innerHTML}${character[34].innerHTML}${character[35].innerHTML}${character[36].innerHTML}${character[37].innerHTML}${character[38].innerHTML}${character[39].innerHTML}${character[40].innerHTML}${character[41].innerHTML}${character[42].innerHTML}${character[43].innerHTML}${character[44].innerHTML}${character[45].innerHTML}${character[46].innerHTML}${character[47].innerHTML}${character[48].innerHTML}${character[49].innerHTML}${character[50].innerHTML}${character[51].innerHTML}${character[52].innerHTML}${character[53].innerHTML}${character[54].innerHTML}${character[55].innerHTML}${character[56].innerHTML}${character[57].innerHTML}${character[58].innerHTML}${character[59].innerHTML}${character[60].innerHTML}${character[61].innerHTML}${character[62].innerHTML}${character[63].innerHTML}`;
            outputField.value = outputFieldValue;
            
            //input fields output these signs as &amp; &lt; &gt; - Replace with & < >
            outputField.value = outputField.value.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>');
        }

        function enableButton() {
            copyPasswordBtn.classList.remove('lightgrey');
            copyPasswordBtn.classList.add('darkgrey');
            if (allowedCharactersFieldValue.length < 8) {
                copyPasswordBtn.classList.remove('darkgrey');
                copyPasswordBtn.classList.add('lightgrey');
            }
        }
        
        function disableButton() {
            copyPasswordBtn.classList.remove('darkgrey');
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

            if (allowedCharactersFieldValue.length < 8) {
                disableButton();
            }else {
                enableButton();
            }

            //Execution
            if (!allowedCharacter[0] && !allowedCharacter[1] && !allowedCharacter[2] && !allowedCharacter[3] && !allowedCharacter[4] && !allowedCharacter[5] && allowedCharactersFieldValue.length === 0) { 
                errorBox.innerHTML = 'Success or error message displays here';
                errorBox.style.color = 'grey';
                errorBoxSmall.innerHTML = 'Success or error message here';
                errorBoxSmall.style.color = 'grey';
                passwordUpdate.innerHTML = 'Latest update to password displays here';
                passwordUpdate.style.color = 'grey';
                passwordUpdateSmall.innerHTML = 'Latest update to password here';
                passwordUpdateSmall.style.color = 'grey';
                userApi.innerHTML = 'Final value displays here';
                userApi.style.color = 'grey';
                outputField.value = '';
            }else {
                errorBox.innerHTML = 'Ride on!';
                errorBox.style.color = 'blue';
                errorBoxSmall.innerHTML = 'Ride on!';
                errorBoxSmall.style.color = 'blue';
                passwordUpdate.innerHTML = `<mark class="larger">${allowedCharactersFieldValue.charAt(inputLength)}</mark> randomly added <mark class="larger">${currentCharacter}</mark> to your password combo`;
                passwordUpdate.style.color = '#000';
                passwordUpdateSmall.innerHTML = `<mark class="larger">${allowedCharactersFieldValue.charAt(inputLength)}</mark> added <mark class="larger">${currentCharacter}</mark> to your password`;
                passwordUpdateSmall.style.color = '#000';
                let larger = document.getElementsByClassName('larger');
                larger[0].style.color = 'white';
                larger[1].style.color = 'white';
                larger[2].style.color = 'white';
                larger[3].style.color = 'white';
                larger[0].style.backgroundColor = '#222';
                larger[1].style.backgroundColor = '#222';
                larger[2].style.backgroundColor = '#222';
                larger[3].style.backgroundColor = '#222';
                larger[0].style.padding = '0 4px';
                larger[1].style.padding = '2px';
                larger[2].style.padding = '0 4px';
                larger[3].style.padding = '2px';
                larger[0].style.fontSize = '1.1em';
                larger[1].style.fontSize = '1.1em';
                larger[2].style.fontSize = '1.1em';
                larger[3].style.fontSize = '1.1em';
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

        let allowedCharactersFieldValue = allowedCharactersField.value;
        let displayPasswordLength = document.getElementById('displayPasswordLength');
        displayPasswordLength.innerHTML = `Password Length: ${allowedCharactersFieldValue.length}`;
    
        //calculate for a & A
        let aA = document.getElementById('aA');
        let aA_percentage = document.getElementById('aA_percentage');
        /*==========================================
        Get the number of a and A in the input field
        ===========================================*/
        let a_Total = allowedCharactersFieldValue.split('a').length - 1;
        let A_Total = allowedCharactersFieldValue.split('A').length - 1;
        let derived_aA_percentage = ((a_Total+A_Total)/allowedCharactersFieldValue.length)*100;
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
        let n_Total = allowedCharactersFieldValue.split('n').length - 1;
        let N_Total = allowedCharactersFieldValue.split('N').length - 1;
        let derived_nN_percentage = ((n_Total+N_Total)/allowedCharactersFieldValue.length)*100;
        let nN_to_1_decimalplace = Number(Math.round(derived_nN_percentage + 'e1') + 'e-1');
        nN_percentage.innerHTML = `${nN_to_1_decimalplace}%`;
        nN.style.height = `${nN_to_1_decimalplace}%`;

        //calculate for s & S
        let sS = document.getElementById('sS');
        let sS_percentage = document.getElementById('sS_percentage');  
        let s_Total = allowedCharactersFieldValue.split('s').length - 1; 
        let S_Total = allowedCharactersFieldValue.split('S').length - 1;
        let derived_sS_percentage = ((s_Total+S_Total)/allowedCharactersFieldValue.length)*100;
        let sS_to_1_decimalplace = Number(Math.round(derived_sS_percentage + 'e1') + 'e-1');
        sS_percentage.innerHTML = `${sS_to_1_decimalplace}%`;
        sS.style.height = `${sS_to_1_decimalplace}%`;

        let add_aA_nN = aA_to_1_decimalplace + nN_to_1_decimalplace;           
        
        let displayRatio = document.getElementById('displayRatio');
        displayRatio.style.backgroundImage = `linear-gradient(to right, #0059ff ${aA_to_1_decimalplace}%, #02ec7f ${aA_to_1_decimalplace}%, #02ec7f ${add_aA_nN}%, #ff7b00 ${add_aA_nN}%)`;
        
        let approximateTotal = document.getElementById('approximateTotal');
        approximateTotal.innerHTML = 'Note: aA% + nN% + sS% &#8773 100%';
        approximateTotal.style.color = 'black';

        if (allowedCharactersFieldValue.length === 0) {
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
        
        let allowedCharactersFieldValue = allowedCharactersField.value;
        let strength = 0;
    
        let passwordCommentBox = document.getElementById('passwordCommentBox');
        let passwordCommentBoxSmall = document.getElementById('passwordCommentBoxSmall');

        if (allowedCharactersFieldValue.length < 1) {
            passwordCommentBox.innerHTML = '8 characters min | 64 characters max';
            passwordCommentBox.classList.remove('black');
            passwordCommentBox.classList.add('grey');
            passwordCommentBoxSmall.innerHTML = '8 char min | 64 char max';
            passwordCommentBoxSmall.classList.remove('black');
            passwordCommentBoxSmall.classList.add('grey');
        }else {
            passwordCommentBox.innerHTML = 'Too short';
            passwordCommentBox.classList.add('black');
            passwordCommentBoxSmall.innerHTML = 'Too short';
            passwordCommentBoxSmall.classList.add('black');
        }
    
        //whatever you type in first: whether its an alphabeth, number or symbol password strength increases by 1
        if (allowedCharactersFieldValue.length > 0) strength += 1;
    
        //increase length by 1 for a mix of alphabeth and number
        if (allowedCharactersFieldValue.match(/([a,A])/) && allowedCharactersFieldValue.match(/([n,N])/)) strength += 1;
               
        //increase length by 1 for a mix of alphabeth and symbol
        if (allowedCharactersFieldValue.match(/([a,A])/) && allowedCharactersFieldValue.match(/([s,S])/)) strength += 1;
    
        //increase length by 1 for a mix of lowercase and uppercase alphabeths
        if (allowedCharactersFieldValue.match(/([a])/) && allowedCharactersFieldValue.match(/([A])/)) strength += 1;
    
        //increase length by 1 for a mix of number and symbol
        if (allowedCharactersFieldValue.match(/([n,N])/) && allowedCharactersFieldValue.match(/([s,S])/)) strength += 1;
            
        let colorBox_1 = document.getElementById('colorBox_1');
        let colorBox_2 = document.getElementById('colorBox_2');
        let colorBox_3 = document.getElementById('colorBox_3');
        
        function noStrengthColors(){
            colorBox_1.classList.remove('weak', 'fair', 'strong');
            colorBox_2.classList.remove('weak', 'fair', 'strong');
            colorBox_3.classList.remove('weak', 'fair', 'strong');
        }

        function weakPasswordColors(){
            colorBox_1.classList.remove('fair');
            colorBox_1.classList.add('weak');
            colorBox_2.classList.remove('fair');
            colorBox_2.classList.add('lightgrey');
        } 

        function fairPasswordColors(){
            colorBox_1.classList.add('fair');
            colorBox_2.classList.add('fair');
            colorBox_3.classList.add('lightgrey');
            colorBox_1.classList.remove('strong');
            colorBox_2.classList.remove('strong');
            colorBox_3.classList.remove('strong');
        }

        function strongPasswordColors() {
            colorBox_1.classList.add('strong');
            colorBox_2.classList.add('strong');
            colorBox_3.classList.add('strong');
        }
        
        if (strength < 1) {
           noStrengthColors();
        }else if (strength === 1 && allowedCharactersFieldValue.length < 8) {
            passwordCommentBox.innerHTML = 'Weak - Too short';
            passwordCommentBoxSmall.innerHTML = 'Weak - Too short';
            weakPasswordColors();
        }else if (strength === 1 && allowedCharactersFieldValue.length >= 8) {
            passwordCommentBox.innerHTML = 'Weak Password';
            passwordCommentBoxSmall.innerHTML = 'Weak Password';
            weakPasswordColors()
        }else if (strength === 2 && allowedCharactersFieldValue.length < 8) {
            passwordCommentBox.innerHTML = 'Fair - Too short';
            passwordCommentBoxSmall.innerHTML = 'Fair - Too short';
            fairPasswordColors();
        }else if (strength === 2 && allowedCharactersFieldValue.length >= 8) {
            passwordCommentBox.innerHTML = 'Fair Password';
            passwordCommentBoxSmall.innerHTML = 'Fair Password';
            fairPasswordColors();
        }else if (strength >= 3 && allowedCharactersFieldValue.length < 8) {
            passwordCommentBox.innerHTML = 'Strong - Too short';
            passwordCommentBoxSmall.innerHTML = 'Strong - Too short';
            strongPasswordColors();
        }else {
            passwordCommentBox.innerHTML = 'Strong Password';
            passwordCommentBoxSmall.innerHTML = 'Strong Password';
            strongPasswordColors();
        }
    }

    //call the three functions on input
    allowedCharactersField.addEventListener('input', function() {
        passwordGenerator(); 
        passwordAnalyser();
        passwordStrength();
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
            errorBoxSmall.innerHTML = `Character not allowed!`;
            errorBoxSmall.style.color = 'red';
            passwordUpdate.innerHTML = 'Type in any of these alphabeths: aAnNsS';
            passwordUpdate.style.color = 'black';
            passwordUpdateSmall.innerHTML = 'Type in any of these: aAnNsS';
            passwordUpdateSmall.style.color = 'black';
        }
    });

    //copy password
    function copyPassword() {
        let allowedCharactersFieldValue = allowedCharactersField.value;

        if (allowedCharactersFieldValue.length >= 8) {
            outputField.select();
            outputField.setSelectionRange(0, 99999);
            document.execCommand('copy');
        }
    }

    //copy execution on click
    copyPasswordBtn.addEventListener('click', function (e) {
        e.preventDefault();
        copyPassword();
    });

    //collapse buttons
    let collapseButton_1 = document.getElementById('collapseButton_1');
    let howToUseTheApp = document.getElementById('howToUseTheApp');
    let toggle = 0;
    collapseButton_1.addEventListener('click', function (e) {
        toggle++;
        if (toggle === 1) {
            howToUseTheApp.classList.remove('collapse');
            howToUseTheApp.classList.add('expand');
        }

        if (toggle === 2) {
            howToUseTheApp.classList.remove('expand');
            howToUseTheApp.classList.add('collapse');
            toggle = 1;
            toggle--;
        } 
    });

    let collapseButton_2 = document.getElementById('collapseButton_2');
    let about = document.getElementById('about');
    let toggle2 = 0;
    collapseButton_2.addEventListener('click', function (e) {
        toggle2++;
        if (toggle2 === 1) {
            about.classList.remove('collapse');
            about.classList.add('expand');
        }

        if (toggle2 === 2) {
            about.classList.remove('expand');
            about.classList.add('collapse');
            toggle2 = 1;
            toggle2--;
        } 
    });
}());

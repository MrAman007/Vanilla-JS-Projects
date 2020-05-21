// DOM Strings
const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');

// FUNCTIONS

// general funcitons
function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function success(input) {
    const formControl =  input.parentElement;
    formControl.className = 'form-control success';
}
function error(input,message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    formControl.querySelector('small').textContent = message;
}

// empty field message
function isRequired() {
    return 'This field is required';
}

// function to check length
function checkLength(input,min,max) {
    if (input.value.trim() === ''){
        error(input, isRequired());
    } else if (input.value.length < min) {
        error(input,`${capitalize(input.id).trim()} must be of minimum ${min} characters`);
    } else if (input.value.length > max) {
        error(input, `${capitalize(input.id).trim()} must be less than ${max} characters`);
    } else {
        success(input);
    }
}


// Checking email validity
function checkEmail(input) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (input.value.trim() === '') {
        error(input, isRequired());
    }
    else if (!re.test(String(input.value).toLowerCase())){
        error(input,'Invalid email')
    } else {
        success(input);
    }
}

// Checking password match
function checkPasswordMatch(input1, input2) {
    if (input2.value === '') {
        error(input2,isRequired());
    }
    else if (input1.value !== input2.value) {
        error(input2,'Password didn\'t match, try again');
    } else {
        success(input2);
    }
}


// Event Listener
form.addEventListener('submit', (event)=>{
    event.preventDefault();
    
    //Check Length of Username and Password
    checkLength(username,3,6);
    checkLength(password,8,32);
    
    //Check email is valid
    checkEmail(email);

    //Check Password Match
    checkPasswordMatch(password, password2);


})
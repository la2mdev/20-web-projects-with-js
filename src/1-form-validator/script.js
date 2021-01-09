const form = document.getElementById('form');
const username = document.getElementById('username');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');
const email = document.getElementById('email');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-group error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-group success';
}

function getFieldName(input) {
    const id = input.id;
    const firtsLetter = id.charAt(0).toUpperCase();
    const otherLetters = id.slice(1);
    return `${firtsLetter}${otherLetters}`;
}

function checkEmail(input) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(input.value.trim()).toLowerCase())) {
        showSuccess(input)
    } else {
        showError(input, `enter a correct ${getFieldName(input)}`);
    }
}

function checkRequired(inputArr) {
    inputArr.forEach(input => {
        if (input.value.trim() === ''){
            showError(input, `${getFieldName(input)} is required`);
        } else{
            showSuccess(input);
        }
    });
}

function checkLength(input, min, max) {
    if (input.value.length < min) {
        showError(input, `${getFieldName(input)} must be at least ${min} characters`);
    } else if(input.value.length > max) {
        showError(input, `${getFieldName(input)} must be less than ${max} characters`);
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value === input2.value ){
        showSuccess(input2);
        return true;
    } else {
        showError(input2, 'Passwords do not match')
        return false;
    }
}

form.addEventListener('submit', (event) => {
    event.preventDefault();
    
    checkRequired([username, password, password2, email]);
    checkLength(username, 5, 15);
    
    if (checkPasswordsMatch(password, password2)){
        checkLength(password, 5, 15);
        checkLength(password2, 5, 15);
    };
    
    checkEmail(email);
});

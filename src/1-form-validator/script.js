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

function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
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

form.addEventListener('submit', (event) => {
    event.preventDefault();
    checkRequired([username, password, password2, email]);
});

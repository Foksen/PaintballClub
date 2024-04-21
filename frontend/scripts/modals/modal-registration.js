// set min/max date for form
function initDate() {
    let form = document.getElementById('form-registration');
    let inputs = form.getElementsByClassName('panel-input');
    let inputDate = Array.from(inputs).find((input) => {
        return input.name == 'date';
    });
    let currentDate = new Date();

    let currentYear = `${currentDate.getFullYear()}`;
    let nextYear = `${currentDate.getFullYear() + 1}`;
    let currentMonth = `${Math.floor(currentDate.getMonth() / 10)}${currentDate.getMonth() % 10}`;
    let currentDay = `${Math.floor(currentDate.getDay() / 10)}${currentDate.getDay() % 10}`;

    inputDate.min = `${currentYear}-${currentMonth}-${currentDay}`;
    inputDate.max = `${nextYear}-${currentMonth}-${currentDay}`;
}


// check if all required fields are filled
function isRegistrationFormReady() {
    let form = document.getElementById('form-registration');
    let inputs = form.getElementsByClassName('panel-input');

    let isReady = true;

    Array.from(inputs).forEach((input) => {
        if (input.hasAttribute('required') && !input.value) {
            isReady = false;
        }
    });
    
    return isReady;
}


// checkRegistration and set submit button enabled/disabled
function checkRegistrationForm() {
    let form = document.getElementById('form-registration');
    let submitButton = form.querySelector('.panel-submit');
    if (isRegistrationFormReady()) {
        submitButton.removeAttribute('disabled');
    }
    else {
        submitButton.disabled = true;
    }
}


// add event listeners to inputs field for checking if form is ready
function initInputs() {
    let form = document.getElementById('form-registration');
    let inputs = form.getElementsByClassName('panel-input');
    Array.from(inputs).forEach((input) => {
        input.addEventListener('input', () => {
            checkRegistrationForm();
        })
    });
}


// add event for submit button
function initSubmit() {
    let form = document.getElementById('form-registration');
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        let data = new FormData(form);

        console.log(JSON.stringify(Object.fromEntries(data)));
        
    });
}

checkRegistrationForm();
initDate();
initInputs();
initSubmit();
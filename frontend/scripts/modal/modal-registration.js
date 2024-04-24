
/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL FORM */


// open a registration modal using certain buttons
function initOpenRegistration() {
    let btns = document.getElementsByClassName('btn-open-modal-registration');
    let modalRegistration = document.getElementById('modal-registration');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            modalRegistration.dispatchEvent(new CustomEvent('modal-open'));
        });
    });
}


// set min/max date for form
function updateRegistrationDate(form) {
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


// function when submitting a form
function registrationSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(JSON.stringify(Object.fromEntries(data)));

    event.target.dispatchEvent(new CustomEvent('modal-close', { bubbles: true }));

    event.target.dispatchEvent(new CustomEvent('modal-message-open', {
        bubbles: true,
        detail: {
            type: 'question',
            subtitle: 'Registration result',
            text: 'No result'
        }
    })); 
}


// init form
function initRegistrationForm() {
    let form = document.getElementById('form-registration');
    updateRegistrationDate(form);
    form.addEventListener('submit', registrationSubmitFunction);
}


initOpenRegistration();
initRegistrationForm();
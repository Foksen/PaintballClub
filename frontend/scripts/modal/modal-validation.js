
/* SCRIPT FOR CHECKING ALL REQUIRED FIELDS COMPLETE */


// check if all form required fields are complete
function isFormComplete(form) {
    let inputs = form.getElementsByClassName('panel-input');
    let isReady = true;
    Array.from(inputs).forEach((input) => {
        if (input.hasAttribute('required') && !input.value) {
            isReady = false;
        }
    });
    return isReady;
}


// check if form is complete and set submit button enabled/disabled
function updateFormSubmit(form) {
    let submitButton = form.querySelector('.panel-submit');
    if (isFormComplete(form)) {
        submitButton.removeAttribute('disabled');
    }
    else {
        submitButton.disabled = true;
    }
}


// add event listeners to form input fields to check if it is complete
function initFormInputs(form) {
    let inputs = form.getElementsByClassName('panel-input');
    Array.from(inputs).forEach((input) => {
        input.addEventListener('input', () => {
            updateFormSubmit(form);
        });
    });
}


// enable form validation for all forms
function initFormValidation() {
    let forms = document.getElementsByClassName('panel-form');
    Array.from(forms).forEach((form) => {
        initFormInputs(form);
    });
}


initFormValidation();

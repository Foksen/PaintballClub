
/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL FORM */


// open a registration modal using certain buttons
function initOpenFeedback() {
    let btns = document.getElementsByClassName('btn-open-modal-feedback');
    let modalFeedback = document.getElementById('modal-feedback');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            modalFeedback.dispatchEvent(new Event('modal-open'));
        });
    });
}


// function when submitting a form
function feedbackSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(JSON.stringify(Object.fromEntries(data)));
    
    event.target.dispatchEvent(new Event('modal-close', { bubbles: true }));
}


// init form
function initFeedbackForm() {
    let form = document.getElementById('form-feedback');
    form.addEventListener('submit', feedbackSubmitFunction);
}


initOpenFeedback();
initFeedbackForm();

/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL FORM */


// open a registration modal using certain buttons
function initOpenFeedback() {
    let btns = document.getElementsByClassName('btn-open-modal-feedback');
    let modalFeedback = document.getElementById('modal-feedback');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            modalFeedback.dispatchEvent(new CustomEvent('modal-open'));
        });
    });
}


// function when submitting a form
function feedbackSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(JSON.stringify(Object.fromEntries(data)));
    
    event.target.dispatchEvent(new CustomEvent('modal-close', { bubbles: true }));

    event.target.dispatchEvent(new CustomEvent('modal-message-open', {
        bubbles: true,
        detail: {
            type: 'question',
            subtitle: 'Feedback result',
            text: 'No result'
        }
    })); 
}


// init form
function initFeedbackForm() {
    let form = document.getElementById('form-feedback');
    form.addEventListener('submit', feedbackSubmitFunction);
}


initOpenFeedback();
initFeedbackForm();
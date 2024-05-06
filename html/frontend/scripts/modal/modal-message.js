
/* SCRIPT TO OPEN A MODAL MESSAGE WHEN ON EVENT OCCURS ON ANY ELEMENT */

const ICON_SUCCESS = "./assets/icons/Success.svg";
const ICON_ERROR = "./assets/icons/Error.svg";
const ICON_INFO = "./assets/icons/Info.svg";
const ICON_QUESTION = "./assets/icons/Question.svg";


/* Create notification

elem.dispatchEvent(new CustomEvent('modal-message-open', {
    bubbles: true,
    detail: {
        type: 'success/error/info/question',
        subtitle: 'subtitle',
        text: 'text'
    }
})); 

*/


// changing the modal message depending on event details
function listenerMessage(event) {
    let type = event.detail.type;
    let subtitle = event.detail.subtitle;
    let text = event.detail.text;

    let modal = document.getElementById('modal-message');
    let modalImg = modal.querySelector('.panel-message-icon');
    let modalSubtitle = modal.querySelector('.panel-message-subtitle');
    let modalText = modal.querySelector('.panel-message-text');

    switch (type) {
        case 'success':
            modalImg.src = ICON_SUCCESS;
            break;
        case 'error':
            modalImg.src = ICON_ERROR;
            break;
        case 'info':
            modalImg.src = ICON_INFO;
            break;
        case 'question':
            modalImg.src = ICON_QUESTION;
            break;
    }
    modalSubtitle.innerHTML = subtitle;
    modalText.innerHTML = text;

    modal.dispatchEvent(new CustomEvent('modal-open'));
}


// add event listener pf modal message creating
function initNotifications() {
    document.addEventListener('modal-message-open', listenerMessage);
}


initNotifications();
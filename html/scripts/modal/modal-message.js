
/* SCRIPT TO OPEN A MODAL MESSAGE WHEN ON EVENT OCCURS ON ANY ELEMENT */


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
    let modalImgContainer = modal.querySelector('.panel-message-icon');
    let modalSubtitle = modal.querySelector('.panel-message-subtitle');
    let modalText = modal.querySelector('.panel-message-text');

    modalImgContainer.className = 'panel-message-icon ';
    switch (type) {
        case 'success':
            modalImgContainer.className += 'panel-message-icon-success'
            break;
        case 'error':
            modalImgContainer.className += 'panel-message-icon-error'
            break;
        case 'info':
            modalImgContainer.className += 'panel-message-icon-info'
            break;
        case 'question':
            modalImgContainer.className += 'panel-message-icon-question'
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
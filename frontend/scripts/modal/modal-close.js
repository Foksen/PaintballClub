
/* SCRIPT FOR CLOSING MODALS */


function openModal(event) {
    event.currentTarget.classList.add('modal-opened');
}


function closeModal(event) {
    event.currentTarget.classList.remove('modal-opened');
}


function initModalsClose() {
    let modals = document.getElementsByClassName('modal');
    Array.from(modals).forEach((modal) => {
        modal.addEventListener('modal-open', openModal);
        modal.addEventListener('modal-close', closeModal);

        let closeBtn = modal.querySelector('.panel-close-btn');
        closeBtn.addEventListener('click', () => {
            modal.dispatchEvent(new CustomEvent('modal-close'));
        });
    });
}


initModalsClose();
function openModal(modal) {
    modal.classList.add('modal-opened');
}

function closeModal(modal) {
    modal.classList.remove('modal-opened');
}

function initModalsClose() {
    let modals = document.getElementsByClassName('modal');
    Array.from(modals).forEach((modal) => {
        let closeBtn = modal.querySelector('.panel-close-btn');
        closeBtn.addEventListener('click', () => {
            closeModal(modal);
        })
    });
}

function initOpenRegistration() {
    let btns = document.getElementsByClassName('btn-open-modal-registration');
    let modalRegistration = document.getElementById('modal-registration');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            openModal(modalRegistration);
        });
    });
}

initModalsClose();
initOpenRegistration();
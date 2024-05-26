
/* SCRIPT FOR EXITING ADMINISTRATOR ACCOUNT */


function logoutEvent() {
    document.cookie = 'access-token=;expires=Thu, 01 Jan 1970 00:00:00 GMT;'
    window.location.href = 'auth.html';
}


function initLogOutButtons() {
    let logoutBtns = document.getElementsByClassName('header-account-logout-btn');
    Array.from(logoutBtns).forEach((logoutBtn) => {
        logoutBtn.addEventListener('click', logoutEvent);
    });
}


initLogOutButtons();
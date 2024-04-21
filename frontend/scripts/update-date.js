function initYear() {
    let date = new Date();
    let currentYear = date.getFullYear();
    let elements = document.getElementsByClassName('current-year');
    Array.from(elements).forEach((elem) => {
        elem.innerHTML = currentYear;
    });
}

initYear();
function authSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    console.log(JSON.stringify(Object.fromEntries(data)));

    // request for server ...
}


function initAuthForm() {
    let form = document.getElementById('auth-form');
    form.addEventListener('submit', authSubmitFunction);
}


initAuthForm();
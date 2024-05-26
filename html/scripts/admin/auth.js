
/* SIGN IN SCRIPT */

// request to the server to get token
async function requestAuth(signingData) {
    let response = await requestToApi('auth/sign-in', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(signingData)
    });
    if (response.status == 403) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось войти',
                text: 'Неверный логин или пароль'
            }
        })); 
        return;
    }
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось войти',
                text: 'Ошибка при авторизации. Информация об ошибке выведена в консоль'
            }
        })); 
        return;
    }
    return response.json();
}

async function authSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let signingData = Object.fromEntries(data);
    let result = (await requestAuth(signingData));
    if (result) {
        document.cookie = `access-token=${result.token};`;
        window.location.href = 'control.html';
    }
    event.target.reset();
    updateFormSubmit(event.target);
}


function initAuthForm() {
    let form = document.getElementById('auth-form');
    form.addEventListener('submit', authSubmitFunction);
}


initAuthForm();
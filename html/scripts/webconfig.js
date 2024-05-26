let backendHost;

const hostname = window && window.location && window.location.hostname;

if (hostname == 'pcmirea.ru') {
    backendHost = 'https://pcmirea.ru/api/';
}
else {
    backendHost = 'http://localhost:80/api/';
}

const API_ROOT = backendHost;

async function requestToApi(route, details) {
    try {
        return await fetch(`${API_ROOT}${route}`, details)
    } catch (error) {
        console.log(error);
        console.log(`${API_ROOT}${route}`);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось подключиться',
                text: 'Ошибка при подключении к серверу. Информация об ошибке выведена в консоль'
            }
        }));
    }
}


function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
}
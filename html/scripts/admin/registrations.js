
/* SCRIPT LOADING AND INITIALIZING REGISTRATION */


// possible registration states
const RegistrationStates = { 1: 'accept', 2: 'consider', 3: 'reject' };
// possible registration packets
const RegistrationPackets = { 1: 'Знакомство', 2: 'Новичок', 3: 'Любитель', 4: 'Профессионал' };


// request to the server to accept the registration
async function requestAcceptRegistration(eventId) {
    let registrationDetails = {
        id: eventId,
        state: {
            id: 1
        }
    };
    let response = await requestToApi('registrations/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(registrationDetails)
    });
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось изменить регистрацию',
                text: 'Ошибка при изменении регистрации. Информация об ошибке выведена в консоль'
            }
        })); 
        return false;
    }
    return true;
}


// request to the server to reject the registration
async function requestRejectRegistration(eventId) {
    let registrationDetails = {
        id: eventId,
        state: {
            id: 3
        }
    };
    let response = await requestToApi('registrations/', {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(registrationDetails)
    });
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось изменить регистрацию',
                text: 'Ошибка при изменении регистрации. Информация об ошибке выведена в консоль'
            }
        })); 
        return false;
    }
    return true;
}


// create registration in DOM
function createRegistrationCard(registration) {
    let registrationContainer = document.getElementById('registrations-container');

    let details = document.createElement('details');
    details.className = `request-details registration-card request-${RegistrationStates[registration.state.id]}`;
    registrationContainer.append(details);

    let summary = document.createElement('summary');
    summary.className = 'request-summary';
    details.append(summary);
    
    let domParser = new DOMParser().parseFromString(
        '<svg class="request-summary-icon" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg"> \
            <polygon points="396.6,160 416,180.7 256,352 96,180.7 115.3,160 256,310.5 "/> \
        </svg>', 'application/xml'
    )
    summary.append(
        summary.ownerDocument.importNode(domParser.documentElement, true)
    );

    let summaryText = document.createElement('span');
    summaryText.className = 'request-summary-text';
    summaryText.setAttribute('val', registration.id);
    summaryText.innerHTML = 'Заявка #';
    summary.append(summaryText);

    let content = document.createElement('div');
    content.className = 'request-content';
    details.append(content);

    let name = document.createElement('div');
    name.className = 'request-content-desc registration-name';
    name.setAttribute('val', registration.name);
    name.innerHTML = 'Имя:';
    content.append(name);

    let email = document.createElement('div');
    email.className = 'request-content-desc registration-email';
    email.setAttribute('val', registration.email);
    email.innerHTML = 'Почта:';
    content.append(email);

    let date = document.createElement('div');
    date.className = 'request-content-desc registration-date';
    date.setAttribute('val', registration.date);
    date.innerHTML = 'Дата:';
    content.append(date);

    let comment = document.createElement('div');
    comment.className = 'request-content-desc registration-comment';
    comment.setAttribute('val', registration.comment);
    comment.innerHTML = 'Комментарий:';
    content.append(comment);

    let packet = document.createElement('div');
    packet.className = 'request-content-desc registration-packet';
    packet.setAttribute('val', RegistrationPackets[registration.packet.id]);
    packet.innerHTML = 'Пакет:';
    content.append(packet);

    let btnsContainer = document.createElement('div');
    btnsContainer.className = 'request-btns';
    details.append(btnsContainer);

    let btnAccept = document.createElement('button');
    btnAccept.className = 'request-btn request-btn-accept registration-accept-btn';
    btnAccept.innerHTML = 'Одобрить';
    btnsContainer.append(btnAccept);
    btnAccept.addEventListener('click', () => {
        if (requestAcceptRegistration(registration.id)) {
            details.className = `request-details registration-card request-accept`;
        }
    });

    let btnReject = document.createElement('button');
    btnReject.className = 'request-btn request-btn-reject registration-reject-btn';
    btnReject.innerHTML = 'Отклонить';
    btnsContainer.append(btnReject);
    btnReject.addEventListener('click', () => {
        if (requestRejectRegistration(registration.id)) {
            details.className = `request-details registration-card request-reject`;
        }
    });

    return details;
}


// load registrations from server
async function loadRegistrations() {
    let response = await requestToApi('registrations/');
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось загрузить регистрации',
                text: 'Ошибка при загрузке регистраций. Информация об ошибке выведена в консоль'
            }
        })); 
        return;
    }
    return response.json();
}


// init registration cards
async function initRegistrations() {
    let registrations = await loadRegistrations();
    if (registrations) {
        try {
            Array.from(registrations).forEach((registration) => {
                try {
                    createRegistrationCard(registration);
                } catch (err) {
                    console.log(err);
                    console.log(registration);
                }
            });
        } catch (err) {
            console.log(err);
            document.dispatchEvent(new CustomEvent('modal-message-open', {
                bubbles: true,
                detail: {
                    type: 'error',
                    subtitle: 'Не удалось отобразить регистрации',
                    text: 'Регистрации загружены, но не удалось создать карточки. Информация об ошибке выведена в консоль'
                }
            })); 
        }
    }
}


initRegistrations();
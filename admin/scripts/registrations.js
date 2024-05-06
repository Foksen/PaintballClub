
/* SCRIPT LOADING AND INITIALIZING REGISTRATION */


// possible registration states
const RegistrationState = { ACCEPTED: 'accepted', CONSIDERATION: 'consideration', REJECTED: 'rejected' };
// possible registration packets
const RegistrationPacket = { KNOWING: 'Знакомство', BEGINNER: 'Новичок', AMATEUR: 'Любитель', PROFESSIONAL: 'Профи' };


// class of a registration
class Registration {
    constructor(id, name='Unknown', email='Unknown', packet=RegistrationPacket.KNOWING, date="01-01-1970", comment="No comment", state=RegistrationState.CONSIDERATION) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.packet = packet;
        this.date = date;
        this.comment = comment;
        this.state = state;
    }
}


// request to the server to accept the registration
function requestAcceptRegistration(eventId) {
    // Request for server to accept event
    console.log(`Accept registration #${eventId}`);
}


// request to the server to reject the registration
function requestRejectRegistration(eventId) {
    console.log(`Reject registration #${eventId}`);
}


// create registration in DOM
function createRegistrationCard(registration) {
    let registrationContainer = document.getElementById('registrations-container');

    let details = document.createElement('details');
    details.className = `request-details registration-card request-${registration.state}`;
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

    let packet = document.createElement('div');
    packet.className = 'request-content-desc registration-packet';
    packet.setAttribute('val', registration.packet);
    packet.innerHTML = 'Пакет:';
    content.append(packet);

    let date = document.createElement('div');
    date.className = 'request-content-desc registration-date';
    date.setAttribute('val', registration.date);
    date.innerHTML = 'Дата:';
    content.append(date);

    let comment = document.createElement('div');
    comment.className = 'request-content-desc registration-comment';
    comment.setAttribute('val', registration.comment);
    comment.innerHTML = 'Комментарий:';

    let btnsContainer = document.createElement('div');
    btnsContainer.className = 'request-btns';
    details.append(btnsContainer);

    let btnAccept = document.createElement('button');
    btnAccept.className = 'request-btn request-btn-accept registration-accept-btn';
    btnAccept.innerHTML = 'Одобрить';
    btnsContainer.append(btnAccept);
    btnAccept.addEventListener('click', () => {
        requestAcceptRegistration(registration.id);
    });

    let btnReject = document.createElement('button');
    btnReject.className = 'request-btn request-btn-reject registration-reject-btn';
    btnReject.innerHTML = 'Отклонить';
    btnsContainer.append(btnReject);
    btnReject.addEventListener('click', () => {
        requestRejectRegistration(registration.id);
    });

    return details;
}


// load registrations from server
function loadRegistrations() {
    // here will be a script accessing the server

    let registrations = [
        new Registration(0, 'Игорь Жолобов', 'izholobov2004@gmail.com', RegistrationPacket.BEGINNER, '01-01-1970', 'Something', RegistrationState.ACCEPTED),
        new Registration(1, 'Антон Смирнов', 'communist738@gmail.com', RegistrationPacket.AMATEUR, '02-01-1970', 'Something else', RegistrationState.CONSIDERATION),
    ];
    return registrations;
}



let registrations = loadRegistrations();
registrations.forEach((registration) => {
    createRegistrationCard(registration);
});
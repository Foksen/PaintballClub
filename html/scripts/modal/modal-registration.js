
/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL FORM */


const PacketIds = { 'knowing': 1, 'beginner': 2, 'amateur': 3, 'professional': 4 };


// open a registration modal using certain buttons
function initOpenRegistration() {
    let btns = document.getElementsByClassName('btn-open-modal-registration');
    let modalRegistration = document.getElementById('modal-registration');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            modalRegistration.dispatchEvent(new CustomEvent('modal-open'));
        });
    });
}


// set min/max date for form
function updateRegistrationDate(form) {
    let inputs = form.getElementsByClassName('panel-input');
    let inputDate = Array.from(inputs).find((input) => {
        return input.name == 'date';
    });
    let currentDate = new Date();
    let currentYear = `${currentDate.getFullYear()}`;
    let nextYear = `${currentDate.getFullYear() + 1}`;
    let currentMonth = `${Math.floor(currentDate.getMonth() / 10)}${currentDate.getMonth() % 10}`;
    let currentDay = `${Math.floor(currentDate.getDay() / 10)}${currentDate.getDay() % 10}`;
    inputDate.min = `${currentYear}-${currentMonth}-${currentDay}`;
    inputDate.max = `${nextYear}-${currentMonth}-${currentDay}`;
}


// send a request to put registration into the database
async function sendRegistration(registration) {
    let response = await requestToApi('registrations/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(registration)
    });
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось отправить заявку',
                text: 'Техническая ошибка при отправке заявку. Информация об ошибке выведена в консоль'
            }
        })); 
        return false;
    }
    return true;
}


// function when submitting a form
function registrationSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let registration = {
        name: data.get('name'),
        email: data.get('email'),
        date: Math.floor(Date.parse(data.get('date')) / 1000) * 1000,
        comment: data.get('comment'),
        packet: {
            id: PacketIds[data.get('packet')]
        },
        state: {
            id: 2
        }
    }
    if (sendRegistration(registration)) {
        event.target.dispatchEvent(new CustomEvent('modal-close', { bubbles: true }));
        event.target.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'success',
                subtitle: 'Заявка отправлена',
                text: 'Ваша заявка успешно отправлена! Администратор просмотрит её и свяжется с вами по почте'
            }
        })); 
    }
    event.target.reset();
    updateFormSubmit(event.target);
}

// init form
function initRegistrationForm() {
    let form = document.getElementById('form-registration');
    updateRegistrationDate(form);
    form.addEventListener('submit', registrationSubmitFunction);
}


initOpenRegistration();
initRegistrationForm();
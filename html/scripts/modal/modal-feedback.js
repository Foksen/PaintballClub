
/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL FORM */


// open a registration modal using certain buttons
function initOpenFeedback() {
    let btns = document.getElementsByClassName('btn-open-modal-feedback');
    let modalFeedback = document.getElementById('modal-feedback');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            modalFeedback.dispatchEvent(new CustomEvent('modal-open'));
        });
    });
}


// send a request to put review into the database
async function sendReview(review) {
    let response = await requestToApi('reviews/', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        mode: 'cors',
        body: JSON.stringify(review)
    });
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось отправить отзыв',
                text: 'Техническая ошибка при отправке отзыва. Информация об ошибке выведена в консоль'
            }
        })); 
        return false;
    }
    return true;
}


// function when submitting a form
function feedbackSubmitFunction(event) {
    event.preventDefault();
    let data = new FormData(event.target);
    let review = {
        name: data.get('name'),
        email: data.get('email'),
        experience: data.get('experience'),
        text: data.get('text'),
        date: Math.floor(Date.now() / 1000) * 1000,
        state: {
            id: 2
        }
    };
    if (sendReview(review)) {
        event.target.dispatchEvent(new CustomEvent('modal-close', { bubbles: true }));
        event.target.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'success',
                subtitle: 'Отзыв отправлен',
                text: 'Ваш отзыв отправлен на одобрение! После проверки модератора он будет добавлен на сайт'
            }
        })); 
    }
}


// init form
function initFeedbackForm() {
    let form = document.getElementById('form-feedback');
    form.addEventListener('submit', feedbackSubmitFunction);
}


initOpenFeedback();
initFeedbackForm();
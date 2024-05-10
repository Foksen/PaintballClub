
/* SCRIPT LOADING AND INITIALIZING REVIEWS */


// possible review states
const ReviewStates = { 1: 'accept', 2: 'consider', 3: 'reject' };


// request to the server to accept the review
async function requestAcceptReview(eventId) {
    let reviewDetails = { 
        id: eventId,
        state: {
            id: 1
        }
    };
    let response = await requestToApi('reviews/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(reviewDetails)
    });
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось изменить отзыв',
                text: 'Ошибка при изменении отзыва. Информация об ошибке выведена в консоль'
            }
        })); 
        return false;
    }
    return true;
}


// request to the server to reject the review
async function requestRejectReview(eventId) {
    let reviewDetails = { 
        id: eventId,
        state: {
            id: 3
        }
    };
    let response = await requestToApi('reviews/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            mode: 'cors',
            body: JSON.stringify(reviewDetails)
    });
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось изменить отзыв',
                text: 'Ошибка при изменении отзыва. Информация об ошибке выведена в консоль'
            }
        })); 
        return false;
    }
    return true;
}


// create review in DOM
function createReviewCard(review) {
    let reviewsContainer = document.getElementById('reviews-container');

    let details = document.createElement('details');
    details.className = `request-details review-card request-${ReviewStates[review.state.id ?? 0]}`;
    reviewsContainer.append(details);

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
    summaryText.setAttribute('val', review.id);
    summaryText.innerHTML = 'Отзыв #';
    summary.append(summaryText);

    let content = document.createElement('div');
    content.className = 'request-content';
    details.append(content);

    let name = document.createElement('div');
    name.className = 'request-content-desc review-name';
    name.setAttribute('val', review.name);
    name.innerHTML = 'Имя:';
    content.append(name);

    let email = document.createElement('div');
    email.className = 'request-content-desc review-email';
    email.setAttribute('val', review.email);
    email.innerHTML = 'Почта:';
    content.append(email);

    let exp = document.createElement('div');
    exp.className = 'request-content-desc review-exp';
    exp.setAttribute('val', review.experience);
    exp.innerHTML = 'Опыт:';
    content.append(exp);

    let text = document.createElement('div');
    text.className = 'request-content-desc review-text';
    text.setAttribute('val', review.text);
    text.innerHTML = 'Текст:';
    content.append(text);

    let btnsContainer = document.createElement('div');
    btnsContainer.className = 'request-btns';
    details.append(btnsContainer);

    let btnAccept = document.createElement('button');
    btnAccept.className = 'request-btn request-btn-accept review-accept-btn';
    btnAccept.innerHTML = 'Одобрить';
    btnsContainer.append(btnAccept);
    btnAccept.addEventListener('click', () => {
        if (requestAcceptReview(review.id)) {
            details.className = `request-details review-card request-accept`;
        }
    });

    let btnReject = document.createElement('button');
    btnReject.className = 'request-btn request-btn-reject review-reject-btn';
    btnReject.innerHTML = 'Отклонить';
    btnsContainer.append(btnReject);
    btnReject.addEventListener('click', () => {
        if (requestRejectReview(review.id)) {
            details.className = `request-details review-card request-reject`;
        }
    });

    return details;
}


// load reviews from server
async function loadReviews() {
    let response = await requestToApi('reviews/');
    if (!response.ok) {
        let msg = await response.text();
        console.log(msg);
        document.dispatchEvent(new CustomEvent('modal-message-open', {
            bubbles: true,
            detail: {
                type: 'error',
                subtitle: 'Не удалось загрузить отзывы',
                text: 'Ошибка при загрузке отзывов. Информация об ошибке выведена в консоль'
            }
        })); 
        return;
    }
    return response.json();
}


// init review cards
async function initReviews() {
    let reviews = await loadReviews();
    if (reviews) {
        try {
            Array.from(reviews).forEach((review) => {
                try {
                    createReviewCard(review);
                } catch (err) {
                    console.log(err);
                    console.log(review);
                }
            });
        } catch (err) {
            console.log(err);
            document.dispatchEvent(new CustomEvent('modal-message-open', {
                bubbles: true,
                detail: {
                    type: 'error',
                    subtitle: 'Не удалось отобразить отзывы',
                    text: 'Отзывы загружены, но не удалось создать карточки. Информация об ошибке выведена в консоль'
                }
            })); 
        }
    }
}


initReviews();
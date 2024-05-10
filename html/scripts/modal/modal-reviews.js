
/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL REVIEWS */


// util function. get N non-repeating array indexes (or less if the array is shorter)
function getRandomIndexes(N, arrlength) {
    let selectedReviewsIndexes = [];
    while (selectedReviewsIndexes.length < N && selectedReviewsIndexes.length < arrlength) {
        let i = Math.floor(Math.random() * arrlength);
        if (selectedReviewsIndexes.indexOf(i) != -1)
            continue;
        selectedReviewsIndexes.push(i);
    }
    return selectedReviewsIndexes;
}


// util function. get elements of array by indexes
function getElementsByIndexes(array, indexes) {
    let result = [];
    indexes.forEach((index) => {
        result.push(array[index]);
    });
    return result;
}


// open a reviews modal using certain buttons
function initOpenReviews() {
    let btns = document.getElementsByClassName('btn-open-modal-reviews');
    let modalReviews = document.getElementById('modal-reviews');
    Array.from(btns).forEach((btn) => {
        btn.addEventListener('click', () => {
            modalReviews.dispatchEvent(new CustomEvent('modal-open'));
        });
    });
}


// create a DOM-element of review card for modal
function createModalReviewCard(review) {
    let card = document.createElement('div');
    card.classList.add('panel-reviews-card');

    let cardHead = document.createElement('div');
    cardHead.classList.add('panel-reviews-card-head')
    card.append(cardHead);

    let cardName = document.createElement('div');
    cardName.classList.add('panel-reviews-card-name');
    cardHead.append(cardName);

    let cardExperience = document.createElement('div');
    cardExperience.classList.add('panel-reviews-card-experience');
    cardHead.append(cardExperience);

    let cardText = document.createElement('div');
    cardText.classList.add('panel-reviews-card-text');
    card.append(cardText);

    cardName.innerHTML = review.name;
    cardExperience.innerHTML = review.experience;
    cardText.innerHTML = review.text;

    return card;
}


// create a DOM-element of review card for reviews block
function createReviewCard(review) {
    let card = document.createElement('card');
    card.classList.add('reviews-card');

    let cardHead = document.createElement('div');
    cardHead.classList.add('reviews-card-head');
    card.append(cardHead);

    let cardName = document.createElement('div');
    cardName.classList.add('reviews-card-name');
    cardHead.append(cardName);

    let cardExp = document.createElement('div');
    cardExp.classList.add('reviews-card-exp');
    cardHead.append(cardExp);

    let cardText = document.createElement('div');
    cardText.classList.add('reviews-card-text');
    card.append(cardText);

    let cardBtn = document.createElement('button');
    cardBtn.classList.add('reviews-card-btn');
    cardBtn.classList.add('btn-open-modal-reviews');
    cardBtn.innerHTML = "Читать полностью";
    card.append(cardBtn);

    cardName.innerHTML = review.name;
    cardExp.innerHTML = review.experience;
    cardText.innerHTML = review.text;

    return card;
}


// load reviews from server
async function loadReviews() {
    let response = await requestToApi('reviews/accepted');
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


// fill reviews block with random reviews
function initReviewsBlock(reviews) {
    let reviewsContainer = document.getElementById('reviews-container');
    let selectedReviews = getElementsByIndexes(reviews, getRandomIndexes(3, reviews.length));
    Array.from(selectedReviews).forEach((review) => {
        reviewsContainer.prepend(createReviewCard(review));
    });
}


// fill modal panel with loaded reviews
function initModalReviews(reviews) {
    let panel = document.getElementById('panel-reviews');
    Array.from(reviews).forEach((review) => {
        panel.append(createModalReviewCard(review));
    });
}


// init reviews in block and modal and set openning buttons
async function initReviews() {
    let reviews = await loadReviews();
    if (reviews) {
        try {
            initReviewsBlock(reviews);
            initModalReviews(reviews);
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
    initOpenReviews();
}


initReviews();
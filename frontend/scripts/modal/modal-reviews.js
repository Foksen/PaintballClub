
/* SCRIPT OF SPECIFIC BEHAVIOR FOR A MODAL REVIEWS */


// class of a review
class Review {
    constructor(name='Unknown', experience=0, text='Something is rotten in the state of Denmark') {
        this.name = name;
        this.experience = experience;
        this.text = text;
    }
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
function loadReviews() {
    // loading reviews    
    let reviews = [
        new Review('Игорь Жолобов', '1 год', 'Очень понравился ваш клуб. Снаряжение выдали новое, площадка хорошо подходит для пейтбольных боёв. Обязательно приду ещё!'),
        new Review('Василий Пупкин', '3 года', 'Хороший клуб, близко к моему дому. Каждый месец собираюсь c друзьями и играю здесь. Администратор помогает в случае возникновения каких-либо проблем. Поле хорошее, чистое. Оружие качественное, подобные аналоги в магазинах стоят довольно дорого.'),
        new Review('Иван Иваныч', '5 лет', 'Лучшего клуба в Москве не найти! Цены демократичные - в других клубах берут намного больше. У клуба очень хорошее название, а главное - оригинальное. Отдельное спасибо автору, придумавшему его. Пойду ещё поиграю.')
    ];
    return reviews;

    // UPDATE IT
}


// get N non-repeating array indexes (or less if the array is shorter)
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


// get elements of array by indexes
function getElementsByIndexes(array, indexes) {
    let result = [];
    indexes.forEach((index) => {
        result.push(array[index]);
    });
    return result;
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


// init reviews in block and modal
function initReviews() {
    let reviews = loadReviews();
    initReviewsBlock(reviews);
    initModalReviews(reviews);
}


initReviews();
initOpenReviews();
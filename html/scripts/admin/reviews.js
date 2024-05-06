
/* SCRIPT LOADING AND INITIALIZING REVIEWS */


// possible review states
const ReviewState = { ACCEPTED: 'accepted', CONSIDERATION: 'consideration', REJECTED: 'rejected' };


// class of a review
class Review {
    constructor(id, name='Unknown', email='Unknown', experience='0', text='Something is rotten in the state of Denmark', state=ReviewState.CONSIDERATION) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.experience = experience;
        this.text = text;
        this.state = state;
    }
}


// request to the server to accept the review
function requestAcceptReview(eventId) {
    // Request for server to accept event
    console.log(`Accept review #${eventId}`);
}


// request to the server to reject the review
function requestRejectReview(eventId) {
    console.log(`Reject review #${eventId}`);
}


// create review in DOM
function createReviewCard(review) {
    let reviewsContainer = document.getElementById('reviews-container');

    let details = document.createElement('details');
    details.className = `request-details review-card request-${review.state}`;
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
        requestAcceptReview(review.id);
    });

    let btnReject = document.createElement('button');
    btnReject.className = 'request-btn request-btn-reject review-reject-btn';
    btnReject.innerHTML = 'Отклонить';
    btnsContainer.append(btnReject);
    btnReject.addEventListener('click', () => {
        requestRejectReview(review.id);
    });

    return details;
}


// load reviews from server
function loadReviews() {
    // here will be a script accessing the server

    let reviews = [
        new Review(0, 'Игорь Жолобов', 'izholobov2004@gmail.com', '1 год', 'Супер-пупер!', ReviewState.CONSIDERATION),
        new Review(1, 'Антон Смирнов', 'communist738@gmail.com', '3 месяца', 'Гуд', ReviewState.ACCEPTED),
        new Review(2, 'Сергей Воронков', 'svoronkov1241@gmail.com', '6 лет', 'Збс', ReviewState.REJECTED),
    ];
    return reviews;
}



let reviews = loadReviews();
reviews.forEach((review) => {
    createReviewCard(review);
});
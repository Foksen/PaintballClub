var currentReview = -1;

const reviewsContainer = document.querySelector(".reviews-container");
const sliderBtnPrev = document.querySelector(".reviews-slider-btn-prev");
const sliderBtnNext = document.querySelector(".reviews-slider-btn-next");

const bodyWidthCards3 = 1200;
const bodyWidthCards2 = 768;

const transitionTime = 500;

const reviews = [
    {
      name: "Игорь Жолобов",
      exp: "1 год",
      text: "Очень понравился ваш клуб. Снаряжение выдали новое, площадка хорошо подходит для пейтбольных боёв. Обязательно приду ещё!"
    },
    {
      name: "Василий Пупкин",
      exp: "3 года",
      text: "Хороший клуб, близко к моему дому. Каждый месец собираюсь с друзьями и играю здесь. Администратор помогает в случае возникновения каких-либо проблем. Поле хорошее, чистое. Оружие качественное, подобные аналоги в магазинах стоят довольно дорого."
    },
    {
      name: "Иван Иваныч",
      exp: "5 лет",
      text: "Лучшего клуба в Москве не найти! Цены демократичные - в других клубах берут намного больше. У клуба очень хорошее название, а главное - оригинальное. Отдельное спасибо автору, придумавшему его. Пойду ещё поиграю."
    },
    {
      name: "Александр Холод",
      exp: "3 года",
      text: "Хороший клуб, близко к моему дому. Каждый месец собираюсь с друзьями и играю здесь. Администратор помогает в случае возникновения каких-либо проблем. Поле хорошее, чистое. Оружие качественное, подобные аналоги в магазинах стоят довольно дорого."
    },
    {
      name: "Артём Шилин",
      exp: "5 лет",
      text: "Лучшего клуба в Москве не найти! Цены демократичные - в других клубах берут намного больше. У клуба очень хорошее название, а главное - оригинальное. Отдельное спасибо автору, придумавшему его. Пойду ещё поиграю."
    }
  ];


function generateCard(review) {
    let elem = document.createElement('div');
    elem.className = "reviews-card";
    elem.style.opacity = 0;

    let head = document.createElement('div');
    head.className = "reviews-card-head";

    let name = document.createElement('div');
    name.className = "reviews-card-name";
    name.innerHTML = review.name;

    let exp = document.createElement('div');
    exp.className = "reviews-card-exp";
    exp.innerHTML = review.exp;

    head.appendChild(name);
    head.appendChild(exp);

    let text = document.createElement('div');
    text.className = "reviews-card-text";
    text.innerHTML = review.text;

    let link = document.createElement('a');
    link.className = "reviews-card-link";
    link.innerHTML = "Читать полностью";

    elem.append(head);
    elem.append(text);
    elem.append(link)

    return elem;
}


function fixReviewsContainer() {
    let sliderHeight = reviewsContainer.clientHeight;
    reviewsContainer.style.height = `${sliderHeight}px`;
}


function unfixReviewsContainer() {
    setTimeout(() => {
        reviewsContainer.removeAttribute("style");
    }, 1);
}


function prevReview() {
    fixReviewsContainer();

    let cards = document.getElementsByClassName("reviews-card");
    if (cards) {
        Array.from(cards).forEach((card) => {
            card.style.opacity = 0;
        });
    }

    setTimeout(() => {
        while (reviewsContainer.lastChild) {
            reviewsContainer.removeChild(reviewsContainer.lastChild);
        }

        let bodyWidth = document.body.clientWidth;

        let d = 0;
        if (bodyWidth >= bodyWidthCards3) {
            d = 3;
        }
        else if (bodyWidth >= bodyWidthCards2) {
            d = 2;
        }
        else {
            d = 1;
        }

        currentReview = ((currentReview - 1) % reviews.length + reviews.length) % reviews.length;
        for (let i = 0; i < d; ++i) {
            let element = generateCard(reviews[(currentReview + i) % reviews.length]);
            reviewsContainer.append(element);
        }

        setTimeout(() => {
            Array.from(document.getElementsByClassName("reviews-card")).forEach((card) => {
                card.removeAttribute("style");
            });
        }, 20);

    }, transitionTime);


    unfixReviewsContainer();
}


function nextReview() {
    fixReviewsContainer();

    let cards = document.getElementsByClassName("reviews-card");
    if (cards) {
        Array.from(cards).forEach((card) => {
            card.style.opacity = 0;
        });
    }

    setTimeout(() => {
        while (reviewsContainer.lastChild) {
            reviewsContainer.removeChild(reviewsContainer.lastChild);
        }

        let bodyWidth = document.body.clientWidth;

        let d = 0;
        if (bodyWidth >= bodyWidthCards3) {
            d = 3;
        }
        else if (bodyWidth >= bodyWidthCards2) {
            d = 2;
        }
        else {
            d = 1;
        }

        currentReview = (currentReview + 1) % reviews.length;
        for (let i = 0; i < d; ++i) {
            let element = generateCard(reviews[(currentReview + i) % reviews.length]);
            reviewsContainer.append(element);
        }

        setTimeout(() => {
            Array.from(document.getElementsByClassName("reviews-card")).forEach((card) => {
                card.removeAttribute("style");
            });
        }, 20);

    }, transitionTime);

    unfixReviewsContainer();
}


sliderBtnPrev.addEventListener("click", () => {
    prevReview();
});


sliderBtnNext.addEventListener("click", () => {
    nextReview();
});


window.addEventListener("resize", () => {
    currentReview = 0;
    prevReview();
});


prevReview();
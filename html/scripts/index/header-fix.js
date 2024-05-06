let isFixed = false;


// Fix header when main block is above
function fixHeader() {
    if (!isFixed) {
        isFixed = true;
        let header = document.querySelector(".header");
        header.classList.add("header-fixed");
    }
}


// Unfix header when we see main block;
function unfixHeader() {
    if (isFixed) {
        isFixed = false;
        let header = document.querySelector(".header");
        header.classList.remove("header-fixed");
    }
}


// Update header when scroll
window.addEventListener("scroll", function () {
    let mainBlockHeight = document.querySelector(".section-main").clientHeight;
    if (this.scrollY >= mainBlockHeight) {
        fixHeader();
    }
    else {
        unfixHeader();
    }
});
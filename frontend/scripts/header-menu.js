function animationSizing(element, oldHeight, newHeight, totalTime) {
    element.style.height = `${oldHeight}px`;
    let i = 0, maxI = 20;
    let timer = setInterval(function() {
        if (i >= maxI) {
            element.style.height = "";
            clearInterval(timer);
            return;
        }
        element.style.height = `${oldHeight + (newHeight - oldHeight) / maxI * i}px`;
        ++i;
    }, totalTime / maxI);
}


// Animation open header
function openHeader() {
    let header = document.querySelector(".header");
    let headerNav = document.querySelector(".header-nav");

    headerNav.style.opacity = 0;

    let oldHeight = header.clientHeight;
    header.classList.add("header-opened");
    let newHeight = header.clientHeight;
    animationSizing(header, oldHeight, newHeight, 200);
    
    setTimeout(() => {
        headerNav.removeAttribute("style");
    }, 200);
}


// Animation close header
function closeHeader() {
    let header = document.querySelector(".header");
    let headerNav = document.querySelector(".header-nav");

    headerNav.style.opacity = 0;

    setTimeout(() => {
        let oldHeight = header.clientHeight;
        header.classList.remove("header-opened");
        headerNav.removeAttribute("style");
        let newHeight = header.clientHeight;
        animationSizing(header, oldHeight, newHeight, 200);
    }, 200);
}


// Event if click outside the header
function handleClick(event) {
    let header = event.target.closest(".header");
    if (!header) {
        let cb = document.querySelector("#header-menu-cb");
        cb.checked = false;
        cb.dispatchEvent(new Event("change"));
    }
}


// Event when checkbox is changed
function handleCheckbox(event) {
    if (event.currentTarget.checked) {
        openHeader();
        document.addEventListener("click", handleClick);
    }
    else {
        closeHeader();
        document.removeEventListener("click", handleClick);
    }
}


document.querySelector("#header-menu-cb").addEventListener("change", handleCheckbox);
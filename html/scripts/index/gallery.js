function getImageUrlForRb(rb) {
    let rbId = rb.id;
    let labels = document.getElementsByClassName('gallery-preview-label');
    let result;
    Array.from(labels).forEach((label) => {
        if (label.getAttribute('for') == rbId) {
            let img = label.querySelector('.gallery-preview-photo');
            result = img.getAttribute('src');
        }
    });
    return result;
}

function setImageForContainer(url) {
    let selectedImageContainer = document.getElementById('gallery-selected-photo-container');
    let timer = parseFloat(getComputedStyle(selectedImageContainer)['transitionDuration']) * 1000;
    selectedImageContainer.style.opacity = 0;
    setTimeout(() => {
        selectedImageContainer.style.backgroundImage = `url('${url}')`;
        selectedImageContainer.style.opacity = 1;
    }, timer);
}

function initRbs() {
    let rbs = document.getElementsByClassName('gallery-preview-rb');
    Array.from(rbs).forEach((rb) => {
        rb.addEventListener('change', () => {
            setImageForContainer(getImageUrlForRb(rb));
        });
    });
}

initRbs();
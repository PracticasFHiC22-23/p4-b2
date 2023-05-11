const images = document.querySelectorAll('#banner img');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
let index = 0;

function showImage() {
    images.forEach(image => {
        image.classList.remove('active');
    });
    images[index].classList.add('active');
}

function nextImage() {
    index++;
    if (index >= images.length) {
        index = 0;
    }
    showImage();
}

function prevImage() {
    index--;
    if (index < 0) {
        index = images.length - 1;
    }
    showImage();
}

nextBtn.addEventListener('click', nextImage);
prevBtn.addEventListener('click', prevImage);

setInterval(nextImage, 5000); // cambiar imagen cada 5 segundos

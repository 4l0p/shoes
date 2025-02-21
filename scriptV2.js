const section6 = document.querySelector('.section-5');
const images = section6.querySelectorAll('.section__slide--shoe img');
const thumbnails = section6.querySelectorAll('.thumb-circle');
const prevButton = section6.querySelector('.section__slide--prev');
const nextButton = section6.querySelector('.section__slide--next');

let currentImageIndex = 0;

function showCurrentImage() {
  images.forEach((image, index) => {
    image.classList.toggle('active', index === currentImageIndex);
    image.classList.toggle('hide', index !== currentImageIndex);
  });
  thumbnails.forEach((thumbnail, index) => {
    thumbnail.classList.toggle('active', index === currentImageIndex);
  });
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  showCurrentImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  showCurrentImage();
}

prevButton.addEventListener('click', prevImage);
nextButton.addEventListener('click', nextImage);

thumbnails.forEach((thumbnail, index) => {
  thumbnail.addEventListener('click', () => {
    currentImageIndex = index;
    showCurrentImage();
  });
});

showCurrentImage();
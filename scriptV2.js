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

const optionSize = document.querySelectorAll('.size')

// remove qualquer seleção de tamanhos ao carregar a pagina
optionSize.forEach((size) => {
  size.classList.remove('selected')
})

// função para selecionar o tamanho
optionSize.forEach((size) => {
  size.addEventListener('click', (e) => {
    // Verifica se o elemento clicado já está selecionado
    if (e.target.classList.contains('selected')) {
      // Se já estiver selecionado, remove a seleção
      e.target.classList.remove('selected');
    } else {
      // Remove a classe 'selected' de todos os elementos
      optionSize.forEach((otherSize) => {
        otherSize.classList.remove('selected');
      });
      e.target.classList.add('selected')
    }
  })
})


//mover a pagina para seção de comprar
document.getElementById('addToBag').addEventListener('click', () => {
  document.getElementsByClassName('main-info')[0].scrollIntoView({behavior: 'smooth'})
})

//selecionando os elementos da galeria de fotos principal
const mainPhoto = document.querySelector('.main-photo')
const optionsColorsImg = document.querySelectorAll('.options--colors__img img')
const bigPhotos = ['black', 'grey', 'orange', 'red']
const titleProduct = document.querySelector('.main-info__title--h1')
const colorProduct = ['Preto', 'Cinza', 'Laranja', 'Vermelho']

currentImageIndex = 0

//mostra a imagem do tenis preto por padrão
mainPhoto.innerHTML = `<img src="./assets/${bigPhotos[currentImageIndex]}-big.jpg" alt="Imagem Grande do Tênis"></img>`

//seleciona o tenis preto por padrão
optionsColorsImg[currentImageIndex].classList.add('selected')

optionsColorsImg.forEach((option, index) => {
  option.addEventListener('click', (e) => {
    if(e.target.classList.contains('selected')) {
      e.target.classList.remove('selected')
      titleProduct.innerHTML = `<h1>Xtreme 200mx</h1>`
    } else {
      optionsColorsImg.forEach((otherOptions) => {
        otherOptions.classList.remove('selected')
        titleProduct.innerHTML = `<h1>Xtreme 200mx</h1>`
      })
      e.target.classList.add('selected')
      mainPhoto.innerHTML = `<img src="./assets/${bigPhotos[index]}-big.jpg" alt="Imagem Grande do Tênis"></img>`
      titleProduct.innerHTML = `<h1>Xtreme 200mx - <span class='capitalize'>${colorProduct[index]} </span></h1>`
    }
  })
})
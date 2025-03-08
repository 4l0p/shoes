const section6 = document.querySelector('.section-5');
const images = section6.querySelectorAll('.section__slide--shoe img');
const thumbnails = section6.querySelectorAll('.thumb-circle');
const prevButton = section6.querySelector('.section__slide--prev');
const nextButton = section6.querySelector('.section__slide--next');
//selecionando os elementos da galeria de fotos principal
const mainPhoto = document.querySelector('.main-photo')
const optionsColorsImg = document.querySelectorAll('.options--colors__img img')
const bigPhotos = ['black', 'grey', 'orange', 'red']
const titleProduct = document.querySelector('.main-info__title--h1')
const colorProduct = ['Preto', 'Branco', 'Laranja', 'Vermelho']
const codeProduct = [1, 2, 3, 4]
const optionSize = document.querySelectorAll('.size')
const addSubNumber = document.querySelectorAll('.payment__amount button')
const inputNumberQuantity = document.querySelector('.payment__amount input')
const price = document.querySelector('.main-info__price--real span')
const btnBuy = document.querySelector('.payment__button button')

let selectedCode, selectedSize, selectedQuantity, selectedColor, selectedPrice, selectedDescription = ''

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

// remove qualquer seleção de tamanhos ao carregar a pagina
optionSize.forEach((size) => {
  size.classList.remove('selected')
})

// função para selecionar o tamanho
optionSize.forEach((size) => {
  size.addEventListener('click', (e) => {
    // // Verifica se o elemento clicado já está selecionado
    // if (e.target.classList.contains('selected')) {
    //   // Se já estiver selecionado, remove a seleção
    //   e.target.classList.remove('selected');
    // } else {
      // Remove a classe 'selected' de todos os elementos
      optionSize.forEach((otherSize) => {
        otherSize.classList.remove('selected');
      });
      e.target.classList.add('selected')
      selectedSize = size.innerHTML
  })
})

//mover a pagina para seção de comprar
document.getElementById('addToBag').addEventListener('click', () => {
  document.getElementsByClassName('main-info')[0].scrollIntoView({ behavior: 'smooth' })
})

currentImageIndex = 0

//mostra a imagem do tenis preto por padrão
mainPhoto.innerHTML = `<img src="./assets/${bigPhotos[currentImageIndex]}-big.jpg" alt="Imagem Grande do Tênis"></img>`
titleProduct.innerHTML = `<h1>Xtreme 200mx - <span class='capitalize'>${colorProduct[currentImageIndex]} </span></h1>`
//seleciona o tenis preto por padrão
optionsColorsImg[currentImageIndex].classList.add('selected')
selectedColor = colorProduct[currentImageIndex]
selectedCode = codeProduct[currentImageIndex]
selectedDescription = titleProduct.innerText

optionsColorsImg.forEach((option, index) => {
  option.addEventListener('click', (e) => {
    // if (e.target.classList.contains('selected')) {
    //   e.target.classList.remove('selected')
    //   titleProduct.innerHTML = `<h1>Xtreme 200mx</h1>`
    // } else {
      optionsColorsImg.forEach((otherOptions) => {
        otherOptions.classList.remove('selected')
        titleProduct.innerHTML = `<h1>Xtreme 200mx</h1>`
      })
      e.target.classList.add('selected')
      mainPhoto.innerHTML = `<img src="./assets/${bigPhotos[index]}-big.jpg" alt="Imagem Grande do Tênis"></img>`
      titleProduct.innerHTML = `<h1>Xtreme 200mx - <span class='capitalize'>${colorProduct[index]} </span></h1>`
      console.log(titleProduct.innerText)
      selectedColor = colorProduct[index]
      selectedCode = codeProduct[index]
      selectedDescription = titleProduct.innerText
  })
})

inputNumberQuantity.value = 1

detectNumber(inputNumberQuantity.value)

function detectNumber(numbers) {
  numbers = parseInt(numbers)
  if (numbers <= 1) {
    numbers = 1
    addSubNumber[1].disabled = true
    addSubNumber[0].disabled = false
  } else if(numbers >= 3) {
    numbers = 3
    addSubNumber[1].disabled = false
    addSubNumber[0].disabled = true
  } else {
    addSubNumber[0].disabled = false
    addSubNumber[1].disabled = false
  }
}

function updatePrice(quantity) {
  fixPrice = 327.90
  quantity = parseFloat(quantity)
  result = (fixPrice * quantity).toFixed(2)
  return result
}

addSubNumber.forEach((symbol, index) => {
  symbol.addEventListener('click', () => {
    inputNumberQuantity.value = eval(inputNumberQuantity.value + addSubNumber[index].textContent + 1)
    detectNumber(inputNumberQuantity.value)
    selectedQuantity = inputNumberQuantity.value
    selectedPrice = updatePrice(inputNumberQuantity.value)
  })
})

btnBuy.addEventListener('click', () => {
  console.log(selectedColor)
  console.log(selectedSize)
  console.log(selectedQuantity)
  console.log(selectedPrice)
  
  const product = {
    code: selectedCode,
    color: selectedColor,
    size: selectedSize,
    quantity: selectedQuantity,
    price: selectedPrice,
    description: selectedDescription
  }

  const jsonProduct = JSON.stringify(product, null, 2)

  console.log(jsonProduct)

  const blob = new Blob([jsonProduct], { type: 'application/json'})

  const url = URL.createObjectURL(blob)
  window.open(url, '_blank')

  //forma se quiser fazer o download do arquivo json
  // const link = document.createElement('a')
  // link.href = url
  // link.download = 'product.json'

  // document.body.appendChild(link)
  // link.click()

  // document.body.removeChild(link)
  // URL.revokeObjectURL(url)

})
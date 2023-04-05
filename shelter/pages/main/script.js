/*Burger handler starts*/

const burgerIcon = document.querySelector('.burger');
const headerNavbar = document.querySelector('.header__navbar');
const body = document.querySelector('body');
const navbarLink = document.querySelectorAll('.navbar__link');
const overlayMain = document.querySelector('.header__overlay');

function toggleBurgerAndHeader() {
    body.classList.toggle('no-scroll');
    headerNavbar.classList.toggle('header-active');
    burgerIcon.classList.toggle('burger-opened');
}

burgerIcon.addEventListener('click', () => {
    toggleBurgerAndHeader();
})

overlayMain.addEventListener('click', () => {
    if (burgerIcon.classList.contains('burger-opened')) {
        toggleBurgerAndHeader();
    }
})

navbarLink.forEach((element) => {
    element.addEventListener('click', toggleBurgerAndHeader);
})

/*Burger handler ends*/

/*Carousel handler starts*/

const PETS_CAROUSEL = document.querySelector('.pets__slider');
const CAROUSEL_BUTTON_LEFT = document.querySelector('.pets__previous-card');
const CAROUSEL_BUTTON_RIGHT = document.querySelector('.pets__next-card');
const ACTIVE_PETS_CONTAINER = document.querySelector('.item-active');
const LEFT_PETS_CONTAINER = document.querySelector('.item-left');
const RIGHT_PETS_CONTAINER = document.querySelector('.item-right');

let fetchedPetsObject;

fetch('./pets-data.json')
    .then(response => response.json())
    .then(data => {
        fetchedPetsObject = data;
        generateActivePetsItems();
        generateSidePetsItems('left');
        generateSidePetsItems('right');
    })
    .catch(error => console.error(error));

let activeIndices = [];
let leftActiveIndices = [];
let rightActiveIndices = [];

function generateActivePetsItems() {
    let indices = [];
    while (indices.length < 3) {
        let randomIndex = Math.floor(Math.random() * fetchedPetsObject.length);
        if (!activeIndices.includes(randomIndex) && !indices.includes(randomIndex)) {
            indices.push(randomIndex);
        }
    }
    activeIndices = indices;
    indices.forEach(index => {
        ACTIVE_PETS_CONTAINER.appendChild(generateRandomPetCard(index));
    });
}

function generateSidePetsItems(side) {
    if (side === 'left') {
        let leftIndices = [];
        while (leftIndices.length < 3) {
            let randomIndex = Math.floor(Math.random() * fetchedPetsObject.length);
            if (!activeIndices.includes(randomIndex) && !leftIndices.includes(randomIndex)) {
                leftIndices.push(randomIndex);
            }
        }
        leftActiveIndices = leftIndices;
        leftIndices.forEach(index => {
            LEFT_PETS_CONTAINER.appendChild(generateRandomPetCard(index));
        })
    } else if (side === 'right') {
        let rightIndices = [];
        while (rightIndices.length < 3) {
            let randomIndex = Math.floor(Math.random() * fetchedPetsObject.length);
            if (!activeIndices.includes(randomIndex) && !rightIndices.includes(randomIndex)) {
                rightIndices.push(randomIndex);
            }
        }
        rightActiveIndices = rightIndices;
        rightIndices.forEach(index => {
            RIGHT_PETS_CONTAINER.appendChild(generateRandomPetCard(index));
        })
    } else if (side === 'additional-left') {
        LEFT_PETS_CONTAINER.innerHTML = '';
        let leftIndices = [];
        while (leftIndices.length < 3) {
            let randomIndex = Math.floor(Math.random() * fetchedPetsObject.length);
            if (!leftActiveIndices.includes(randomIndex) && !leftIndices.includes(randomIndex)) {
                leftIndices.push(randomIndex);
            }
        }
        leftActiveIndices = leftIndices;
        leftIndices.forEach(index => {
            LEFT_PETS_CONTAINER.appendChild(generateRandomPetCard(index));
        })
    }
}

function generateRandomPetCard(index) {
    const cardBody = document.createElement('div');
    cardBody.classList.add('pets__card', 'p-card1');

    const cardPicture = document.createElement('img');
    cardPicture.classList.add('pe-image', 'p-card1__image');
    cardPicture.src = fetchedPetsObject[index].img;

    const cardName = document.createElement('span');
    cardName.classList.add('pe-name', 'p-card1__pet-name');
    cardName.innerHTML = fetchedPetsObject[index].name;

    const cardButton = document.createElement('button');
    cardButton.classList.add('pe-button', 'p-card1__button');
    cardButton.innerHTML = 'Learn more';

    cardBody.appendChild(cardPicture);
    cardBody.appendChild(cardName);
    cardBody.appendChild(cardButton);

    return cardBody;
}

const moveLeft = () => {
    PETS_CAROUSEL.classList.add('transition-left');
    CAROUSEL_BUTTON_LEFT.removeEventListener('click', moveLeft);
    CAROUSEL_BUTTON_RIGHT.removeEventListener('click', moveRight);
}
const moveRight = () => {
    PETS_CAROUSEL.classList.add('transition-right');
    CAROUSEL_BUTTON_LEFT.removeEventListener('click', moveLeft);
    CAROUSEL_BUTTON_RIGHT.removeEventListener('click', moveRight);
}

CAROUSEL_BUTTON_LEFT.addEventListener('click', moveLeft);
CAROUSEL_BUTTON_RIGHT.addEventListener('click', moveRight);

PETS_CAROUSEL.addEventListener('animationend', (aEvent) => {

    if (aEvent.animationName === 'move-left') {
        PETS_CAROUSEL.classList.remove('transition-left');
        document.querySelector('.item-active').innerHTML = LEFT_PETS_CONTAINER.innerHTML;
        generateSidePetsItems('additional-left');

    } /*else {
        PETS_CAROUSEL.classList.remove('transition-right');
        changedItem = itemRight;
        document.querySelector('.item-active').innerHTML = itemRight.innerHTML;
    }*/

    CAROUSEL_BUTTON_LEFT.addEventListener('click', moveLeft);
    CAROUSEL_BUTTON_RIGHT.addEventListener('click', moveRight);
})
/*Carousel handler ends*/

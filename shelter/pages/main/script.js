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

//todo: добавь сохранение предыдущего одного! состояния
//todo: фикс слайдера на 768px и 320px, из за добавления 3-й карточки оно съедает одну с экрана
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
    } else {
        RIGHT_PETS_CONTAINER.innerHTML = '';
        let rightIndices = [];
        while (rightIndices.length < 3) {
            let randomIndex = Math.floor(Math.random() * fetchedPetsObject.length);
            if (!rightActiveIndices.includes(randomIndex) && !rightIndices.includes(randomIndex)) {
                rightIndices.push(randomIndex);
            }
        }
        rightActiveIndices = rightIndices;
        rightIndices.forEach(index => {
            RIGHT_PETS_CONTAINER.appendChild(generateRandomPetCard(index));
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
    cardButton.setAttribute('data-path', fetchedPetsObject[index].name.toLowerCase());

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
    } else {
        PETS_CAROUSEL.classList.remove('transition-right');
        document.querySelector('.item-active').innerHTML = RIGHT_PETS_CONTAINER.innerHTML;
        generateSidePetsItems('additional-right');
    }

    CAROUSEL_BUTTON_LEFT.addEventListener('click', moveLeft);
    CAROUSEL_BUTTON_RIGHT.addEventListener('click', moveRight);
})
/*Carousel handler ends*/


/*POP_UP handler starts*/

window.addEventListener('load', () => {
    const LEARN_MORE_BUTTONS = document.querySelectorAll('.pe-button');
    const MODAL_OVERLAY = document.querySelector('.modal__overlay');
    const ALL_MODAL_WINDOWS = document.querySelectorAll('.modal');

    LEARN_MORE_BUTTONS.forEach((button) => {
        button.addEventListener('click', (e) => {
            body.classList.toggle('no-scroll');
            let path = e.currentTarget.getAttribute('data-path');

            ALL_MODAL_WINDOWS.forEach((el) => {
                el.classList.remove('modal--visible');
            });

            document.querySelector(`[data-target="${path}"]`).classList.add('modal--visible');
            document.querySelector(`[data-target="${path}"]`)
                .appendChild(generateModalContent(
                    Math.floor(Math.random() * fetchedPetsObject.length)));
            //todo: ^^
            MODAL_OVERLAY.classList.add('modal-overlay--visible');
            const MODAL_WINDOW_EXIT_BUTTON = document.querySelector('.modal-exit');

            MODAL_WINDOW_EXIT_BUTTON.addEventListener('click', () => {
                MODAL_OVERLAY.classList.remove('modal-overlay--visible');
                ALL_MODAL_WINDOWS.forEach((el) => {
                    el.classList.remove('modal--visible');
                    el.innerHTML = '';
                });
            })
        });
    });

    MODAL_OVERLAY.addEventListener('click', (e) => {
        if (e.target === MODAL_OVERLAY) {
            body.classList.toggle('no-scroll');
            MODAL_OVERLAY.classList.remove('modal-overlay--visible');
            ALL_MODAL_WINDOWS.forEach((el) => {
                el.classList.remove('modal--visible');
                el.innerHTML = '';
            });
        }
    });
});

function generateModalContent(pet) {
    const petModal = document.createElement('div');
    petModal.classList.add('petModal')
    const modalExit = document.createElement('button');
    modalExit.classList.add('modal-exit');

    const modalPicture = document.createElement('picture');
    modalPicture.classList.add('modal__picture');
    const petImg = document.createElement('img');
    petImg.src = fetchedPetsObject[pet].img;
    modalPicture.appendChild(petImg);

    const modalContentWrapper = document.createElement('div');
    modalContentWrapper.classList.add('modal-content-wrapper');

    const modalContent = document.createElement('div');
    modalContent.classList.add('modal__content');

    const h3 = document.createElement('h3');
    h3.classList.add('modal__header');
    h3.innerHTML = fetchedPetsObject[pet].name;

    const h4 = document.createElement('h4');
    h4.classList.add('modal__sub-header');
    h4.innerHTML = `${fetchedPetsObject[pet].type} - ${fetchedPetsObject[pet].breed}`;

    const petDescription = document.createElement('p');
    petDescription.classList.add('modal__description');
    petDescription.innerHTML = fetchedPetsObject[pet].description;

    const petUl = document.createElement('ul');
    petUl.classList.add('modal__list');

    let petLiAge = document.createElement('li');
    petLiAge.classList.add('modal-list__item');
    petLiAge.innerHTML = `Age: <span>${fetchedPetsObject[pet].age}</span>`;

    let petLiInoculations = document.createElement('li');
    petLiInoculations.classList.add('modal-list__item');
    petLiInoculations.innerHTML = `Inoculations: <span>${fetchedPetsObject[pet].inoculations}</span>`;

    let Diseases = document.createElement('li');
    Diseases.classList.add('modal-list__item');
    Diseases.innerHTML = `Diseases: <span>${fetchedPetsObject[pet].diseases}</span>`;

    let Parasites = document.createElement('li');
    Parasites.classList.add('modal-list__item');
    Parasites.innerHTML = `Parasites: <span>${fetchedPetsObject[pet].parasites}</span>`;

    petUl.appendChild(petLiAge);
    petUl.appendChild(petLiInoculations);
    petUl.appendChild(Diseases);
    petUl.appendChild(Parasites);

    modalContent.appendChild(h3);
    modalContent.appendChild(h4);
    modalContent.appendChild(petDescription);
    modalContent.appendChild(petUl);

    modalContentWrapper.appendChild(modalContent);

    petModal.appendChild(modalExit);
    petModal.appendChild(modalPicture);
    petModal.appendChild(modalContentWrapper);
    return petModal;
}

/*POP_UP handler ends*/
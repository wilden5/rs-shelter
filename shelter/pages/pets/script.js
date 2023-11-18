/*Burger handler starts*/

const burgerIcon = document.querySelector('.burger');
const headerNavbar = document.querySelector('.header__navbar');
const bodyPets = document.querySelector('body');
const navbarLink = document.querySelectorAll('.navbar__link');
const overlayPets = document.querySelector('.header__overlay');

function toggleBurgerAndHeader() {
    bodyPets.classList.toggle('no-scroll');
    headerNavbar.classList.toggle('header-active');
    burgerIcon.classList.toggle('burger-opened');
}

burgerIcon.addEventListener('click', () => {
    toggleBurgerAndHeader();
})

overlayPets.addEventListener('click', () => {
    if (burgerIcon.classList.contains('burger-opened')) {
        toggleBurgerAndHeader();
    }
})

navbarLink.forEach((element) => {
    element.addEventListener('click', toggleBurgerAndHeader);
})

/*Burger handler ends*/

/*Pagination starts*/

const PETS_CONTENT_CONTAINER = document.querySelector('.pets__content');
const PETS_PAGE_PAGINATION_NUMBER = document.querySelector('.pets__paginator-active');
const PAGINATION_NEXT_BUTTON = document.querySelector('.pets__paginator-next');
const PAGINATION_LAST_PAGE_BUTTON = document.querySelector('.pets__paginator-double-next');
const PAGINATION_PREV_BUTTON = document.querySelector('.pets__paginator-prev');
const PAGINATION_FIRST_PAGE_BUTTON = document.querySelector('.pets__paginator-double-prev');
let GLOBAL_PAGE_NUMBER = 1;

async function getPetsData() {
    const response = await fetch('./pets-data-cozy.json');
    return await response.json();
}

async function main() {
    PETS_PAGE_PAGINATION_NUMBER.innerText = GLOBAL_PAGE_NUMBER;
    const petsArray = await getPetsData();
    const subArrays = divideArrayIntoParts(petsArray, 6);
    subArrays.forEach((array) => {
        array.sort(() => Math.random() - 0.5);
    })

    function createInitialArray(array) {
        for (let i = 0; i < array.length; i++) {
            PETS_CONTENT_CONTAINER.appendChild(generatePetCard(array, i));
        }
    }

    function divideArrayIntoParts(array, numParts) {
        const newArray = [...array];
        const subArrays = [];
        const chunkSize = Math.ceil(newArray.length / numParts);
        for (let i = 0; i < numParts; i++) {
            subArrays.push(newArray.splice(0, chunkSize));
        }
        return subArrays;
    }

    function generatePetCard(array, index) {
        const cardBody = document.createElement('div');
        cardBody.classList.add('pets__card');

        const cardPicture = document.createElement('img');
        cardPicture.classList.add('pe-image');
        cardPicture.src = array[index].img;

        const cardName = document.createElement('span');
        cardName.classList.add('pe-name');
        cardName.innerHTML = array[index].name;

        const cardButton = document.createElement('button');
        cardButton.classList.add('pe-button');
        cardButton.innerHTML = 'Learn more';

        cardBody.appendChild(cardPicture);
        cardBody.appendChild(cardName);
        cardBody.appendChild(cardButton);

        return cardBody;
    }

    PAGINATION_NEXT_BUTTON.addEventListener('click', () => {
        if (GLOBAL_PAGE_NUMBER === 6) {
            return;
        }
        GLOBAL_PAGE_NUMBER += 1;
        const newPage = GLOBAL_PAGE_NUMBER;
        PETS_PAGE_PAGINATION_NUMBER.innerText = newPage;
        PETS_CONTENT_CONTAINER.innerHTML = '';
        createInitialArray(subArrays[newPage - 1]);
        checkButtonsStatus();
    })

    PAGINATION_LAST_PAGE_BUTTON.addEventListener('click', ()=> {
        PETS_CONTENT_CONTAINER.innerHTML = '';
        createInitialArray(subArrays[5]);
        GLOBAL_PAGE_NUMBER = 6;
        PETS_PAGE_PAGINATION_NUMBER.innerText = GLOBAL_PAGE_NUMBER;
        if (GLOBAL_PAGE_NUMBER === 6) {
            PAGINATION_NEXT_BUTTON.classList.remove('pag-a');
            PAGINATION_LAST_PAGE_BUTTON.classList.remove('pag-a');
        }
        checkButtonsStatus();
    })

    PAGINATION_PREV_BUTTON.addEventListener('click', () => {
        if (GLOBAL_PAGE_NUMBER === 1) {
            return;
        }
        GLOBAL_PAGE_NUMBER -= 1;
        const newPage = GLOBAL_PAGE_NUMBER;
        PETS_PAGE_PAGINATION_NUMBER.innerText = newPage;
        PETS_CONTENT_CONTAINER.innerHTML = '';
        createInitialArray(subArrays[newPage - 1]);
        checkButtonsStatus();
    })

    PAGINATION_FIRST_PAGE_BUTTON.addEventListener('click', () => {
        PETS_CONTENT_CONTAINER.innerHTML = '';
        createInitialArray(subArrays[0]);
        GLOBAL_PAGE_NUMBER = 1;
        PETS_PAGE_PAGINATION_NUMBER.innerText = GLOBAL_PAGE_NUMBER;
        if (GLOBAL_PAGE_NUMBER === 1) {
            PAGINATION_FIRST_PAGE_BUTTON.classList.remove('pag-a');
            PAGINATION_PREV_BUTTON.classList.remove('pag-a');
        }
        checkButtonsStatus();
    })

    function checkButtonsStatus() {
        if (GLOBAL_PAGE_NUMBER === 1) {
            PAGINATION_PREV_BUTTON.classList.add('pag-disabled');
            PAGINATION_PREV_BUTTON.classList.remove('pag-a');
            PAGINATION_FIRST_PAGE_BUTTON.classList.add('pag-disabled');
            PAGINATION_FIRST_PAGE_BUTTON.classList.remove('pag-a');
        }

        if (GLOBAL_PAGE_NUMBER > 1) {
            PAGINATION_PREV_BUTTON.classList.remove('pag-disabled');
            PAGINATION_PREV_BUTTON.classList.add('pag-a');
            PAGINATION_FIRST_PAGE_BUTTON.classList.remove('pag-disabled');
            PAGINATION_FIRST_PAGE_BUTTON.classList.add('pag-a');
        }

        if (GLOBAL_PAGE_NUMBER === 6) {
            PAGINATION_NEXT_BUTTON.classList.remove('pag-a');
            PAGINATION_LAST_PAGE_BUTTON.classList.remove('pag-a');
        }

        if (GLOBAL_PAGE_NUMBER < 6) {
            PAGINATION_NEXT_BUTTON.classList.add('pag-a');
            PAGINATION_LAST_PAGE_BUTTON.classList.add('pag-a');
        }
    }
    createInitialArray(subArrays[0]);
}

main();
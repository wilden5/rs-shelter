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
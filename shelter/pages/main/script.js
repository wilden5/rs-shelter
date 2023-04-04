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

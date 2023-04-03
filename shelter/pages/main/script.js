/*Burger handler starts*/

const burgerIcon = document.querySelector('.burger');
const headerNavbar = document.querySelector('.header__navbar');
const main = document.querySelector('.main-page');
const body = document.querySelector('body');
const navbarLink = document.querySelectorAll('.navbar__link');

function toggleBurgerAndHeader() {
    body.classList.toggle('no-scroll');
    headerNavbar.classList.toggle('header-active');
    burgerIcon.classList.toggle('burger-opened');
}

burgerIcon.addEventListener('click', () => {
    toggleBurgerAndHeader();
})

main.addEventListener('click', () => {
    if (burgerIcon.classList.contains('burger-opened')) {
        toggleBurgerAndHeader();
    }
})

navbarLink.forEach((element) => {
    element.addEventListener('click', toggleBurgerAndHeader);
})

/*Burger handler ends*/

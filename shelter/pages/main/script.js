/*Burger handler starts*/

const burgerIcon = document.querySelector('.burger');
const headerNavbar = document.querySelector('.header__navbar');
const main = document.querySelector('.main-page');

burgerIcon.addEventListener('click', () => {
    burgerIcon.classList.toggle('burger-opened');
    headerNavbar.classList.toggle('header-active');
})

main.addEventListener('click', () => {
    if(burgerIcon.classList.contains('burger-opened')) {
        headerNavbar.classList.toggle('header-active');
        burgerIcon.classList.toggle('burger-opened');
    }
})

/*Burger handler ends*/

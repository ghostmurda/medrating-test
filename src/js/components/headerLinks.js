import {store} from "../index.js";
import {CATALOG, FAVORITES} from "../index.js";

const catalogLink = document.querySelector('.header__link_type-catalog');
const favoritesLink = document.querySelector('.header__link_type-favorites');

catalogLink.addEventListener('click', () => {
    catalogLink.classList.add('active');
    favoritesLink.classList.remove('active');
    store.pageType = CATALOG;
})

favoritesLink.addEventListener('click', () => {
    favoritesLink.classList.add('active');
    catalogLink.classList.remove('active');
    store.pageType = FAVORITES;
})

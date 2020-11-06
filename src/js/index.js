import Catalog from "./catalog.js";

export const CATALOG = 'catalog';
export const FAVORITES = 'favorites';

export const catalogPage = document.querySelector('.content_type-catalog');
export const favoritesPage = document.querySelector('.content_type-favorites');

const pageState = {
    pageType: null
}

export const store = new Proxy(pageState, {
    set: function(target, key, value) {
        showPage(value);
        return true;
    }
})

function showPage(page){
    switch (page) {
        case CATALOG:{
            let catalog = new Catalog();
            catalog.clearCatalogUsers();
            catalog.fillCatalogUsers();

            catalogPage.classList.remove('hide');
            favoritesPage.classList.add('hide');
            break
        }
        case FAVORITES: {
            favoritesPage.classList.remove('hide');
            catalogPage.classList.add('hide');
            break
        }
    }
}

store.pageType = CATALOG;
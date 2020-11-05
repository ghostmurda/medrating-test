export const CATALOG = 'catalog';
export const FAVORITES = 'favorites';

const catalogPage = document.querySelector('.content_type-catalog');
const favoritesPage = document.querySelector('.content_type-favorites');

const pageState = {
    pageType: CATALOG
}

export const store = new Proxy(pageState, {
    set: function(target, key, value) {
        subscribeStore(value);
        return true;
    }
})

const showPage = (page) => {
    switch (page) {
        case CATALOG:{
            catalogPage.classList.remove('hide');
            favoritesPage.classList.add('hide');
            break
        }
        case FAVORITES: {
            favoritesPage.classList.remove('hide');
            catalogPage.classList.add('hide');
            break
        }
        default:
            catalogPage.classList.remove('hide');
            favoritesPage.classList.add('hide');
            break
    }
}

function subscribeStore(state){
    showPage(state);
}
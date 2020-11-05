import {getUsersReq} from "./api.js";
import Users from "./users.js";

export const CATALOG = 'catalog';
export const FAVORITES = 'favorites';

const catalogPage = document.querySelector('.content_type-catalog');
const favoritesPage = document.querySelector('.content_type-favorites');

const pageState = {
    pageType: null
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
            clearCatalogUsers();
            fillCatalogUsers();
            catalogPage.classList.remove('hide');
            favoritesPage.classList.add('hide');
            break
        }
        case FAVORITES: {
            clearCatalogUsers();
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

const getUsers = async () => {
    let validUsersList = [];
    let resp = await getUsersReq();
    for(let user of resp){
        if (user.name){
            validUsersList.push(user);
        }
    }
    return validUsersList;
}

function fillCatalogUsers(){
    getUsers()
        .then(usersList => {
            for(let item of usersList){
                let user = document.createElement('div');
                user.classList.add('user', 'user_non-selected', 'non-selected');
                user.innerText = item.name;
                user.id = item.id;
                catalogPage.append(user);
            }
            let currentUsersList = new Users(document.querySelectorAll('.user'));
            currentUsersList.addListener();
        })
}

function clearCatalogUsers(){
    const users = document.querySelectorAll('.user');
    for(let user of users){
        user.remove();
    }
}

store.pageType = CATALOG;
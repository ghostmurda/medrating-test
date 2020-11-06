import {getUsersReq} from "./api.js";
import Users from "./users.js";
import {catalogPage} from "./index.js";

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

export default class Catalog{
    fillCatalogUsers(){
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

    clearCatalogUsers(){
        const users = document.querySelectorAll('.user');
        for(let user of users){
            user.remove();
        }
    }
}
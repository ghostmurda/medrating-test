import {getAlbumsReq} from "./api.js";

const getAlbums = async (userId) => {
    let resp = await getAlbumsReq(userId);
    return resp;
}

export default class Users{
    constructor(usersList) {
        this.usersList = usersList;
    }

    fillUsersAlbums(user){
        getAlbums(user.id)
            .then(albumsList => {
                for(let item of albumsList){
                    let album = document.createElement('div');
                    album.className = 'user__album';
                    album.innerText = item.title;
                    user.append(album);
                }
            })
    }

    clearUsersAlbums(user){
        let albums = document.querySelectorAll('.user__album');
        for(let album of albums){
            if (user.contains(album)){
                user.removeChild(album);
            }
        }
    }

    addListener(){
        this.usersList.forEach(user => {
            user.addEventListener('click', () => {
                this.clearUsersAlbums(user);
                this.fillUsersAlbums(user);
                user.classList.remove('user_non-selected', 'non-selected');
            })
        })
    }
}
import {getAlbumsReq} from "../api/api.js";
import Albums from "./albums.js";

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
                    album.classList.add('user__album', 'non-selected');
                    album.innerText = item.title;
                    album.id = item.id;
                    user.append(album);
                }
                let currentAlbumsList = new Albums(document.querySelectorAll('.user__album'));
                currentAlbumsList.addListener();
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
                if(user.classList.contains('non-selected')){
                    this.clearUsersAlbums(user);
                    this.fillUsersAlbums(user);
                    user.classList.remove('user_non-selected', 'non-selected');
                } else {
                    this.clearUsersAlbums(user);
                    user.classList.add('user_non-selected', 'non-selected');
                }
            })
        })
    }
}
import {getAlbumsReq} from "../api/api.js";
import Albums from "./albums.js";
import Component from "./component.js";

const getAlbums = async (userId) => {
    let resp = await getAlbumsReq(userId);
    return resp;
}

export default class Users extends Component{
    constructor(usersList, selector) {
        super(selector);
        this.usersList = usersList;
    }

    fillUsersAlbums(user){
        getAlbums(user.id)
            .then(albumsList => {
                for(let item of albumsList){
                    let album = document.createElement('div');
                    album.classList.add('user__album', 'non-selected');
                    album.innerHTML = `<div class="user__album__title">${item.title}</div>`;
                    album.id = item.id;
                    user.append(album);
                }
                let currentAlbumsList = new Albums(this.getCurrentCollection(user), 'photo-wrapper__photo');
                currentAlbumsList.addListener();
            })
    }

    addListener(){
        this.usersList.forEach(user => {
            user.addEventListener('click', () => {
                if(user.classList.contains('non-selected')){
                    this.clearCurrentCollection(user);
                    this.fillUsersAlbums(user);
                    user.classList.remove('user_non-selected', 'non-selected');
                } else {
                    this.clearCurrentCollection(user);
                    user.classList.add('user_non-selected', 'non-selected');
                }
            })
        })
    }
}
import {getPhotosReq} from "../api/api.js";
import Photos from "./photos.js";
import Component from "./component.js";

const getPhotos = async (albumId) => {
    let resp = await getPhotosReq(albumId);
    return resp;
}

export default class Albums extends Component{
    constructor(albumsList, selector) {
        super(selector);
        this.albumsList = albumsList;
    }

    fillAlbumsPhotos(album){
        getPhotos(album.id)
            .then(photosList => {
                for(let item of photosList){
                    let photo = document.createElement('img');
                    photo.className = 'album__photo';
                    photo.id = item.id;
                    photo.src = item.thumbnailUrl;
                    photo.url = item.url;
                    photo.title = item.title;
                    album.append(photo);
                }
                let currentPhotosList = new Photos(this.getCurrentCollection(album));
                currentPhotosList.addListener();
            })
    }

    addListener(){
        this.albumsList.forEach(album => {
            album.addEventListener('click', (event) => {
                if(album.classList.contains('non-selected')){
                    this.clearCurrentCollection(album);
                    this.fillAlbumsPhotos(album);
                    album.classList.remove('non-selected');
                } else{
                    this.clearCurrentCollection(album);
                    album.classList.add('non-selected');
                }
                event.stopPropagation();
            })
        })
    }
}
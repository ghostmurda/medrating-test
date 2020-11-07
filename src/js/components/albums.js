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
                    let photoWrapper = document.createElement('div');
                    let star = document.createElement('span');
                    let photo = document.createElement('img');

                    photoWrapper.className = 'album__photo-wrapper';
                    album.append(photoWrapper);

                    star.className = 'photo-wrapper__star';
                    star.innerHTML = '&#9733;';
                    photoWrapper.append(star);

                    photo.className = 'photo-wrapper__photo';
                    photo.id = item.id;
                    photo.src = item.thumbnailUrl;
                    photo.url = item.url;
                    photo.title = item.title;
                    photoWrapper.append(photo);
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
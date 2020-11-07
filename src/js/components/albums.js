import {getPhotosReq} from "../api/api.js";
import Photos from "./photos.js";
import Component from "./component.js";
import Stars from "./stars.js";

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

                    photoWrapper.className = 'photo-wrapper';
                    album.append(photoWrapper);

                    star.className = 'photo-wrapper__star';
                    star.innerHTML = '&#9733;';
                    star.style.opacity = '0';
                    photoWrapper.append(star);

                    photo.className = 'photo-wrapper__photo';
                    photo.id = item.id;
                    photo.src = item.thumbnailUrl;
                    photo.url = item.url;
                    photo.title = item.title;
                    photo.style.opacity = '0';
                    photoWrapper.append(photo);
                    photo.onload = () => {
                        star.style.opacity = '1';
                        photo.style.opacity = '1';
                    }
                }
                let currentPhotosList = new Photos(this.getCurrentCollection(album, 'photo-wrapper__photo'));
                currentPhotosList.addListener();

                let currentStarsList = new Stars(this.getCurrentCollection(album, 'photo-wrapper__star'));
                currentStarsList.addListener();
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
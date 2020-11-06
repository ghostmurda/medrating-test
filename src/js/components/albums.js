import {getPhotosReq} from "../api/api.js";
import Photos from "./photos.js";

const getPhotos = async (albumId) => {
    let resp = await getPhotosReq(albumId);
    return resp;
}

export default class Albums{
    constructor(albumsList) {
        this.albumsList = albumsList;
    }

    getCurrentCollection(album){
        let collection = document.querySelectorAll('.album__photo');
        let currentCollection = [];
        collection.forEach((item) => {
            if (album.contains(item)){
                currentCollection.push(item);
            }
        })
        return currentCollection;
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

    clearAlbumsPhotos(album){
        let photos = document.querySelectorAll('.album__photo');
        for(let photo of photos){
            if (album.contains(photo)){
                album.removeChild(photo);
            }
        }
    }

    addListener(){
        this.albumsList.forEach(album => {
            album.addEventListener('click', (event) => {
                if(album.classList.contains('non-selected')){
                    this.clearAlbumsPhotos(album);
                    this.fillAlbumsPhotos(album);
                    album.classList.remove('non-selected');
                } else{
                    this.clearAlbumsPhotos(album);
                    album.classList.add('non-selected');
                }
                event.stopPropagation();
            })
        })
    }
}
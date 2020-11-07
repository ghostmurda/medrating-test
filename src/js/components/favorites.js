import Photos from "./photos.js";
import Stars from "./stars.js";
import {favoritesPage} from "../index.js";

export default class Favorites {
    fillFavoritePhotos() {
        for(let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let imgProps = JSON.parse(localStorage.getItem(key));

            let photoWrapper = document.createElement('div');
            let star = document.createElement('span');
            let photo = document.createElement('img');

            photoWrapper.className = 'photo-wrapper';
            favoritesPage.append(photoWrapper);

            star.classList.add('photo-wrapper__star', 'star_selected');
            star.innerHTML = '&#9733;';
            star.style.opacity = '0';
            photoWrapper.append(star);

            photo.className = 'photo-wrapper__photo';
            photo.id = key;
            photo.src = imgProps.src;
            photo.url = imgProps.url;
            photo.title = imgProps.title;
            photo.style.opacity = '0';
            photoWrapper.append(photo);
            photo.onload = () => {
                star.style.opacity = '1';
                photo.style.opacity = '1';
            }
        }
        let currentPhotosList = new Photos(favoritesPage.querySelectorAll('.photo-wrapper__photo'));
        currentPhotosList.addListener();

        let currentStarsList = new Stars(favoritesPage.querySelectorAll('.photo-wrapper__star'));
        currentStarsList.addListener();
    }

    clearFavoritePhotos() {
        const photos = document.querySelectorAll('.photo-wrapper');
        for (let photo of photos) {
            photo.remove();
        }
    }
}
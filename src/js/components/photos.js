export default class Photos{
    constructor(photos) {
        this.photos = photos;
    }

    addListener(){
        this.photos.forEach(photo => {
             photo.addEventListener('click', event => {
                 let overlay = document.querySelector('.overlay');
                 let modalWindow = document.querySelector('.modal-window');
                 let modalImg = modalWindow.querySelector('.modal-window__img');

                 new Promise(resolve => {
                     overlay.style.display = 'block';
                     setTimeout(() => resolve(), 10);
                 }).then(() => {
                     overlay.style.opacity = '1';
                     modalWindow.style.display = 'flex';
                     modalImg.src = photo.url;

                     let listener = () => {
                         overlay.style.display = 'none';
                         modalWindow.style.display = 'none';
                         overlay.style.opacity = '0';
                         modalImg.src = '';
                         window.removeEventListener('click', listener);
                     }

                     window.addEventListener('click', listener);
                 })

                 event.stopPropagation();
             })
        })
    }
}
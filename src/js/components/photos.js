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
                     modalImg.style.opacity = '0';
                     overlay.style.display = 'flex';
                     setTimeout(() => resolve(), 10);
                 }).then(() => {
                     overlay.style.opacity = '1';
                     modalWindow.style.display = 'flex';
                     modalImg.src = photo.url;
                     modalImg.onload = () => {
                        modalImg.style.opacity = '1';
                     }

                     let listener = () => {
                         new Promise(resolve => {
                            overlay.style.opacity = '0';
                            modalImg.style.opacity = '0';
                            setTimeout(() => resolve(), 500);
                         }).then(() => {
                            overlay.style.display = 'none';
                            modalWindow.style.display = 'none';
                            modalImg.src = '';
                            window.removeEventListener('click', listener);
                         })
                     }

                     window.addEventListener('click', listener);
                 })

                 event.stopPropagation();
             })
        })
    }
}
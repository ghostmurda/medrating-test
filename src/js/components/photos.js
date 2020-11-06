export default class Photos{
    constructor(photos) {
        this.photos = photos;
    }

    addListener(){
        this.photos.forEach(photo => {
             // photo.addEventListener('mouseenter', event => {
             //     console.log('enter' + event.target.url);
             //     event.stopPropagation();
             // })
        })
    }
}
export default class Stars{
    constructor(stars){
        this.stars = stars;
    }

    addListener(){
        this.stars.forEach(star => {
            star.addEventListener('click', event => {
                console.log('star click');
                event.stopPropagation();
            })
        })
    }
}
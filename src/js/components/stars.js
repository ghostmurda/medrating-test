export default class Stars{
    constructor(stars){
        this.stars = stars;
    }

    addListener(){
        this.stars.forEach(star => {
            star.addEventListener('click', event => {
                let img = star.parentNode.querySelector('.photo-wrapper__photo');
                if (star.classList.contains('star_selected')){
                    star.classList.remove('star_selected');
                    localStorage.removeItem(img.id);
                } else {
                    star.classList.add('star_selected');
                    localStorage.setItem(img.id, JSON.stringify({
                        src: img.src,
                        url: img.url,
                        title: img.title
                    }));
                }
                event.stopPropagation();
            })
        })
    }
}
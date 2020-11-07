export default class Component{
    constructor(selector) {
        this.selector = selector;
    }

    getCurrentCollection(subject, selector = this.selector){
        let collection = document.querySelectorAll(`.${selector}`);
        let currentCollection = [];
        collection.forEach((item) => {
            if (subject.contains(item)){
                currentCollection.push(item);
            }
        })
        return currentCollection;
    }

    clearCurrentCollection(subject){
        let items = document.querySelectorAll(`.${this.selector}`);
        for(let item of items){
            if (subject.contains(item)){
                subject.removeChild(item);
            }
        }
    }
}
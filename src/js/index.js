const pageState = {
    pageType: 'catalog'  // catalog || favorites
}

export const store = new Proxy(pageState, {
    set: function(target, key, value) {
        console.log(`The property ${key} has been updated with ${value}`);
        return true;
    }
})
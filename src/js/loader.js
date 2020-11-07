const scripts = [
    "src/js/components/headerLinks.js",
    "src/js/api/api.js",
    "src/js/components/component.js",
    "src/js/components/catalog.js",
    "src/js/components/favorites.js",
    "src/js/index.js",
    "src/js/components/stars.js",
    "src/js/components/photos.js",
    "src/js/components/albums.js",
    "src/js/components/users.js",
    null
]

const loadScript = (num) => {
    let src = scripts[num];
    if (!src) {
        console.log('scripts loaded')
    } else {
        let script = document.createElement('script');
        script.type = 'module';
        script.src = src;
        document.body.append(script);
        script.onload = () => {
            loadScript(num + 1);
        }
    }
}

loadScript(0);
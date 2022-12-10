import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://nodenews.up.railway.app/', {
            apiKey: '4b02543cc901470dbbcdec480d959a7c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

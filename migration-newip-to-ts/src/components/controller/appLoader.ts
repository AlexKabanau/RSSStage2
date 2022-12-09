import Loader from './loader';

class AppLoader extends Loader {
    constructor() {
        super('https://newsapi.org/v2/', {
            apiKey: '4b02543cc901470dbbcdec480d959a7c', // получите свой ключ https://newsapi.org/
        });
    }
}

export default AppLoader;

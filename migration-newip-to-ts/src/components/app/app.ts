import AppController from '../controller/controller';
import { AppView } from '../view/appView';
import { INewsData, ISourcesData } from '../../types/index';
// import { Sources } from '../view/sources/sources';

class App {
    controller: AppController;
    view: AppView;
    constructor() {
        this.controller = new AppController();
        this.view = new AppView();
    }

    start(): void {
        const tempSources = document.querySelector('.sources') as HTMLElement;
        tempSources.addEventListener('click', (e: Event) =>
            this.controller.getNews(e, (data: INewsData) => this.view.drawNews(data))
        );
        this.controller.getSources((data: { sources: Array<ISourcesData> }) => this.view.drawSources(data));
    }
}

export default App;

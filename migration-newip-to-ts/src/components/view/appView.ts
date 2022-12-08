import News from './news/news';
import Sources from './sources/sources';
import { INewsElement, INewsData, ISourcesData } from '../../types/index';

export class AppView {
    news: News;
    sources: Sources;
    constructor() {
        this.news = new News();
        this.sources = new Sources();
    }

    drawNews(data: INewsData) {
        const values: Array<INewsElement> = data?.articles ? data?.articles : [];
        this.news.draw(values);
    }

    drawSources(data: { sources: Array<ISourcesData> }) {
        const values: Array<ISourcesData> = data?.sources ? data?.sources : [];
        this.sources.draw(values);
    }
}

export default AppView;

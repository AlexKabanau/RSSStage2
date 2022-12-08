import './news.css';
import { INewsElement } from '../../../types/index';

class News {
    draw(data: Array<INewsElement>): void {
        const news: INewsElement[] =
            data.length >= 10 ? data.filter((_item: INewsElement, idx: number) => idx < 10) : data;

        const fragment: DocumentFragment = document.createDocumentFragment();
        const newsItemTemp: HTMLTemplateElement = document.querySelector('#newsItemTemp') as HTMLTemplateElement;

        news.forEach((item, idx) => {
            const newsClone = newsItemTemp.content.cloneNode(true) as HTMLTemplateElement;
            if (newsClone != null) {
                const tempNewsItem = newsClone.querySelector('.news__item') as HTMLElement;
                if (tempNewsItem != null) {
                    if (idx % 2) tempNewsItem.classList.add('alt');
                }
                const tempNewsMetaPhoto = newsClone.querySelector('.news__meta-photo') as HTMLElement;
                tempNewsMetaPhoto.style.backgroundImage = `url(${item.urlToImage || 'img/news_placeholder.jpg'})`;
                const tempNewsMetaAuthor = newsClone.querySelector('.news__meta-author') as HTMLElement;
                tempNewsMetaAuthor.textContent = item.author || item.source.name;
                const tempNewsMetaDate = newsClone.querySelector('.news__meta-date') as HTMLElement;
                tempNewsMetaDate.textContent = item.publishedAt.slice(0, 10).split('-').reverse().join('-');

                const tempDescriptionTitle = newsClone.querySelector('.news__description-title') as HTMLElement;
                tempDescriptionTitle.textContent = item.title;
                const tempDescriptionSource = newsClone.querySelector('.news__description-source') as HTMLElement;
                tempDescriptionSource.textContent = item.source.name;
                const tempDescriptionContent = newsClone.querySelector('.news__description-content') as HTMLElement;
                tempDescriptionContent.textContent = item.description;
                const tempNewsReadMoreA = newsClone.querySelector('.news__read-more a') as HTMLElement;
                tempNewsReadMoreA.setAttribute('href', item.url);

                fragment.append(newsClone);
            }
        });

        const tempNews = document.querySelector('.news') as HTMLElement;
        tempNews.innerHTML = '';
        tempNews.appendChild(fragment);
    }
}

export default News;

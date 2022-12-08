import './sources.css';
import { ISourcesData } from '../../../types/index';

class Sources {
    draw(data: Array<ISourcesData>): void {
        const fragment: DocumentFragment = document.createDocumentFragment();
        const sourceItemTemp: HTMLTemplateElement = document.querySelector('#sourceItemTemp') as HTMLTemplateElement;

        data.forEach((item) => {
            const sourceClone = sourceItemTemp.content.cloneNode(true) as HTMLTemplateElement;

            const tempSourceItemName = sourceClone.querySelector('.source__item-name') as HTMLElement;
            tempSourceItemName.textContent = item.name;
            const tempSourceItem = sourceClone.querySelector('.source__item') as HTMLElement;
            tempSourceItem.setAttribute('data-source-id', item.id);

            fragment.append(sourceClone);
        });

        const tempSources = document.querySelector('.sources') as HTMLElement;
        tempSources.append(fragment);
    }
}

export default Sources;

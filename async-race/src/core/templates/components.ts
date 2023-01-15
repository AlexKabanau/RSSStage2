import ProductItemData from '../types';

abstract class Component {
  protected container: HTMLElement;

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(tagName: string, className: string, _data?: Promise<ProductItemData[]>) {
    this.container = document.createElement(tagName);
    this.container.className = className;
  }

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  render(_data?: Promise<ProductItemData[]>) {
    return this.container;
  }
}
export default Component;

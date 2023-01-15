import Component from '../../core/templates/components';
import ProductItemData from '../../core/types';

class Garage extends Component {
  // data: Array<ProductItemData>;

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(tagName: string, className: string, data: Promise<ProductItemData[]>) {
    super(tagName, className, data);
  }

  createGarage(data: Promise<ProductItemData[]>) {
    this.container.insertAdjacentHTML('beforeend', JSON.stringify(data));
  }

  render(data: Promise<ProductItemData[]>) {
    this.createGarage(data);
    return this.container;
  }
}
export default Garage;

import Component from '../../templates/components';
// eslint-disable-next-line import/no-cycle
import { PageIds } from '../../../pages/app';

const Buttons = [
  {
    id: PageIds.mainPage,
    text: 'Main Page',
  },
  {
    id: PageIds.winPage,
    text: 'Win Page',
  },
];

class Header extends Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  renderPageButtons() {
    const pageButtons = document.createElement('div');
    Buttons.forEach((button) => {
      const buttonHTML = document.createElement('a');
      buttonHTML.href = `#${button.id}`;
      buttonHTML.className = 'button';
      buttonHTML.innerText = button.text;
      pageButtons.append(buttonHTML);
    });
    this.container.append(pageButtons);
  }

  afterRender() {

  }

  render(): HTMLElement {
    this.renderPageButtons();
    setTimeout(() => {
      this.afterRender();
    }, 0);
    return this.container;
  }
}
export default Header;

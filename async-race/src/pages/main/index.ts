import Page from '../../core/templates/page';
import Footer from '../../core/components/footer';
import Form from './form';
import Garage from './garage';
import ProductItemData from '../../core/types';

class MainPage extends Page {
  form: Form;

  footer: Footer;

  garage: Garage;

  static TextObject = {
    MainTitle: 'Main Page',
  };

  getData() {
    const baseUrl = 'http://127.0.0.1:3000';

    const path = {
      garage: '/garage',
      winners: '/winners',
    };

    const getGarage = async () => {
      const response = await fetch(`${baseUrl}${path.garage}`);
      const data: Array<ProductItemData> = await response.json();

      return data;
    };
    return getGarage;
  }

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(id: string) {
    super(id);
    const data = this.getData();
    this.form = new Form('section', 'cars-form');
    this.garage = new Garage('section', 'garage-section', data);
    this.footer = new Footer('footer', 'footer');
  }

  afterRender() {
    const baseUrl = 'http://127.0.0.1:3000';

    const path = {
      garage: '/garage',
      winners: '/winners',
    };

    const getGarage = async () => {
      const response = await fetch(`${baseUrl}${path.garage}`);
      const data = await response.json();

      console.log(data);
    };

    const button: HTMLElement | null = document.querySelector('.button.request');
    button?.addEventListener('click', () => {
      console.log('CLICK');
      getGarage();
    });
  }

  renderMain() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    const button = document.createElement('a');
    button.className = 'button request';
    button.innerText = 'click for request';
    this.container.append(button);

    this.container.append(this.form.render());
    this.container.append(this.garage.render());

    this.container.append(this.footer.render());
  }

  render() {
    this.renderMain();

    setTimeout(() => {
      this.afterRender();
    }, 0);
    return this.container;
  }
}

export default MainPage;

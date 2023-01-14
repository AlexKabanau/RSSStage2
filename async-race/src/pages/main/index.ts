import Page from '../../core/templates/page';

class MainPage extends Page {
  static TextObject = {
    MainTitle: 'Main Page',
  };

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(id: string) {
    super(id);
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

  render() {
    const title = this.createHeaderTitle(MainPage.TextObject.MainTitle);
    this.container.append(title);
    const button = document.createElement('a');
    button.className = 'button request';
    button.innerText = 'click for request';
    this.container.append(button);
    setTimeout(() => {
      this.afterRender();
    }, 0);
    return this.container;
  }
}

export default MainPage;

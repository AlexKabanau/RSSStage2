import Page from '../../core/templates/page';

class WinPage extends Page {
  static TextObject = {
    MainTitle: 'Win Page',
  };

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(id: string) {
    super(id);
  }

  render() {
    const title = this.createHeaderTitle(WinPage.TextObject.MainTitle);
    this.container.append(title);

    return this.container;
  }
}

export default WinPage;

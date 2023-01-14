import Page from '../../core/templates/page';
import MainPage from '../main';
import WinPage from '../win';
// eslint-disable-next-line import/no-cycle
import Header from '../../core/components/header';

export const enum PageIds {
  mainPage = 'main-page',
  winPage = 'win-page',
}

class App {
  private static container: HTMLElement = document.body;

  private static defaultPageId = 'current-page';

  // private initialPage: MainPage;
  private header: Header;

  static renderNewPage(idPage: string) {
    const currentPageHTML = document.querySelector(`#${App.defaultPageId}`);
    if (currentPageHTML) {
      currentPageHTML.remove();
    }

    let page: Page | null = null;

    if (idPage === PageIds.mainPage) {
      page = new MainPage(idPage);
    } else if (idPage === PageIds.winPage) {
      page = new WinPage(idPage);
    }

    if (page) {
      const pageHTML = page.render();
      pageHTML.id = App.defaultPageId;
      App.container.append(pageHTML);
    }
  }

  private enableRouterChange() {
    window.addEventListener('hashchange', () => {
      const hash = window.location.hash.slice(1);
      App.renderNewPage(hash);
    });
  }

  constructor() {
    // App.container = document.body;
    // this.initialPage = new MainPage("main-page");
    this.header = new Header('header', 'header');
  }

  run() {
    App.container.append(this.header.render());
    App.renderNewPage('main-page');
    this.enableRouterChange();
  }
}

export default App;

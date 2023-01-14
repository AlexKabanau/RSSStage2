import Component from '../../templates/components';

class Footer extends Component {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor(tagName: string, className: string) {
    super(tagName, className);
  }

  createFooter() {
    const footerContainer: HTMLElement = document.createElement('div');
    footerContainer.className = 'copyright container';
    const rssLogo: HTMLAnchorElement = document.createElement('a');
    rssLogo.className = 'rss-logo';
    rssLogo.href = 'https://rs.school/js/';
    rssLogo.setAttribute('target', '_blank');
    footerContainer.append(rssLogo);
    const imageRss: HTMLImageElement = document.createElement('img');
    imageRss.classList.add('rss-logo-img');
    rssLogo.append(imageRss);
    const yearWrap: HTMLElement = document.createElement('div');
    yearWrap.className = 'year-wrap';
    const year: HTMLSpanElement = document.createElement('span');
    year.innerText = '2023';
    yearWrap.append(year);
    footerContainer.append(yearWrap);
    const footerInfo: HTMLElement = document.createElement('div');
    footerInfo.className = 'copyright__info';
    footerInfo.innerHTML = `
      <a class="copyright__info__link" href="https://github.com/AlexKabanau" target="_blank">
      RSSchool#2022 <br>
      Alexandr Kabanau
      </a>
      `;
    footerContainer.append(footerInfo);
    this.container.append(footerContainer);
  }

  render() {
    this.createFooter();
    return this.container;
  }
}
export default Footer;

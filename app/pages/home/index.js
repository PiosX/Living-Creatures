import Page from 'classes/Page';

export default class Home extends Page {
  constructor() {
    super({
      id: 'home',
      element: '.home',
      elements: {
        wrapper: '.home__wrapper',
        navigation: document.querySelector('.navigation'),
        enter: '.home__components__enter',
      },
    });
  }

  create() {
    super.create();

    this.elements.enter.addEventListener('click', () =>
      console.log('Clicked!')
    );
  }
}

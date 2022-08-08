import Page from 'classes/Page';

export default class Twilight extends Page {
  constructor() {
    super({
      id: 'twilight',
      element: '.twilight',
      elements: {
        wrapper: '.twilight__wrapper',
        navigation: document.querySelector('.navigation'),
      },
    });
  }
}

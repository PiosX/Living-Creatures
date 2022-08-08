import Page from 'classes/Page';

export default class Midnight extends Page {
  constructor() {
    super({
      id: 'midnight',
      element: '.midnight',
      elements: {
        wrapper: '.midnight__wrapper',
        navigation: document.querySelector('.navigation'),
      },
    });
  }
}

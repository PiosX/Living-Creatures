import Page from 'classes/Page';

export default class Sunlight extends Page {
  constructor() {
    super({
      id: 'sunlight',
      element: '.sunlight',
      elements: {
        wrapper: '.sunlight__wrapper',
        navigation: document.querySelector('.navigation'),
      },
    });
  }
}

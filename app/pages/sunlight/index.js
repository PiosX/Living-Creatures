import Page from 'classes/Page';

export default class Sunlight extends Page {
  constructor() {
    super({
      id: 'sunlight',
      element: '.sunlight',
      elements: {
        navigation: document.querySelector('.navigation'),
      },
    });
  }
}

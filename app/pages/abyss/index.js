import Page from 'classes/Page';

export default class Abyss extends Page {
  constructor() {
    super({
      id: 'abyss',
      element: '.abyss',
      elements: {
        navigation: document.querySelector('.navigation'),
      },
    });
  }
}

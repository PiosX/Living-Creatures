import each from 'lodash/each';
import Home from 'pages/Home';
import Sunlight from 'pages/Sunlight';
import Twilight from 'pages/Twilight';
import Midnight from 'pages/Midnight';
import Abyss from 'pages/Abyss';
import Preloader from 'components/Preloader';
import Navigation from 'components/Navigation';

class App {
  constructor() {
    this.createContent();
    this.createPreloader();
    this.createNavigation();
    this.createPages();
    this.addEventListeners();
    this.addLinkListeners();
    this.update();
  }

  createNavigation() {
    this.navigation = new Navigation({
      template: this.template,
    });
  }

  createPreloader() {
    this.preloader = new Preloader();
    this.preloader.once('completed', this.onPreloaded.bind(this));
  }

  createContent() {
    this.content = document.querySelector('.content');
    this.template = this.content.getAttribute('data-template');
  }

  createPages() {
    this.pages = {
      home: new Home(),
      sunlight: new Sunlight(),
      twilight: new Twilight(),
      midnight: new Midnight(),
      abyss: new Abyss(),
    };

    this.page = this.pages[this.template];
    this.page.create();
  }

  // Events

  onPreloaded() {
    this.preloader.destroy();
    this.onResize();
    this.page.show();
  }

  async onChange(url) {
    await this.page.hide();

    const request = await window.fetch(url);

    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement('div');

      div.innerHTML = html;
      const divContent = div.querySelector('.content');

      this.template = divContent.getAttribute('data-template');
      this.navigation.onChange(this.template);

      this.content.setAttribute('data-template', this.template);
      this.content.innerHTML = divContent.innerHTML;

      this.page = this.pages[this.template];

      this.page.create();
      this.onResize();
      this.page.show();

      this.addLinkListeners();
    } else {
      console.log('Error');
    }
  }

  onResize() {
    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  // Loop

  update() {
    if (this.page && this.page.update) {
      this.page.update();
    }
    this.frame = window.requestAnimationFrame(this.update.bind(this));
  }

  // Listeners

  addEventListeners() {
    window.addEventListener('resize', this.onResize.bind(this));
  }

  addLinkListeners() {
    const links = document.querySelectorAll('a');

    each(links, (link) => {
      link.onclick = (event) => {
        event.preventDefault();
        const { href } = link;

        this.onChange(href);
      };
    });
  }
}

// eslint-disable-next-line no-new
new App();

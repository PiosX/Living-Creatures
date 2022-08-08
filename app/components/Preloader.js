import GSAP from 'gsap';
import Component from 'classes/Component';
import each from 'lodash/each';
import { split } from 'utils/text';

export default class Preloader extends Component {
  constructor() {
    super({
      element: '.preloader',
      elements: {
        title: '.preloader__text',
        author: '.preloader__author',
        number: '.preloader__number',
        images: document.querySelectorAll('img'),
      },
    });

    this.element.titleSpans = split({
      element: this.elements.title,
      expression: '<br>',
    });

    this.length = 0;

    console.log(this.element, this.elements);

    this.createLoader();
  }

  createLoader() {
    each(this.elements.images, (element) => {
      element.onload = () => this.onAssetLoaded(element);
      element.src = element.getAttribute('data-src');
    });
  }

  onAssetLoaded(image) {
    this.length += 1;

    const percent = this.length / this.elements.images.length;

    this.elements.number.innerHTML = `${Math.round(percent * 100)}%`;

    if (percent === 1) {
      this.onLoaded();
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      this.animateOut = GSAP.timeline({
        delay: 2,
      });
      this.animateOutNum = GSAP.timeline({
        delay: 2.1,
      });

      this.animateOut.to(this.element.titleSpans, {
        autoAlpha: 0,
        duration: 1.5,
        ease: 'expo.out',
        stagger: 0.1,
        y: -50,
      });

      this.animateOutNum.to(this.elements.author, {
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        y: -50,
      });

      this.animateOut.to(this.elements.number, {
        autoAlpha: 0,
        duration: 1,
        ease: 'expo.out',
        stagger: 0.1,
        y: -50,
      });

      this.animateOut.to(
        this.element,
        {
          duration: 1,
          scaleY: 0,
          transformOrigin: '100% 100%',
        },
        '-=1'
      );

      this.animateOut.call(() => {
        this.emit('completed');
      });
    });
  }

  destroy() {
    this.element.parentNode.removeChild(this.element);
  }
}

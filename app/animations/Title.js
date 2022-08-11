import GSAP from 'gsap';
import Animation from 'classes/Animation';

export default class Title extends Animation {
  constructor({ element, elements }) {
    super({
      element,
      elements,
    });
  }

  animateIn() {
    GSAP.fromTo(
      this.element,
      {
        y: 300,
        autoAlpha: 0,
      },
      {
        y: 0,
        autoAlpha: 1,
        delay: 0.3,
        duration: 0.8,
      }
    );
  }

  animateOut() {
    GSAP.set(this.element, {
      y: 0,
      autoAlpha: 0,
    });
  }
}

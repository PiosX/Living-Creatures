import GSAP from 'gsap';

import Component from 'classes/Component';

import { COLOR_TURQUOISE } from 'utils/color';

export default class Navigation extends Component {
  constructor({ template }) {
    super({
      element: '.navigation',
      elements: {
        items: '.navigation__list__item',
        links: '.navigation__list__link',
      },
    });

    this.onChange(template);
  }

  onChange(template) {
    if (
      template !== 'sunlight' ||
      template !== 'twilight' ||
      template !== 'midnight' ||
      template !== 'abyss'
    ) {
      GSAP.to(this.elements.links, {
        color: '#000',
        duration: 1,
      });
    }
    if (template === 'sunlight') {
      GSAP.to(this.elements.links[0], {
        color: COLOR_TURQUOISE,
        duration: 1,
      });
    } else if (template === 'twilight') {
      GSAP.to(this.elements.links[1], {
        color: COLOR_TURQUOISE,
        duration: 1,
      });
    } else if (template === 'midnight') {
      GSAP.to(this.elements.links[2], {
        color: COLOR_TURQUOISE,
        duration: 1,
      });
    } else if (template === 'abyss') {
      GSAP.to(this.elements.links[3], {
        color: COLOR_TURQUOISE,
        duration: 1,
      });
    }
  }
}

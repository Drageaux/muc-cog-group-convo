import {registerComponent} from 'aframe';

export const cursorListenerComponent = registerComponent('cursor-listener', {
  schema: {
    speakerId: {type: 'string'},
  },
  init: function () {
    const captionEl = document.querySelector('a-text#caption');
    this.el.addEventListener('click', () => {
      // update caption's cursor target
      captionEl.setAttribute(
        'caption',
        `speaker: ${captionEl.getAttribute('caption').speaker}; cursorTarget: ${
          this.data.speakerId
        }`
      );
    });
    this.el.addEventListener('mouseleave', () => {
      // remove caption's cursor target
      captionEl.setAttribute(
        'caption',
        `speaker: ${
          captionEl.getAttribute('caption').speaker
        }; cursorTarget: ''`
      );
    });
  },
});

import {registerComponent, Entity} from 'aframe';

export const cursorListenerComponent = registerComponent('cursor-listener', {
  schema: {
    speakerId: {type: 'string'},
  },
  init: function () {
    const captionEl = document.querySelector('a-text#caption');
    this.el.addEventListener('click', e => {
      console.log('Mouse entered!', {e});
      // update caption's cursor target
      captionEl.setAttribute(
        'caption',
        `speaker: ${captionEl.getAttribute('caption').speaker}; cursorTarget: ${
          this.data.speakerId
        }`
      );
    });
    this.el.addEventListener('mouseleave', () => {
      console.log('Mouse left');
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

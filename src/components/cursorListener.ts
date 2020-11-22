import {registerComponent, Entity} from 'aframe';

export const cursorListenerComponent = registerComponent('cursor-listener', {
  schema: {
    speakerId: {type: 'string'},
  },
  init: function () {
    const captionEl = document.querySelector('a-text#caption');
    this.el.addEventListener('click', e => {
      console.log('Player hit something!', {e});
      // update caption's cursor target
      captionEl.setAttribute('cursor-target', this.data.speakerId);
      if (this.data.speakerId === captionEl.getAttribute('caption').speaker)
        captionEl.setAttribute('opacity', 1);
      console.log('cursor target', `speaker: ${this.data.speakerId}`);
      console.log('current speaker', captionEl.getAttribute('caption'));
    });
    this.el.addEventListener('mouseleave', () => {
      console.log('Mouse left');
      // remove caption's cursor target
      captionEl.setAttribute('cursor-target', null);
      captionEl.setAttribute('opacity', 0);
    });
  },
});

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
      console.log(captionEl.getDOMAttribute('caption').speaker);
      captionEl.setAttribute('caption', {cursorTarget: this.data.speakerId});
    });
    this.el.addEventListener('mouseleave', () => {
      console.log('Mouse left');
      // remove caption's cursor target
      captionEl.setAttribute('caption', {cursorTarget: ''});
    });
  },
});

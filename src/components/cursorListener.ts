import {registerComponent, Entity} from 'aframe';

export const cursorListenerComponent = registerComponent('cursor-listener', {
  init: function () {
    this.el.addEventListener('click', e => {
      const caption = document.querySelector('#caption');
      console.log('Player hit something!', {e});
      caption.setAttribute('opacity', 1);
    });
    this.el.addEventListener('mouseleave', () => {
      console.log('Mouse left');
      const caption = document.querySelector('#caption');
      caption.setAttribute('opacity', 0);
    });
  },
});

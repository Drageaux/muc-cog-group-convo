import {registerComponent, Entity, Component} from 'aframe';
import {VideoPlaybackSystem} from '../systems/videoPlayback';

export interface CaptionComponent extends Component {
  system: VideoPlaybackSystem;
}
export const captionComponent = registerComponent('caption', {
  schema: {
    speaker: {type: 'string'},
    text: {type: 'string'},
  },
  init: function (this: CaptionComponent) {
    this.el.addEventListener('click', e => {
      const caption = document.querySelector('#caption');
      console.log('Player hit something!', {e});
      console.log(this.system.currentlyPlaying);
      caption.setAttribute('opacity', 1);
    });
    this.el.addEventListener('mouseleave', () => {
      console.log('Mouse left');
      const caption = document.querySelector('#caption');
      caption.setAttribute('opacity', 0);
    });
  },
  update: function () {},
});

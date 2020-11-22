import {Component, registerComponent} from 'aframe';
import {VideoPlaybackSystem} from '../systems/videoPlayback';
import {VIDEO_PLAYBACK_NAME} from '../constants';

export interface VideoPlaybackComponent extends Component {
  system: VideoPlaybackSystem;
  data: 'juror-a' | 'juror-b' | 'juror-c' | 'jury-foreman';

  moveToNextVideo: (this: VideoPlaybackComponent) => void;
}

export const videoPlaybackComponent = registerComponent(VIDEO_PLAYBACK_NAME, {
  schema: {
    jurorId: {type: 'string'},
  },
  init: function (this: VideoPlaybackComponent) {
    const videoAssetSelector = `#${this.data}-video`;
    console.log(this.data);
    const videoAssetEl = document.querySelector(videoAssetSelector);
    videoAssetEl.addEventListener('ended', () => this.moveToNextVideo);
  },

  moveToNextVideo: function (this: VideoPlaybackComponent) {
    console.log('moving to next video');
    this.system.moveToNextVideo(this.data);
  },
});

import {registerSystem, System} from 'aframe';
import THREE = require('three');


export interface VideoManagerSystem extends System {
  currentVideos: [
    HTMLMediaElement,
    HTMLMediaElement,
    HTMLMediaElement,
    HTMLMediaElement
  ];
}

const swapVideoElement = (
  jurorId: 'juror-a' | 'juror-b' | 'juror-c',
  videoUrl: string
) => {
  const jurorSelector = `#${jurorId}`;
  const jurorEl = document.querySelector(jurorSelector)!;
  jurorEl.setAttribute('src', videoUrl);
};

export const videoManagerSystem = registerSystem('video-manager', {
  init: function (this: VideoManagerSystem) {
    swapVideoElement('juror-a', 'assets/videos/1.mp4');
    swapVideoElement('juror-b', 'assets/videos/2.mp4');
    swapVideoElement('juror-c', 'assets/videos/3.mp4');
    setTimeout(() => {
        swapVideoElement('juror-a', 'assets/videos/10.mp4');
    }, 5000);
  },
});

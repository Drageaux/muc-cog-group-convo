import {registerSystem, System} from 'aframe';
import {VIDEO_PLAYBACK_NAME} from '../constants';

export interface VideoPlaybackSystem extends System {
  currentlyPlaying: [
    HTMLMediaElement,
    HTMLMediaElement,
    HTMLMediaElement,
    HTMLMediaElement
  ];
}

/**
 * Swaps the src video out of the given element. Somehow, AFRAME knows to fetch the asset ahead of time.
 * @param jurorId The ID of the juror to swap videos out for
 * @param videoUrl The path to the video to load (should be something like "assets/videos/X.mp4")
 */
const swapVideoElement = (
  jurorId: 'juror-a' | 'juror-b' | 'juror-c' | 'jury-foreman',
  videoUrl: string
) => {
  const jurorSelector = `#${jurorId}-video`;
  const jurorEl = document.querySelector(jurorSelector)!;
  jurorEl.setAttribute('src', videoUrl);
  //   jurorEl.removeAttribute('activeSpeaker');
  return jurorEl;
};

export const videoPlaybackSystem = registerSystem(VIDEO_PLAYBACK_NAME, {
  init: function (this: VideoPlaybackSystem) {
    swapVideoElement('juror-a', 'assets/videos/3.mp4');
    swapVideoElement('juror-b', 'assets/videos/2.mp4');
    swapVideoElement('juror-c', 'assets/videos/5.mp4');
    swapVideoElement('jury-foreman', 'assets/videos/1.mp4');
    setTimeout(() => {
      swapVideoElement('juror-c', 'assets/videos/7.mp4');
    }, 5000);
  },
});

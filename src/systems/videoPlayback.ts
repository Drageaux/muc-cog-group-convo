import {registerSystem, System} from 'aframe';
import {VIDEO_PLAYBACK_NAME} from '../constants';
import {captions} from './captions';

const JUROR_IDLE_VIDEOS = {
  'juror-a': [`assets/videos/${'idle'}.mp4`],
  'juror-b': [`assets/videos/${'idle'}.mp4`],
  'juror-c': [
    'assets/videos/juror-c-idle-1.mp4',
    'assets/videos/juror-c-idle-2.mp4',
    'assets/videos/juror-c-idle-3.mp4',
    'assets/videos/juror-c-idle-4.mp4',
    'assets/videos/juror-c-idle-5.mp4',
  ],
  'jury-foreman': [`assets/videos/${'idle'}.mp4`],
};

export interface VideoPlaybackSystem extends System {
  currentlyPlaying: number;
  moveToNextVideo: (
    this: VideoPlaybackSystem,
    jurorId: 'juror-a' | 'juror-b' | 'juror-c' | 'jury-foreman'
  ) => void;
}

/**
 * Swaps the src video out of the given element. Somehow, AFRAME knows to fetch the asset ahead of time.
 * @param jurorVideoId The ID of the juror to swap videos out for
 * @param videoUrl The path to the video to load (should be something like "assets/videos/X.mp4")
 */
const swapVideoElement = (
  jurorId: 'juror-a' | 'juror-b' | 'juror-c' | 'jury-foreman',
  videoUrl: string
) => {
  const jurorSelector = `#${jurorId}-video`;
  const jurorVideoAssetEl = document.querySelector(jurorSelector)!;
  jurorVideoAssetEl.setAttribute('src', videoUrl);
  jurorVideoAssetEl.setAttribute('video-playback', {jurorId});
  jurorVideoAssetEl.play();
  return jurorVideoAssetEl;
};

export const videoPlaybackSystem = registerSystem(VIDEO_PLAYBACK_NAME, {
  init: function (this: VideoPlaybackSystem) {
    this.currentlyPlaying = 1;
    swapVideoElement(
      captions[this.currentlyPlaying - 1].id,
      `assets/videos/${this.currentlyPlaying}.mp4`
    );
  },

  moveToNextVideo: function (
    this: VideoPlaybackSystem,
    jurorId: 'juror-a' | 'juror-b' | 'juror-c' | 'jury-foreman'
  ) {
    const jurorSelector = `#${jurorId}-video`;
    const jurorVideoAssetEl = document.querySelector(jurorSelector);
    const videoSrc = jurorVideoAssetEl.getAttribute('src') as string;
    const filename = videoSrc.split('/').pop()!;
    const stem = filename.split('.')[0];

    const idleVideoFilepathOptions = JUROR_IDLE_VIDEOS[jurorId];
    const idleVideoFilepath =
      idleVideoFilepathOptions[
        Math.floor(Math.random() * idleVideoFilepathOptions.length)
      ];
    swapVideoElement(jurorId, idleVideoFilepath);

    if (!stem.includes('idle')) {
      console.log(`Seems like ${jurorId} is done speaking!`);
      // Video is of someone speaking, change the current speaker video to idle and change the next speaker's idle to playing.
      const {id: newSpeakerId} = captions[this.currentlyPlaying];
      this.currentlyPlaying += 1;
      swapVideoElement(
        newSpeakerId,
        `assets/videos/${this.currentlyPlaying}.mp4`
      );
    }
  },
});

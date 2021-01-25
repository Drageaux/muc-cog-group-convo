import {registerSystem, System} from 'aframe';
import {VIDEO_PLAYBACK_NAME} from '../constants';
import {captions} from './captions';

const JUROR_IDLE_VIDEOS = {
  'juror-a': [
    '/public/videos/juror-a-idle-1.mp4',
    '/public/videos/juror-a-idle-2.mp4',
    '/public/videos/juror-a-idle-3.mp4',
    '/public/videos/juror-a-idle-4.mp4',
    '/public/videos/juror-a-idle-5.mp4',
  ],
  'juror-b': [
    '/public/videos/juror-b-idle-1.mp4',
    '/public/videos/juror-b-idle-2.mp4',
    '/public/videos/juror-b-idle-3.mp4',
    '/public/videos/juror-b-idle-4.mp4',
    '/public/videos/juror-b-idle-5.mp4',
    '/public/videos/juror-b-idle-6.mp4',
    '/public/videos/juror-b-idle-7.mp4',
    '/public/videos/juror-b-idle-8.mp4',
  ],
  'juror-c': [
    '/public/videos/juror-c-idle-1.mp4',
    '/public/videos/juror-c-idle-2.mp4',
    '/public/videos/juror-c-idle-3.mp4',
    '/public/videos/juror-c-idle-4.mp4',
    '/public/videos/juror-c-idle-5.mp4',
  ],
  'jury-foreman': [
    '/public/videos/jury-foreman-idle-1.mp4',
    '/public/videos/jury-foreman-idle-2.mp4',
    '/public/videos/jury-foreman-idle-3.mp4',
    '/public/videos/jury-foreman-idle-4.mp4',
    '/public/videos/jury-foreman-idle-5.mp4',
    '/public/videos/jury-foreman-idle-6.mp4',
    '/public/videos/jury-foreman-idle-7.mp4',
    '/public/videos/jury-foreman-idle-8.mp4',
  ],
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
 * @param videoUrl The path to the video to load (should be something like "/public/videos/X.mp4")
 */
const swapVideoElement = (
  jurorId: 'juror-a' | 'juror-b' | 'juror-c' | 'jury-foreman',
  videoUrl: string
) => {
  const jurorSelector = `#${jurorId}-video`;
  const jurorVideoAssetEl = document.querySelector(jurorSelector)!;
  jurorVideoAssetEl.setAttribute('src', videoUrl);
  jurorVideoAssetEl.setAttribute('video-playback', {jurorId});
  jurorVideoAssetEl.load();
  jurorVideoAssetEl.play();
  return jurorVideoAssetEl;
};

/**
 * Update text value, as well as changing the active speaker in the caption's comp.
 * @param currentSpeaker
 * @param text
 */
const updateCaption = (currentSpeaker: string, text: string) => {
  const captionEl = document.querySelector('#caption');
  captionEl.setAttribute('value', text);

  captionEl.setAttribute(
    'caption',
    `speaker: ${currentSpeaker}; cursorTarget: ${
      captionEl.getAttribute('caption').cursorTarget
    }`
  );
};

export const videoPlaybackSystem = registerSystem(VIDEO_PLAYBACK_NAME, {
  init: function (this: VideoPlaybackSystem) {
    this.currentlyPlaying = 1;
    swapVideoElement(
      captions[this.currentlyPlaying - 1].id,
      `/public/videos/${this.currentlyPlaying}.mp4`
    );
    updateCaption(
      captions[this.currentlyPlaying - 1].id,
      captions[this.currentlyPlaying - 1].text
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
      // Video is of someone speaking, change the current speaker video to idle and change the next speaker's idle to playing.
      const {id: newSpeakerId} = captions[this.currentlyPlaying];
      this.currentlyPlaying += 1;
      swapVideoElement(
        newSpeakerId,
        `/public/videos/${this.currentlyPlaying}.mp4`
      );
      updateCaption(
        captions[this.currentlyPlaying - 1].id,
        captions[this.currentlyPlaying - 1].text
      );
    }
  },
});

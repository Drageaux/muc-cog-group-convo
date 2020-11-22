import {registerSystem, System} from 'aframe';
import {VIDEO_PLAYBACK_NAME} from '../constants';
import {captions} from './captions';

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
    if (stem.includes('idle')) {
      // It's an idle video, play another idle video.
      swapVideoElement(jurorId, `assets/videos/${'idle'}.mp4`);
    } else {
      console.log(`Seems like ${jurorId} is done speaking!`);
      // Video is of someone speaking, change the current speaker video to idle and change the next speaker's idle to playing.
      swapVideoElement(jurorId, `assets/videos/${'idle'}.mp4`);
      const {id: newSpeakerId} = captions[this.currentlyPlaying];
      this.currentlyPlaying += 1;
      swapVideoElement(
        newSpeakerId,
        `assets/videos/${this.currentlyPlaying}.mp4`
      );
    }
  },
});

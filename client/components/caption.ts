import {registerComponent} from 'aframe';

export const captionComponent = registerComponent('caption', {
  schema: {
    speaker: {type: 'string'},
    cursorTarget: {type: 'string'},
  },
  init: function () {
    // should be empty
  },
  update: function () {
    if (
      this.data.speaker &&
      this.data.cursorTarget &&
      this.data.speaker === this.data.cursorTarget
    ) {
      this.el.setAttribute('opacity', 1);
    } else {
      this.el.setAttribute('opacity', 0);
    }
  },
});

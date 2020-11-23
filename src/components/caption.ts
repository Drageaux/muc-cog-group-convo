import {registerComponent} from 'aframe';

export const captionComponent = registerComponent('caption', {
  schema: {
    speaker: {type: 'string'},
    cursorTarget: {type: 'string'},
  },
  init: function () {
    console.log(this.data.speaker);
    console.log(this.data.cursorTarget);
  },
  update: function () {
    console.log(this.data.speaker);
    console.log(this.data.cursorTarget);
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

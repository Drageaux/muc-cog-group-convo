import {Component, Entity, registerComponent} from 'aframe';

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
    const cursorTarget = this.el.getAttribute('cursor-target');
    console.log('cursor target', cursorTarget);
    console.log('current speaker', this.data.speaker);
    if (
      this.data.speaker &&
      cursorTarget &&
      this.data.speaker === cursorTarget
    ) {
      this.el.setAttribute('opacity', 1);
    } else {
      this.el.setAttribute('opacity', 0);
    }
  },
});

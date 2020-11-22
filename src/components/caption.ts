import {Component, Entity, registerComponent} from 'aframe';
import {Vector3} from 'three';

export interface CaptionComponent extends Component {
  schema: {speaker: {type: 'string'}; cursorTarget: {type: 'string'}};
  init: () => void;
  update: () => void;
}

export const captionComponent = registerComponent('caption', {
  schema: {
    speaker: {type: 'string'},
    cursorTarget: {type: 'string'},
  },
  init: function () {
    console.log(this.data.speaker);
    console.log(this.data.cursorTarget);
  },
  update: function (oldData: any) {
    console.log({oldData});
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

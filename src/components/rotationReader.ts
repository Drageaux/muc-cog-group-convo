import {Entity, registerComponent} from 'aframe';
import {Vector3} from 'three';

export const rotationReaderComponent = registerComponent('rotation-reader', {
  /**
   * We use IIFE (immediately-invoked function expression) to only allocate one
   * vector or euler and not re-create on every tick to save memory.
   */
  tick: (function () {
    const position = new Vector3();
    return function () {
      // using "this" does not support getting object3D, so we use querySelector instead
      const camPos = document
        .querySelector('a-camera')
        .object3D.getWorldPosition(position);
      const texts = document.querySelectorAll('a-entity[text]');
      texts.forEach(t => {
        const textEntity = t as Entity;
        textEntity.object3D.lookAt(camPos.x, 1, camPos.z);
      });
    };
  })(),
});

import {registerComponent} from 'aframe';

export const rotationReaderComponent = registerComponent('rotation-reader', {
  /**
   * We use IIFE (immediately-invoked function expression) to only allocate one
   * vector or euler and not re-create on every tick to save memory.
   */
  tick: (function () {
    return function () {
      // using "this" does not support getting object3D, so we use querySelector instead
      // const camRotation = document.querySelector('a-camera').object3D.rotation;
      // const {x, y, z} = camRotation;
      // console.log({x}, {y}, {z});
    };
  })(),
});

import {Coordinate, Entity, registerComponent} from 'aframe';
import {
  MAX_CHARACTER_COUNT,
  MAX_HEIGHT,
  MAX_WIDTH,
  MESSAGE_QUEUE_NAME,
  PADDING,
} from './constants';
import {messageQueuesComponent} from './components/messageQueues';
import {messageQueuesSystem} from './systems/messageQueues';
import THREE = require('three');

// Necessary so webpack won't mark these as dead code. Probably a better way to do this but ¯\_(ツ)_/¯
messageQueuesComponent;
messageQueuesSystem;

const words = ['quite', 'almost', 'very', 'really', 'too', 'extremely', 'just'];
registerComponent('begin-socket', {
  init: function () {
    let i = 0;
    const QUEUE_ID = 0;

    const peopleModels = document.querySelectorAll(
      'a-entity[gltf-model="#sitting"]'
    );
    peopleModels.forEach(p => {
      const personModel = p as Entity<any>;
      const cam = document.querySelector('a-camera').object3D;
      const camPos = cam.getWorldPosition(new THREE.Vector3());
      console.log('cam pos', camPos);
      const personPos = personModel.object3D.position;
      const box = new THREE.Box3().setFromObject(personModel.object3D);
      const personHeight = box.max.y - box.min.y;
      console.log('person pos', personPos);
      setInterval(() => {
        const newTextElement = createAFrameText(
          `${i}: Message is ${
            words[i % words.length]
          } interesting wow so interesting`,
          {x: personPos.x, y: 0, z: personPos.z},
          [0, 90, 0]
        );
        newTextElement.setAttribute(MESSAGE_QUEUE_NAME, {queueId: QUEUE_ID});

        i += 1;
        this.el.appendChild(newTextElement);
        newTextElement.object3D.lookAt(camPos.x, camPos.y, camPos.z);
      }, 3000);
    });
  },
});

/**
 *
 * @param {string} text The text to display
 * @param {Coordinate} position The (x, y, z) position at which to display the text element
 * @param {[number, number, number]} rotation The rotation of the text element (in degrees)
 */
const createAFrameText = (
  text: string,
  position: Coordinate,
  rotation: [number, number, number]
) => {
  const newTextElement = document.createElement('a-entity');
  newTextElement.setAttribute('text', {
    wrapCount: MAX_CHARACTER_COUNT,
    value: text,
  });

  newTextElement.setAttribute('geometry', {
    primitive: 'plane',
    width: MAX_WIDTH,
    height: MAX_HEIGHT,
  });
  newTextElement.setAttribute('material', {
    color: 'black',
    opacity: 0.5,
    side: 'double',
  });
  const [xDegrees, yDegrees, zDegrees] = rotation;
  newTextElement.setAttribute('position', position);
  newTextElement.setAttribute('rotation', {
    x: xDegrees,
    y: yDegrees,
    z: zDegrees,
  });

  return newTextElement;
};

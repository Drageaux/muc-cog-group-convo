import {Coordinate, registerComponent} from 'aframe';
import {MAX_CHARACTER_COUNT, MAX_HEIGHT, MAX_WIDTH, MESSAGE_QUEUE_NAME} from './constants';
import {messageQueuesComponent} from './components/messageQueues';
import {messageQueuesSystem} from './systems/messageQueues';

// Necessary so webpack won't mark these as dead code. Probably a better way to do this but ¯\_(ツ)_/¯
messageQueuesComponent;
messageQueuesSystem;

registerComponent('begin-socket', {
  init: function () {
    let i = 0;
    const QUEUE_ID = 0;
    setInterval(() => {
      const newTextElement = createAFrameText(
        `${i}: Message is really interesting wow so interesting`,
        {x: 1.0, y: 2.5, z: -1.29},
        [0, 90, 0]
      );
      newTextElement.setAttribute(MESSAGE_QUEUE_NAME, {queueId: QUEUE_ID});
      this.el.appendChild(newTextElement);
      i += 1;
    }, 3000);
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

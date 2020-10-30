import { Coordinate } from "aframe";
import { MAX_CHARACTER_COUNT, MAX_WIDTH, MAX_HEIGHT } from "./constants";

/**
 * Creates an A-Frame Entity containing the specified text and geometry.
 * @param {string} text The text to display
 * @param {Coordinate} position The (x, y, z) position at which to display the text element
 * @param {[number, number, number]} rotation The rotation of the text element (in degrees)
 */
export const createAFrameText = (
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
import {Coordinate, Entity, registerComponent} from 'aframe';
import {
  MAX_CHARACTER_COUNT,
  MAX_HEIGHT,
  MAX_WIDTH,
  MESSAGE_QUEUE_NAME,
} from './constants';
import {messageQueuesComponent} from './components/messageQueues';
import {messageQueuesSystem} from './systems/messageQueues';
import {rotationReaderComponent} from './components/rotationReader';
import { beginSocketComponent } from './components/beginSocket';
import { videoPlaybackSystem } from './systems/videoPlayback';

// Necessary so webpack won't mark these as dead code. Probably a better way to do this but ¯\_(ツ)_/¯
messageQueuesComponent;
messageQueuesSystem;
rotationReaderComponent;
beginSocketComponent;
videoPlaybackSystem;



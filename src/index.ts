import {messageQueuesComponent} from './components/messageQueues';
import {messageQueuesSystem} from './systems/messageQueues';
import {rotationReaderComponent} from './components/rotationReader';
import {beginSocketComponent} from './components/beginSocket';
import {videoPlaybackSystem} from './systems/videoPlayback';
import {videoPlaybackComponent} from './components/videoPlayback';

// Necessary so webpack won't mark these as dead code. Probably a better way to do this but ¯\_(ツ)_/¯
messageQueuesComponent;
messageQueuesSystem;
rotationReaderComponent;
beginSocketComponent;
videoPlaybackSystem;
videoPlaybackComponent;

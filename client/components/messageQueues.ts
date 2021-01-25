import {Component, registerComponent} from 'aframe';
import {MESSAGE_QUEUE_NAME} from '../constants';
import {MessageQueuesSystem} from '../systems/messageQueues';

export interface MessageQueuesComponent extends Component {
  system: MessageQueuesSystem;
  data: {
    queueId: number;
  };
}

export const messageQueuesComponent = registerComponent(MESSAGE_QUEUE_NAME, {
  schema: {
    queueId: {type: 'number'},
  },
  init: function (this: MessageQueuesComponent) {
    this.system.addMessage(this.data.queueId, this.el);
  },
});

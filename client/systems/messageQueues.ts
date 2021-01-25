import {Entity, registerSystem, System} from 'aframe';
import {
  MAX_HEIGHT,
  MESSAGE_EXPIRATION_TIME_MILLIS,
  MESSAGE_QUEUE_NAME,
  PADDING,
} from '../constants';

export interface MessageQueuesSystem extends System {
  queues: [Entity[], Entity[], Entity[], Entity[], Entity[]];
  addMessage: (queueId: number, entity: Entity) => void;
}

export const messageQueuesSystem = registerSystem(MESSAGE_QUEUE_NAME, {
  init: function (this: MessageQueuesSystem) {
    this.queues = [[], [], [], [], []];
  },

  addMessage: function (
    this: MessageQueuesSystem,
    queueId: number,
    entity: Entity
  ): void {
    const queue = this.queues[queueId];
    this.queues[queueId].forEach(entity => {
      entity.object3D.position.y += MAX_HEIGHT + PADDING;
    });
    queue.push(entity);
    setTimeout(
      () => entity.parentElement!.removeChild(entity),
      MESSAGE_EXPIRATION_TIME_MILLIS
    );
  },
});

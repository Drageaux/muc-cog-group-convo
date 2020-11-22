import {registerComponent, Entity} from 'aframe';
import {createAFrameText} from '../common';
import {MESSAGE_QUEUE_NAME} from '../constants';

const words = ['quite', 'almost', 'very', 'really', 'too', 'extremely', 'just'];
export const beginSocketComponent = registerComponent('begin-socket', {
  init: function () {
    // // loadVideoFile('/assets/videos/1.mp4');

    // let i = 0;

    // // NOTE: querySelectorAll returns a NodeList that does not support .object3D readily
    // const peopleModels = document.querySelectorAll(
    //   'a-entity[gltf-model="#sitting"]'
    // );

    // // forEach and as Entity<any> is a quick work-around
    // peopleModels.forEach((p, queueId) => {
    //   const personModel = p as Entity;
    //   const personPos = personModel.object3D.position;
    //   // y value is hard to grasp, so right now we just hard code a value
    //   // const box = new THREE.Box3().setFromObject(personModel.object3D);
    //   // const personHeight = box.max.y - box.min.y;
    //   setInterval(() => {
    //     const newTextElement = createAFrameText(
    //       `${i}: Message is ${
    //         words[i % words.length]
    //       } interesting wow so interesting`,
    //       {x: personPos.x, y: 2.5, z: personPos.z},
    //       [0, 90, 0]
    //     );
    //     newTextElement.setAttribute(MESSAGE_QUEUE_NAME, {queueId});
    //     i += 1;
    //     this.el.appendChild(newTextElement);
    //   }, 3000);
    // });
  },
});

// const juryForemanVids = [];
// const juryAVids = [];
// const juryBVids = [];
// const juryCVids = [];

// export const loadVideoFile = (file: string) => {
//   const video: any = document.createElement('video');
//   video.preload = 'metadata';

//   video.onloadedmetadata = function () {
//     window.URL.revokeObjectURL(video.src);

//     if (video.duration < 1) {
//       console.log('Invalid Video! video is less than 1 second');
//       return;
//     }
//     console.log({video});

//     // methodToCallIfValid();
//   };

//   // video.src = URL.createObjectURL(file);
//   // to set specific time of video
//   document.querySelector(
//     '#antarctica'
//   ).components.material.data.src.currentTime = 0; // start of video

//   // to play the videosphere
//   document
//     .querySelector('#antarctica')
//     .components.material.material.map.image.play();
// };

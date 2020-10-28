// Base code credit: https://codepen.io/olchyk98/pen/NLBVoW
import {
  Scene,
  PerspectiveCamera,
  WebGLRenderer,
  PCFSoftShadowMap,
  Color,
  Vector3,
  BoxGeometry,
  AmbientLight,
  Mesh,
  MeshBasicMaterial,
  MeshPhongMaterial,
  PlaneGeometry,
  PointLight,
  LinearFilter,
  VideoTexture,
  FrontSide,
  RGBFormat,
} from 'three';
import {PointerLockControls} from 'three/examples/jsm/controls/PointerLockControls';

// MainStuff:Setup
const scene = new Scene();
const camera = new PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
const renderer = new WebGLRenderer();
const controls = new PointerLockControls(camera, document.body);
const keyPresses: {[key: number]: boolean} = {};
controls.lock();

const player = {
  height: 0.5,
  turnSpeed: 0.1,
  speed: 0.1,
  jumpHeight: 0.2,
  gravity: 0.01,
  velocity: 0,

  playerJumps: false,
};

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFSoftShadowMap;
scene.background = new Color('black');
document.body.appendChild(renderer.domElement);

// BrowserWindow->Renderer:ResizeRe-Render
window.addEventListener('resize', () => {
  const w = window.innerWidth,
    h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// Camera:Setup
camera.position.set(0, player.height, -5);
camera.lookAt(new Vector3(0, player.height, 0));

// Object:Box1
const BoxGeometry1 = new BoxGeometry(1, 1, 1);
const BoxMaterial1 = new MeshBasicMaterial({
  color: 'white',
  wireframe: false,
});
const Box1 = new Mesh(BoxGeometry1, BoxMaterial1);

Box1.position.y = 3;
Box1.scale.x = Box1.scale.y = Box1.scale.z = 0.25;
scene.add(Box1);

// Object:Box2/Video
const video = document.createElement('video');
video.src = './example-vid.mp4';
video.load();
video.play();

const videoTexture = new VideoTexture(video);
videoTexture.minFilter = LinearFilter;
videoTexture.magFilter = LinearFilter;
videoTexture.format = RGBFormat;
const movieMaterial = new MeshBasicMaterial({
  map: videoTexture,
  // overdraw: true,
  side: FrontSide,
});

const BoxGeometry2 = new BoxGeometry(1, 1, 1);
const Box2 = new Mesh(BoxGeometry2, movieMaterial);
Box2.position.y = 0.75;
Box2.position.x = 0;
Box2.receiveShadow = true;
Box2.castShadow = true;
scene.add(Box2);

// Object:Box2/Video
const video2 = document.createElement('video');
video.src = './example-vid.mp4';
video.load();
video.play();

const videoTexture2 = new VideoTexture(video);
videoTexture.minFilter = LinearFilter;
videoTexture.magFilter = LinearFilter;
videoTexture.format = RGBFormat;
const movieMaterial2 = new MeshBasicMaterial({
  map: videoTexture,
  // overdraw: true,
  side: FrontSide,
});

const BoxGeometry3 = new BoxGeometry(1, 1, 1);
const Box3 = new Mesh(BoxGeometry3, movieMaterial2);
Box3.position.y = 0.75;
Box3.position.x = 3;
Box3.position.z = -1;
Box3.rotation.y = -Math.PI / 4;
Box3.receiveShadow = true;
Box3.castShadow = true;
scene.add(Box3);

// Object:Plane
const PlaneGeometry1 = new PlaneGeometry(10, 10);
const PlaneMaterial1 = new MeshPhongMaterial({
  color: 'white',
  wireframe: false,
});
const Plane1 = new Mesh(PlaneGeometry1, PlaneMaterial1);

Plane1.rotation.x -= Math.PI / 2;
Plane1.scale.x = 3;
Plane1.scale.y = 3;
Plane1.receiveShadow = true;
scene.add(Plane1);

// Object:Light:1
const light1 = new PointLight('white', 0.8);
light1.position.set(0, 3, 0);
light1.castShadow = true;
light1.shadow.camera.near = 2.5;
scene.add(light1);

// Object:Light:2
const light2 = new AmbientLight('white', 0.15);
light2.position.set(10, 2, 0);
scene.add(light2);

// Controls:Listeners
document.addEventListener('keydown', ({keyCode}) => {
  keyPresses[keyCode] = true;
});
document.addEventListener('keyup', ({keyCode}) => {
  keyPresses[keyCode] = false;
});

// ...
function control() {
  // Controls:Engine
  if (keyPresses[87]) {
    // w
    camera.position.x -= Math.sin(camera.rotation.y) * player.speed;
    camera.position.z -= -Math.cos(camera.rotation.y) * player.speed;
  }
  if (keyPresses[83]) {
    // s
    camera.position.x += Math.sin(camera.rotation.y) * player.speed;
    camera.position.z += -Math.cos(camera.rotation.y) * player.speed;
  }
  if (keyPresses[65]) {
    // a
    camera.position.x +=
      Math.sin(camera.rotation.y + Math.PI / 2) * player.speed;
    camera.position.z +=
      -Math.cos(camera.rotation.y + Math.PI / 2) * player.speed;
  }
  if (keyPresses[68]) {
    // d
    camera.position.x +=
      Math.sin(camera.rotation.y - Math.PI / 2) * player.speed;
    camera.position.z +=
      -Math.cos(camera.rotation.y - Math.PI / 2) * player.speed;
  }
  if (keyPresses[37]) {
    // la
    camera.rotation.y -= player.turnSpeed;
  }
  if (keyPresses[39]) {
    // ra
    camera.rotation.y += player.turnSpeed;
  }
  if (keyPresses[32]) {
    // space
    if (player.playerJumps) return false;
    player.playerJumps = true;
    player.velocity = -player.jumpHeight;
  }
  return undefined;
}

function ixMovementUpdate() {
  player.velocity += player.gravity;
  camera.position.y -= player.velocity;

  if (camera.position.y < player.height) {
    camera.position.y = player.height;
    player.playerJumps = false;
  }
}

function ixLightcubeAnimation() {
  const a = 0.01;
  Box1.rotation.x += a;
  Box1.rotation.y += a;
}

function update() {
  control();
  ixMovementUpdate();
  ixLightcubeAnimation();
}

function render() {
  renderer.render(scene, camera);
}

function loop() {
  requestAnimationFrame(loop);
  update();
  render();
}

loop();

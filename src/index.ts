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
} from 'three';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls';

// MainStuff:Setup
let scene = new Scene();
let camera = new PerspectiveCamera(
  65,
  window.innerWidth / window.innerHeight,
  0.1,
  1000,
);
let renderer = new WebGLRenderer();
var controls = new PointerLockControls(camera, document.body);
const keyPresses: { [key: number]: boolean } = {};
controls.lock();

let player = {
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
  let w = window.innerWidth,
    h = window.innerHeight;

  renderer.setSize(w, h);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
});

// Camera:Setup
camera.position.set(0, player.height, -5);
camera.lookAt(new Vector3(0, player.height, 0));

// Object:Box1
let BoxGeometry1 = new BoxGeometry(1, 1, 1);
let BoxMaterial1 = new MeshBasicMaterial({
  color: 'white',
  wireframe: false,
});
let Box1 = new Mesh(BoxGeometry1, BoxMaterial1);

Box1.position.y = 3;
Box1.scale.x = Box1.scale.y = Box1.scale.z = 0.25;
scene.add(Box1);

// Object:Box2
let BoxGeometry2 = new BoxGeometry(1, 1, 1);
let BoxMaterial2 = new MeshPhongMaterial({
  color: 'white',
  wireframe: false,
});
let Box2 = new Mesh(BoxGeometry2, BoxMaterial2);

Box2.position.y = 0.75;
Box2.position.x = 0;
Box2.receiveShadow = true;
Box2.castShadow = true;

scene.add(Box2);

// Object:Plane
let PlaneGeometry1 = new PlaneGeometry(10, 10);
let PlaneMaterial1 = new MeshPhongMaterial({
  color: 'white',
  wireframe: false,
});
let Plane1 = new Mesh(PlaneGeometry1, PlaneMaterial1);

Plane1.rotation.x -= Math.PI / 2;
Plane1.scale.x = 3;
Plane1.scale.y = 3;
Plane1.receiveShadow = true;
scene.add(Plane1);

// Object:Light:1
let light1 = new PointLight('white', 0.8);
light1.position.set(0, 3, 0);
light1.castShadow = true;
light1.shadow.camera.near = 2.5;
scene.add(light1);

// Object:Light:2
let light2 = new AmbientLight('white', 0.15);
light2.position.set(10, 2, 0);
scene.add(light2);

// Controls:Listeners
document.addEventListener('keydown', ({ keyCode }) => {
  keyPresses[keyCode] = true;
});
document.addEventListener('keyup', ({ keyCode }) => {
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
  let a = 0.01;
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

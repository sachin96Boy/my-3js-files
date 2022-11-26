import "./style.css";
import * as THREE from "three";
// import gsap from 'gsap';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
// import * as dat from "dat.gui";

import imageSource from "../static/textures/door/color.jpg";

// image texture
// const image = new Image();
// const texture = new THREE.Texture(image);
// image.onload = () => {
//   texture.needsUpdate = true;
// }
// image.src = imageSource;

// use loading manager
const loadingManager = new THREE.LoadingManager();
loadingManager.onStart = () => {
  console.log("loading started");
};
loadingManager.onLoad = () => {
  console.log("loading finished");
  animate();
};
loadingManager.onProgress = () => {
  console.log("loading progress");
};
loadingManager.onError = () => {
  console.log("loading error");
};

// use texterloader - this is the proper way to load image
const textureLoader = new THREE.TextureLoader(loadingManager);
const colorTexture = textureLoader.load("textures/door/color.jpg");
const alphaTexture = textureLoader.load("textures/door/alpha.jpg");
const heightTexture = textureLoader.load("textures/door/height.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load("textures/metalness.jpg");
const normalTexture = textureLoader.load("textures/door/normal.jpg");
const roughnessTexture = textureLoader.load("textures/roughness.jpg");

// repeat texture
// colorTexture.repeat.x = 2;
// colorTexture.repeat.y = 3; 
// colorTexture.wrapS = THREE.RepeatWrapping;
// colorTexture.wrapT = THREE.RepeatWrapping;

// colorTexture.offset.x = 0.5;
// colorTexture.offset.y = 0.5;
colorTexture.rotation = Math.PI * 0.25;
colorTexture.center.x = 0.5;
colorTexture.center.y = 0.5;



// Debug
// const gui = new dat.GUI();

// debg colors object
// const parameters = {
//   color: 0xff0000,
//   spin: () => {
//     gsap.to(cube.rotation, { duration: 1, y: cube.rotation.y + 10 });
//   },
// }

let mouse = {
  x: 0,
  y: 0,
};

let sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

// mouse
window.addEventListener("mousemove", (event) => {
  mouse.x = event.clientX / window.innerWidth - 0.5;
  mouse.y = -(event.clientY / window.innerHeight - 0.5);
});

// resize
window.addEventListener("resize", () => {
  // update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  renderer.domElement.requestFullscreen();
});

// listen to double cick
window.addEventListener("dblclick", () => {
  const fullscreenElement =
    document.fullscreenElement || document.webkitFullscreenElement;

  if (!fullscreenElement) {
    if (renderer.domElement.requestFullscreen) {
      renderer.domElement.requestFullscreen();
    } else if (renderer.domElement.webkitRequestFullscreen) {
      renderer.domElement.webkitRequestFullscreen();
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    } else if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
  }
});

// scene
const scene = new THREE.Scene();

// object
const geometry = new THREE.BoxGeometry(1, 1, 1);
// //////////////////////////////////////////////////////////////////////////////
//const geometry = new THREE.Geometry(); // empty geometry
// for loop to add 1000 vertices
// for (let i = 0; i < 100; i++) {
//     const vertex = new THREE.Vector3(
//         Math.random() - 0.5,
//         Math.random() - 0.5,
//         Math.random() - 0.5
//     );
//     geometry.vertices.push(vertex);
// }
// faces on geomatries
// geometry.faces.push(new THREE.Face3(0, 1, 2));
/////////////////////////////////////////////////////////////////////////////////////

// const material = new THREE.MeshBasicMaterial({ color: parameters.color, /*wireframe:true*/ });
const material = new THREE.MeshBasicMaterial({ map: colorTexture });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

// debug cube mesh
// gui.add(cube.position, 'x').min(-3).max(3).step(0.01).name('eje x');
// gui.add(cube.position, 'y').min(-3).max(3).step(0.01).name('eje y');
// gui.add(cube, 'visible');
// gui.add(material, 'wireframe');
// // add spin
// gui.add(parameters, 'spin');
// // debug colors
// gui.addColor(parameters, 'color').onChange(() => {
//   material.color.set(parameters.color);
// })

// adding camera
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);
camera.position.z = 5;

// render objecrt
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// clock
// constclock = new THREE.Clock();

const controls = new OrbitControls(camera, renderer.domElement);

controls.enableDamping = true;
// animation
// gsap.to(cube.rotation, {rotation:27, x: 2, y: 2, z: 2, duration: 2, repeat: -1, ease: "strong.inOut"});

// animate object
function animate() {
  // clock
  // const elapsedTime = clock.getElapsedTime();

  requestAnimationFrame(animate);

  // camera.position.x = Math.sin(mouse.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(mouse.x * Math.PI * 2) * 3;
  // camera.position.y = mouse.y * 2;
  // camera.lookAt(cube.position);

  // camera.rotation.x += 0.01;
  // camera.rotation.y -= 0.01;
  // camera.lookAt(cube.position);

  controls.update();

  renderer.render(scene, camera);
}

animate();

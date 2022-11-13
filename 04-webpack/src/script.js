import './style.css'
import * as THREE from 'three';
import gsap from 'gsap';

// scene
const scene = new THREE.Scene();

// object
const geometry = new THREE.BoxGeometry( 1, 1, 1 );
const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
const cube = new THREE.Mesh( geometry, material );
scene.add( cube );

// adding camera
const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.position.z = 5;

// render objecrt
const renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

// clock
// constclock = new THREE.Clock();

// animation
gsap.to(cube.rotation, {rotation:27, x: 2, y: 2, z: 2, duration: 2, repeat: -1, ease: "strong.inOut"});

// animate object
function animate() {

    // clock
    // const elapsedTime = clock.getElapsedTime();


    requestAnimationFrame( animate );

    // camera.rotation.x += 0.01;
    // camera.rotation.y -= 0.01;
    // camera.lookAt(cube.position);

    renderer.render( scene, camera );
};

animate();
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import {GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as dat from "dat.gui";

const renderer = new THREE.WebGLRenderer();
const spaceship = new URL("../assets/spaceship.glb", import.meta.url);

renderer.setSize(window.innerWidth, window.innerHeight);

document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000,
);

const orbit = new OrbitControls(camera,renderer.domElement);    

const axesHelper = new THREE.AxesHelper(5);

scene.add(axesHelper);

camera.position.set(0,2,5);
orbit.update();

const boxGeometry = new THREE.BoxGeometry();
const boxMaterial = new THREE.MeshBasicMaterial({color:0x00FF00});
const box = new THREE.Mesh(boxGeometry,boxMaterial);
scene.add(box);

const planGeometry = new THREE.PlaneGeometry(10,10);
const planMaterial = new THREE.MeshBasicMaterial({
    color:0xffffff,
    side:THREE.DoubleSide
});
const plane = new THREE.Mesh(planGeometry,planMaterial);
scene.add(plane);

plane.rotation.x = -0.5*Math.PI;

const gridHelper = new THREE.GridHelper();
scene.add(gridHelper);

const gui = new dat.GUI();

const options = {
    boxColor:"#ffea00"
};

gui.addColor(options,'boxColor').onChange(function(e){
    box.material.color.set(e);
});


function animate(){
    box.rotation.x+=0.01;
    box.rotation.y+=0.01;
    renderer.render(scene,camera);
}

renderer.setAnimationLoop(animate);
import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//console.log("oi")

const scene = new THREE.Scene();

const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000); //FOV, Aspect Radio, dist mínima para ver e máxima

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera1.position.setZ(30);

renderer.render( scene , camera1 );


const geometry = new THREE.TorusGeometry(10,3,16,100)
const material = new THREE.MeshStandardMaterial({color:"yellow",})

const torus = new THREE.Mesh(geometry, material);


scene.add(torus)



const ambient = new THREE.AmbientLight("white")
scene.add(ambient)

let light = new THREE.DirectionalLight("yellow", 20);
scene.add(light); 

const gridHelper = new THREE.GridHelper(200,50)
scene.add(gridHelper)


const controls = new OrbitControls(camera1, renderer.domElement);

function addStar(){
  const geometry = new THREE.SphereGeometry(0.25, 24, 24);
  const material = new THREE.MeshStandardMaterial({color:"white"})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z)
  scene.add(star)

}

//Array(500).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load("images/espaco.jpg")
scene.background = spaceTexture


let model;
const loader = new GLTFLoader();
loader.load('models/cat/scene.gltf',
  function (gltf) {
    model = gltf.scene;
    scene.add(model);

  },
  undefined,
  function (error) {
    console.error(error);
  }
);

document.getElementById("x-rotation").value = 1
document.getElementById("y-rotation").value = 1



function animate() {
  requestAnimationFrame(animate);
  
  var Xspeed=parseFloat(document.getElementById("x-rotation").value) / 100
  var Yspeed=parseFloat(document.getElementById("y-rotation").value) / 100
  //var Zspeed=parseFloat(document.getElementById("z-rotation").value) / 100

  torus.rotation.x += Xspeed
  torus.rotation.y += Yspeed
  torus.rotation.z += 0

  controls.update()

  renderer.render(scene, camera1);
}



animate()
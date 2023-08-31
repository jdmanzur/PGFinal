import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//console.log("oi")


const scene = new THREE.Scene();
//setando a cor do fundo da cena para uma cor escura
scene.background = new THREE.Color('#11002D');


const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000); //FOV, Aspect Radio, dist mínima para ver e máxima

const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
})

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

camera1.position.setZ(30);

renderer.render( scene , camera1 );


const geometry = new THREE.TorusGeometry(10, 0.15, 80, 100, Math.PI * 3)
const material = new THREE.MeshStandardMaterial({color:"yellow",})

const torus = new THREE.Mesh(geometry, material);

scene.add(torus)



const ambient = new THREE.AmbientLight("white")
scene.add(ambient)

let light = new THREE.DirectionalLight("white", 20);
scene.add(light); 

//[!] Descomentar para adicionar a grid à cena
//const gridHelper = new THREE.GridHelper(200,50)
//scene.add(gridHelper)


const controls = new OrbitControls(camera1, renderer.domElement);

function addStar(){
  const predefinedColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
  const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

  const geometry = new THREE.SphereGeometry(0.125, 24, 24);

  const material = new THREE.MeshStandardMaterial({color:randomColor})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z)
  scene.add(star)

}

Array(500).fill().forEach(addStar)



const planetMaterial =  new THREE.MeshPhongMaterial({
  color: 0xF66120,
  emissive: 0xF66120,
  specular: 0xFFED22,
  shininess: 10,
  transparent: 1,
  opacity: 0.5,
  wireframe: true,

});



let model;
const loader = new GLTFLoader();
loader.load('models/cat/scene.gltf',
  function (gltf) {
    model = gltf.scene;

  
    
    model.traverse((node) => {
      if (node.isMesh) {
        // Assuming each mesh has a material
        node.material = material;
        node.material.needsUpdate = true;
      }
    });



  const sun = new THREE.Mesh(new THREE.IcosahedronGeometry(7, 1), planetMaterial);
  sun.position.copy(model.position);
  const offset = new THREE.Vector3(-1, 1, 1); 
  sun.position.add(offset);
  
  scene.add(sun);

  scene.add(model)
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

document.getElementById("x-rotation").value = 1
document.getElementById("y-rotation").value = 1





//const geometry2 = new THREE.SphereGeometry(2, 10, 6)
//const material2 = new THREE.MeshStandardMaterial({color:"blue",})
const colorTransitionShader = `
  precision highp float;
  varying vec2 vUv;
  uniform float transition;

  void main() {
    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), transition);
    gl_FragColor = vec4(color, 1.0);
  }
`;

const customMaterial = new THREE.RawShaderMaterial({
  vertexShader: `
    precision highp float;
    attribute vec3 position;
    attribute vec2 uv; // Add this line
    varying vec2 vUv;
    uniform mat4 modelViewMatrix;
    uniform mat4 projectionMatrix;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: colorTransitionShader,
  uniforms: {
    transition: { value: 0.0 }
  }
});

const geometry2 = new THREE.SphereGeometry(1, 32, 32);
const esfera = new THREE.Mesh(geometry2, customMaterial);
//scene.add(mesh);

scene.add(esfera)


const ringGeometry = new THREE.RingGeometry( 15, 17, 4, 1, 0, Math.PI * 2 );

const ringmaterial =  new THREE.MeshPhongMaterial({
  color: 0xF66120,
  emissive: 0xF66120,
  specular: 0xFFED22,
  shininess: 10,
  transparent: 1,
  opacity: 0.5,
  wireframe: true,

});

const ring = new THREE.Mesh(ringGeometry, ringmaterial);

scene.add(ring)


//model.traverse( ( object ) => {
//  if ( object.isMesh ) object.material = customMaterial;
//} );

//scene.add(model);
const radius = 15; // Adjust the radius as needed

function animate() {
  requestAnimationFrame(animate);
  
  var Xspeed=parseFloat(document.getElementById("x-rotation").value) / 100
  var Yspeed=parseFloat(document.getElementById("y-rotation").value) / 100
  //var Zspeed=parseFloat(document.getElementById("z-rotation").value) / 100

//  torus.rotation.x += Xspeed
  torus.rotation.y += Yspeed
  torus.rotation.z += 0


  const angle = (Xspeed/10) * Date.now(); // Use time for smooth rotation
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  esfera.position.set(x, y, 0);
  esfera.rotation.y += Yspeed;

  ring.rotation.x -= Xspeed
 // ring.rotation.y -= Yspeed/2
  ring.rotation.z = 0
  
  customMaterial.uniforms.transition.value = (Math.sin(performance.now() * 0.001) + 1.0) * 0.5; // Smoothly transition between 0 and 1

  controls.update()

  renderer.render(scene, camera1);
}



animate()
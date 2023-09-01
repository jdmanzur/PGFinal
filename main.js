import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

//console.log("oi")



//Criando a cena 
const scene = new THREE.Scene();
//setando a cor do fundo da cena para uma cor escura
scene.background = new THREE.Color('#11002D');


//Criando a primeira camera
const camera1 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000); //FOV, Aspect Radio, dist mínima para ver e máxima

//Criando a segunda camera que vai orbitar em volta do gato
const camera2 = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1 , 1000);

//Variável auxiliar para manter as duas câmeras 
var cameras=[camera1, camera2];

//Usado para selecional qual câmera vamos usar
var selectCamera=0;

//Renderizando no canvas de id bg
const renderer = new THREE.WebGLRenderer({
  canvas : document.querySelector('#bg'),
})

//Configurações do renderer
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

//Posicionando inicialmente as cameras 
camera1.position.setZ(30);
camera2.position.setZ(30);

//Criando o anel que vai orbitar o gato 
const geometry = new THREE.TorusGeometry(10, 0.15, 80, 100, Math.PI * 3)
const material = new THREE.MeshStandardMaterial({color:"yellow",})

const torus = new THREE.Mesh(geometry, material);

scene.add(torus)

//

// Adicionando luz no ambiente 
const ambient = new THREE.AmbientLight("white")
scene.add(ambient)

let light = new THREE.DirectionalLight("white", 20);
scene.add(light); 

//[!] DEV [!] Descomentar para adicionar a grid à cena
//const gridHelper = new THREE.GridHelper(200,50)
//scene.add(gridHelper)


//Função que vai adicionar estrelas ao espaço
function addStar(){
  //Vetor de cores pre determinadas 
  const predefinedColors = [0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ffff];
  const randomColor = predefinedColors[Math.floor(Math.random() * predefinedColors.length)];

  // Adicionando esferas para simular estrelas 
  const geometry = new THREE.SphereGeometry(0.125, 24, 24);

  const material = new THREE.MeshStandardMaterial({color:randomColor})
  const star = new THREE.Mesh(geometry, material)

  const [x,y,z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread(100));

  star.position.set(x,y,z)
  scene.add(star)
  //
}

//Adicionando 500 estrelas no espaço 
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


//Carregando o gltf do gato na cena
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


  //Icosaedro cujo qual o gato está contido 
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

let tankModel;
let tankAngle = Math.PI;
loader.load('models/tanque.gltf',
  function (gltf) {
    tankModel = gltf.scene;
    tankModel.scale.x = tankModel.scale.y = tankModel.scale.z = 0.25
    tankModel.position.x += 10
    scene.add(tankModel);
  },
  undefined,
  function (error) {
    console.error(error);
  }
);

//Setando valores padrões para os sliders de rotação na tela principal
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
const radius = 15;

//Variável auxiliar para setar rotação da camera2
var cameraAngle = 0;


//Adicionando controle de mouse na camera 1
const controls = new OrbitControls(camera1, renderer.domElement);


function animate() {
  requestAnimationFrame(animate);

  console.log(selectCamera)

  //Renderizando a camera selecionada 
  renderer.render( scene , cameras[selectCamera] );
  renderer.setCamera  = cameras[selectCamera];


  //Usando valor dos sliders para definir rotação dos anéis 
  var Xspeed=parseFloat(document.getElementById("x-rotation").value) / 100
  var Yspeed=parseFloat(document.getElementById("y-rotation").value) / 100
  //var Zspeed=parseFloat(document.getElementById("z-rotation").value) / 100

//  torus.rotation.x += Xspeed
  torus.rotation.y += Yspeed
  torus.rotation.z += 0

  tankModel.position.x = Math.cos(tankAngle) * 10
  tankModel.position.z = Math.sin(tankAngle) * 10
  tankModel.rotation.y = -tankAngle
  tankAngle += Math.PI / 120

  //Fazendo o planeta envolta do gato orbitar
  const angle = (Xspeed/10) * Date.now(); // Use time for smooth rotation
  const x = Math.cos(angle) * radius;
  const y = Math.sin(angle) * radius;

  esfera.position.set(x, y, 0);
  esfera.rotation.y += Yspeed;


  ring.rotation.x -= Xspeed
 // ring.rotation.y -= Yspeed/2
  ring.rotation.z = 0
  
  customMaterial.uniforms.transition.value = (Math.sin(performance.now() * 0.001) + 1.0) * 0.5; // Smoothly transition between 0 and 1

  
  // Fazendo a camera2 girar em volta do gato
    camera2.position.x = radius * Math.cos( cameraAngle );  
    camera2.position.z = radius * Math.sin( cameraAngle );
    cameraAngle += 0.003;

    camera2.lookAt(model.position)
  
  
    controls.update()
  


  //renderer.render(scene, camera1);
}


//Quando a função troca camera é chamada, essa função seta qual camera será selecionada
// 0 - camera1
// 1 - camera2
function changeCamera()
{
  selectCamera = (selectCamera + 1) % 2;

}


//Atrelando a função no botão
var button = document.getElementById("cameraButton");
button.onclick = changeCamera;


animate()

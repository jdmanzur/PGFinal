import './style.css'
import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls'
console.log("oi")

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

const pointLight = new THREE.PointLight(0xffffff)

pointLight.position.set(2,2,2)

scene.add(pointLight)

const ambient = new THREE.AmbientLight("#ffffff")
scene.add(ambient)

const lightHelper = new THREE.PointLightHelper(pointLight)
scene.add(lightHelper)

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

Array(500).fill().forEach(addStar)


const spaceTexture = new THREE.TextureLoader().load("images/espaco.jpg")
scene.background = spaceTexture



function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  controls.update()

  renderer.render(scene, camera1);
}



animate()
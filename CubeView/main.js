import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// Setup basic scene, camera, and renderer
const scene = new THREE.Scene();
// Deep sleek dark blue background matching the HTML #0f172a
const bgColor = new THREE.Color('#0f172a');
scene.background = bgColor;
scene.fog = new THREE.FogExp2(bgColor, 0.05);

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(3, 2, 4);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // Softer shadows
document.body.appendChild(renderer.domElement);

// Smooth OrbitControls for rotating around the cube
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true; // smooth rotation
controls.dampingFactor = 0.05;
controls.autoRotate = true; // Slowly rotate when not interacting
controls.autoRotateSpeed = 2.0;
controls.enablePan = false;
controls.minDistance = 2;
controls.maxDistance = 10;

// Lighting Setup for dramatic and premium look
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight);

// Main directional light casting shadows
const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);
directionalLight.position.set(5, 8, 5);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
scene.add(directionalLight);

// Vibrant accent lights (Cyan and Pink)
const accentLight1 = new THREE.PointLight(0x06b6d4, 5, 20); // Cyan
accentLight1.position.set(-3, 2, 2);
scene.add(accentLight1);

const accentLight2 = new THREE.PointLight(0xf43f5e, 5, 20); // Pink/Rose
accentLight2.position.set(3, -2, -3);
scene.add(accentLight2);

// Central Cube with modern physical material
const geometry = new THREE.BoxGeometry(2, 2, 2);
// Slightly round the edges by using a BoxGeometry with segments or a rounded box, 
// but standard BoxGeometry is fine with standard physical materials and a subtle roughness
const material = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: 0.1,
    metalness: 0.8,
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
});

const cube = new THREE.Mesh(geometry, material);
cube.castShadow = true;
cube.receiveShadow = true;
scene.add(cube);

// Adding a subtle floor to receive shadows
const floorGeometry = new THREE.PlaneGeometry(50, 50);
const floorMaterial = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.8,
    metalness: 0.2
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.rotation.x = -Math.PI / 2;
floor.position.y = -1.5;
floor.receiveShadow = true;
scene.add(floor);

// Background Grid for spatial reference
const gridHelper = new THREE.GridHelper(50, 50, 0x1e293b, 0x1e293b);
gridHelper.position.y = -1.49;
gridHelper.material.opacity = 0.5;
gridHelper.material.transparent = true;
scene.add(gridHelper);

// Auto-resize handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Render Loop
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    
    // Gently hover the cube for dynamic feel
    const time = clock.getElapsedTime();
    cube.position.y = Math.sin(time * 2) * 0.1;
    
    // Required if controls.enableDamping or controls.autoRotate are set
    controls.update();

    renderer.render(scene, camera);
}

animate();

import * as THREE from 'three';
import {OrbitControls} from 'three/examples/jsm/controls/OrbitControls';

const generateScene = (parameters) => {
  const {canvas, image} = parameters;
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(
      70,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
  );

  const renderer = new THREE.WebGLRenderer({canvas: canvas, antialias: true});
  renderer.setSize(window.innerWidth, window.innerHeight);
  // Append canvas to DOM
  document.body.appendChild(renderer.domElement);
  scene.background = new THREE.Color( 0xffffff );

  new OrbitControls( camera, renderer.domElement );

  let imageHolder;
  const loader = new THREE.TextureLoader();
  const texture = loader.load(image.src, () => {
    const imageHeight = texture.image.height;
    const imageWidth = texture.image.width;
    // Image holder
    const imageHolderGeometry = new THREE.BoxGeometry(
        imageWidth/1000, imageHeight/1000, 0.01);
    const material = new THREE.MeshBasicMaterial({map: texture});
    imageHolder = new THREE.Mesh(imageHolderGeometry, material);
    scene.add(imageHolder);
  });
  // TODO: Add controls
  camera.position.z = 5;

  const animate = function() {
    requestAnimationFrame(animate);

    if (imageHolder) {
      // imageHolder.rotation.x += 0.01;
      imageHolder.rotation.y += 0.01;
    }

    renderer.render(scene, camera);
  };

  animate();
};

export default generateScene;

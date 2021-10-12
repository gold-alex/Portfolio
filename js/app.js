import * as THREE from "../assets/three.module.js";
import { OrbitControls } from "../assets/OrbitControls.js";
import { OBJLoader } from "../assets/OBJLoader.js";

let container;

let camera, scene, renderer, controls;

var sizeX = 600,
  sizeY = 600;

let object;

init();
animate();

var percentComplete;

function init() {
  var puthere = document.getElementById("brain");
  container = document.createElement("div");
  puthere.appendChild(container);

  camera = new THREE.PerspectiveCamera(45, window.innerWidth /window.innerHeight , 1, 2000);
  camera.position.set(0, 5, 10);
  // scene

  scene = new THREE.Scene();

  const ambientLight = new THREE.AmbientLight(0x880808, 0.9);
  scene.add(ambientLight);

  const pointLight = new THREE.PointLight(0xffffff, 0.8);
  camera.add(pointLight);
  scene.add(camera);

  // manager

  function loadModel() {
    object.traverse(function (child) {
      if (child.isMesh) child.material.map = texture;
    });

    scene.add(object);
  }

  const manager = new THREE.LoadingManager(loadModel);

  manager.onProgress = function (item, loaded, total) {
    console.log(item, loaded, total);
    progress();
  };

  // texture

  const textureLoader = new THREE.TextureLoader(manager);
  const texture = textureLoader.load("./obj/brain.jpg");

  // model

  function onProgress(xhr) {
    percentComplete = (xhr.loaded / xhr.total) * 100;
    if (xhr.lengthComputable) {
      console.log("model " + Math.round(percentComplete, 2) + "% downloaded");
    }
  }

  function onError() {}

  function progress() {
    const progressbar = document.querySelector(".progress");

    const changeProgress = (progress) => {
      progressbar.style.width = `${percentComplete}%`;
    };
    /* change progress after 1 second (only for showcase) */
    setTimeout(() => changeProgress(100), 1000);
  }

  const loader = new OBJLoader(manager);
  loader.load(
    "./obj/freesurff.Obj",
    function (obj) {
      object = obj;
    },
    onProgress,
    onError
  );

  renderer = new THREE.WebGLRenderer({});
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
  container.appendChild(renderer.domElement);

  //loading bar

  // controls

  controls = new OrbitControls(camera, renderer.domElement);
  //    controls.listenToKeyEvents(window); // optional

  //controls.addEventListener( 'change', render ); // call this only in static scenes (i.e., if there is no animation loop)
  controls.minDistance = 10;
  controls.maxDistance = 80;

  //

  window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
  camera.aspect = sizeX / sizeY;
  camera.updateProjectionMatrix();

}

//

function animate() {
  requestAnimationFrame(animate);
  controls.update();
  render();
}

function render() {
  //camera.position.x += ( mouseX - camera.position.x ) * .05;
  //camera.position.y += ( - mouseY - camera.position.y ) * .05;

  // object.rotation.x += (0.2*(Math.PI / 180));
  // object.rotation.x %=360;

  camera.lookAt(scene.position);

  renderer.render(scene, camera);
}

var container;
var camera, scene, renderer, controls;
var directionalLight;

var mouseX = 0,
    mouseY = 0;


var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var brain;

init();
animate();


function init() {

    var puthere = document.getElementById("brain");
    container = document.createElement('div');



    puthere.appendChild(container);

    // const aspect = container.clientWidth / container.clientHeight;

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 2000);
    // camera = new THREE.PerspectiveCamera(45, aspect, 1, 2000);
    camera.position.z = -10;





    scene = new THREE.Scene();

    //This light globally illuminates all objects in the scene equally.
    var ambient = new THREE.AmbientLight(0x880808, 0.8);
    camera.add(ambient);
    scene.add(ambient);

    //A light that gets emitted in a specific direction.
    directionalLight = new THREE.DirectionalLight(0xf2aeb1);
    directionalLight.position.set(0, 0, -1);
    scene.add(directionalLight);

    //background
    //scene.background = new THREE.Color(0xffffff);


    var manager = new THREE.LoadingManager();
    manager.onProgress = function(item, loaded, total) {

        console.log(item, loaded, total);

    };

    var loader = new THREE.OBJLoader(manager);
    loader.load('/obj/freesurff.OBJ', function(object) {
        brain = object;
        object.position.y = 0;
        scene.add(object);
    });




    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(500, 500);
    //renderer.setSize(container.clientWidth, container.clientHeight);


    container.appendChild(renderer.domElement);


    /*
        mouseX = 0;
        mouseY = 0;
        var mouseDown = false
        document.addEventListener('mousedown', function(event) {
            event.preventDefault();
            mouseDown = true;
            mouseX = event.clientX;
            mouseY = event.clientY;
        }, false);

        document.addEventListener('mousemove', function(event) {
            if (!mouseDown) { return } // is the button pressed?
            event.preventDefault();
            var deltaX = event.clientX - mouseX;
            var deltaY = event.clientY - mouseY;
            mouseX = event.clientX;
            mouseY = event.clientY;
            brain.rotation.y += deltaX / 100;
            brain.rotation.x += deltaY / 100;
        }, false);
        document.addEventListener('mouseup', function(event) {
            event.preventDefault();
            mouseDown = false;
        }, false);*/

    // document.addEventListener( 'mousemove', onDocumentMouseMove, false );

    window.addEventListener('resize', onWindowResize, false);

}

function onWindowResize() {
    windowHalfX = window.innerWidth / 3;
    windowHalfY = window.innerHeight / 3;
    renderer.setSize(windowHalfX, windowHalfY);
    return
}

// function onDocumentMouseMove( event ) {
//     mouseX = ( event.clientX - windowHalfX ) / 2;
//     mouseY = ( event.clientY - windowHalfY ) / 2;
// }

//





function animate() {
    requestAnimationFrame(animate);
    render();
}

function render() {

    var r = 7;
    var s = 0.01;

    camera.position.x = r * Math.sin(mouseX * s) * Math.cos(mouseY / 2 * s);
    camera.position.z = -r * Math.cos(mouseX * s) * Math.cos(mouseY / 2 * s);
    camera.position.y = r * Math.sin(mouseY / 2 * s);

    directionalLight.position.x = r * Math.sin(mouseX * s) * Math.cos(mouseY / 2 * s);
    directionalLight.position.z = -r * Math.cos(mouseX * s) * Math.cos(mouseY / 2 * s);
    directionalLight.position.y = r * Math.sin(mouseY / 2 * s);

    //brain.rotation.y += 0.01;
    //brain.rotation.x += 0.001;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}
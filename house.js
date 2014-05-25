var container;

var camera, scene, renderer, controls;

var group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var brickTexture = new THREE.ImageUtils.loadTexture('bricks.jpg');
brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(2, 2);
var brickMaterial = new THREE.MeshBasicMaterial({map: brickTexture, side: THREE.DoubleSide});

var roofTexture = new THREE.ImageUtils.loadTexture('roof.jpg');
roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(2, 2);
var roofMaterial = new THREE.MeshBasicMaterial({map: roofTexture, side: THREE.DoubleSide});

init();
animate();

function init() {
    scene = new THREE.Scene();

    container = document.createElement('div');
    document.body.appendChild(container);

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 1000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 150, 200);
    camera.lookAt(scene.position);

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xffffff);
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Floor
    var floorTexture = new THREE.ImageUtils.loadTexture('checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshBasicMaterial({ map: floorTexture, side: THREE.DoubleSide });
    var floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    group = new THREE.Object3D();
    scene.add(group);

    createWalls();
    createRoof();

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
}

function onDocumentKeyDown(event) {
    if (event.keyCode == 16)
        controls.enabled = false;
}

function onDocumentKeyUp(event) {
    if (event.keyCode == 16)
        controls.enabled = true;
}

function onDocumentMouseDown(event) {

    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

    }

}

function createWalls() {
    var geometry = new THREE.PlaneGeometry(40, 3, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 1.5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(40, 3, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 10;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(10, 5.5, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(10, 5.5, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    mesh.position.x = 15;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(10, 5.5, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    mesh.position.x = -15;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(10, 3, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 1.5;
    mesh.position.x = 20;
    mesh.position.z = 5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(10, 3, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 10;
    mesh.position.x = 20;
    mesh.position.z = 5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(3, 5.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    mesh.position.x = 20;
    mesh.position.z = 5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(1, 5.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    mesh.position.x = 20;
    mesh.position.z = 0.5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(1, 5.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    mesh.position.x = 20;
    mesh.position.z = 9.5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(10, 11.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 5.75;
    mesh.position.x = -20;
    mesh.position.z = 5;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(40, 6.5, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 8.25;
    mesh.position.z = 10;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(30, 5.25, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 2.5;
    mesh.position.x = 5;
    mesh.position.z = 10;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(6, 5.25, 10, 10);
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 2.5;
    mesh.position.x = -17;
    mesh.position.z = 10;
    group.add(mesh);
}

function createRoof() {
    var geometry = new THREE.PlaneGeometry(40, 8.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    var mesh = new THREE.Mesh(geometry, roofMaterial);
    mesh.position.z = 2;
    mesh.position.y = 13.75;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(40, 8.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 4));
    var mesh = new THREE.Mesh(geometry, roofMaterial);
    mesh.position.z = 8;
    mesh.position.y = 13.75;
    group.add(mesh);

    var geometry = new THREE.Geometry();
    v1 = new THREE.Vector3(0, 0, 0);
    v2 = new THREE.Vector3(10, 0, 0);
    v3 = new THREE.Vector3(5, 5, 0);

    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);

    geometry.faces.push(new THREE.Face3(0, 1, 2));
    geometry.computeFaceNormals();
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({map: brickTexture, side: THREE.DoubleSide}));
    mesh.position.y = 11.5;
    mesh.position.z = 0;
    mesh.position.x = 20;
    group.add(mesh);

    var mesh = new THREE.Mesh(geometry, new THREE.MeshNormalMaterial({map: brickTexture, side: THREE.DoubleSide}));
    mesh.position.y = 11.5;
    mesh.position.z = 0;
    mesh.position.x = -20;
    group.add(mesh);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    if (controls.enabled == false)
        group.position.x += ( targetRotation - group.rotation.y ) * 0.5;
    renderer.render(scene, camera);
}

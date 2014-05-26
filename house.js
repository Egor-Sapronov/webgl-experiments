var container;

var camera, scene, renderer, controls, light, dirLight, hemiLight;

var group;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;
var pointLight;
var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

var brickTexture = new THREE.ImageUtils.loadTexture('bricks.jpg');
brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(2, 2);
var brickMaterial = new THREE.MeshLambertMaterial({map: brickTexture, side: THREE.DoubleSide, ambient: 0x555555, specular: 0xffffff, shininess: 50, shading: THREE.SmoothShading });

var wallTexture = new THREE.ImageUtils.loadTexture('wall.jpg');
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(2, 2);
var wallMaterial = new THREE.MeshLambertMaterial({map: wallTexture, side: THREE.BackSide, shading: THREE.FlatShading});

var roofTexture = new THREE.ImageUtils.loadTexture('roof.jpg');
roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(2, 2);
var roofMaterial = new THREE.MeshLambertMaterial({map: roofTexture, side: THREE.DoubleSide, shading: THREE.FlatShading});

var woodTexture = new THREE.ImageUtils.loadTexture('wood.jpg');
woodTexture.wrapS = woodTexture.wrapT = THREE.RepeatWrapping;
woodTexture.repeat.set(2, 2);
var woodMaterial = new THREE.MeshLambertMaterial({map: woodTexture, side: THREE.DoubleSide, shading: THREE.FlatShading});


init();
animate();

function init() {
    scene = new THREE.Scene();

    container = document.createElement('div');
    document.body.appendChild(container);

    // CAMERA
    var SCREEN_WIDTH = window.innerWidth, SCREEN_HEIGHT = window.innerHeight;
    var VIEW_ANGLE = 45, ASPECT = SCREEN_WIDTH / SCREEN_HEIGHT, NEAR = 0.1, FAR = 10000;
    camera = new THREE.PerspectiveCamera(VIEW_ANGLE, ASPECT, NEAR, FAR);
    camera.position.set(0, 50, 200);
    camera.lookAt(scene.position);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);

    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);

    // Floor
    var floorTexture = new THREE.ImageUtils.loadTexture('checkerboard.jpg');
    floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
    floorTexture.repeat.set(10, 10);
    var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.DoubleSide, ambient: 0xffffff, color: 0xffffff, specular: 0x050505   });
    var floorGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
    var floor = new THREE.Mesh(floorGeometry, floorMaterial);
    floor.position.y = 0;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    group = new THREE.Object3D();
    scene.add(group);

    light = new THREE.PointLight(0xff0040, 2, 50);
    scene.add(light);
    var sphere = new THREE.SphereGeometry(0.5, 16, 8);

    var l1 = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xff0040 }));
    l1.position = light.position;
    scene.add(l1);

    createWalls();
    createRoof();
    createTable();

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
}

function createTable() {
    var geometry = new THREE.BoxGeometry(7, 0.2, 5);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 3;
    mesh.position.z = 2.5;
    group.add(mesh);

    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 1;
    mesh.position.x = 2;
    group.add(mesh);
    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 1;
    mesh.position.x = -2;
    group.add(mesh);

    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 4;
    mesh.position.x = 2;
    group.add(mesh);
    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 4;
    mesh.position.x = -2;
    group.add(mesh);
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
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide, opacity: 0.3 });
    var material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide, opacity: 0.0 });
    var materials = [
        material,
        brickMaterial,
        wallMaterial,
        material2
    ];

    // Back wall with 2 windows
    var geometry = new THREE.PlaneGeometry(40, 10, 10, 10);
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }

    for (var i = 44; i <= 134; i += 10) {
        geometry.faces[i].materialIndex=0;
        geometry.faces[i+1].materialIndex=0;
    }

    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z = 10;
    group.add(mesh);

    // Front wall with door
    var geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }

    for (var i = 82; i <= 182; i += 20) {
        geometry.faces[i].materialIndex=3;
        geometry.faces[i+1].materialIndex=3;
        geometry.faces[i+2].materialIndex=3;
        geometry.faces[i+3].materialIndex=3;
    }

    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z = 5;
    mesh.position.x = 20;
    group.add(mesh);

    // Wall
    var geometry = new THREE.PlaneGeometry(40, 10, 10, 10);
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
//    mesh.position.z=10;
    group.add(mesh);

    // Side wall with two windows
    var geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }

    for (var i = 42; i <= 132; i += 10) {
        geometry.faces[i].materialIndex=0;
        geometry.faces[i+1].materialIndex=0;
        geometry.faces[i+2].materialIndex=0;
        geometry.faces[i+3].materialIndex=0;
    }
    
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z = 5;
    mesh.position.x = -20;
    group.add(mesh);
}

function createRoof() {
    var geometry = new THREE.PlaneGeometry(40, 8.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    var mesh = new THREE.Mesh(geometry, roofMaterial);
    mesh.position.z = 2;
    mesh.position.y = 12.2;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(40, 8.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 4));
    var mesh = new THREE.Mesh(geometry, roofMaterial);
    mesh.position.z = 8;
    mesh.position.y = 12.2;
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
    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 10;
    mesh.position.z = 0;
    mesh.position.x = 20;
    group.add(mesh);

    var mesh = new THREE.Mesh(geometry, brickMaterial);
    mesh.position.y = 10;
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
    if (controls.enabled == false) {

        if (group.position.x < 30 && group.position.x > -30)
            group.position.x += ( targetRotation - group.position.y ) * 0.05;
        else {
            if (group.position.x >= 30)
                group.position.x = 29.999999;
            else
                group.position.x = -29.999999;
        }
    }
    var time = Date.now() * 0.0005;
    light.position.x = Math.sin(time * 0.7) * 30;
    light.position.y = Math.cos(time * 0.5) * 40;
    light.position.z = Math.cos(time * 0.3) * 30;

    renderer.render(scene, camera);
}

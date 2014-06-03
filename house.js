var container;

var camera, scene, renderer, controls, light;

var group;

var houseLight, pointLight, lamp;

var brickTexture = new THREE.ImageUtils.loadTexture('bricks.jpg');
brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(2, 2);
var brickMaterial = new THREE.MeshPhongMaterial({map: brickTexture, side: THREE.DoubleSide});

var wallTexture = new THREE.ImageUtils.loadTexture('wall.jpg');
wallTexture.wrapS = wallTexture.wrapT = THREE.RepeatWrapping;
wallTexture.repeat.set(2, 2);
var wallMaterial = new THREE.MeshPhongMaterial({map: wallTexture, side: THREE.BackSide});

var roofTexture = new THREE.ImageUtils.loadTexture('roof.jpg');
roofTexture.wrapS = roofTexture.wrapT = THREE.RepeatWrapping;
roofTexture.repeat.set(2, 2);
var roofMaterial = new THREE.MeshPhongMaterial({map: roofTexture, side: THREE.DoubleSide});

var woodTexture = new THREE.ImageUtils.loadTexture('wood.jpg');
var woodMaterial = new THREE.MeshPhongMaterial({map: woodTexture, side: THREE.DoubleSide});

var floorTexture = new THREE.ImageUtils.loadTexture('checkerboard.jpg');
floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
floorTexture.repeat.set(10, 10);
var floorMaterial = new THREE.MeshPhongMaterial({ map: floorTexture, side: THREE.DoubleSide, overdraw: 1 });

var grassTexture = new THREE.ImageUtils.loadTexture('grass.jpg');
var grassMaterial = new THREE.MeshPhongMaterial({map: grassTexture, side: THREE.DoubleSide, overdraw: 0});

var pictureTexture = new THREE.ImageUtils.loadTexture('picture.jpg');
var pictureMaterial = new THREE.MeshPhongMaterial({map: pictureTexture, side: THREE.FrontSide});

var worldTexture = new THREE.ImageUtils.loadTexture('world.jpg');
var worldMaterial = new THREE.MeshPhongMaterial({map: worldTexture, side: THREE.DoubleSide});


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

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(SCREEN_WIDTH, SCREEN_HEIGHT);
    renderer.shadowMapEnabled = true;
    renderer.shadowMapSoft = true;
    container.appendChild(renderer.domElement);

    controls = new THREE.OrbitControls(camera, renderer.domElement);


    group = new THREE.Object3D();
    group.position.z = -5;
    scene.add(group);

    //Lights
    createLights();
    createGround();
    createWalls();
    createRoof();
    createTable();
    createFloor();
    createPicture();
    createModel();
    createWorld();


    document.addEventListener('keydown', onDocumentKeyDown, false);
    document.addEventListener('keyup', onDocumentKeyUp, false);
    window.addEventListener('resize', onWindowResize, false);
}

var house, mouse_x;
function onMouseDown(event) {
    mouse_x = event.clientX;
    house = group;
}

function onMouseMove(event) {
    if (!house) return;

    var x_diff = event.clientX - mouse_x;
    house.__dirtyPosition = true;
    var newPosition = house.position.x + x_diff;
    if (newPosition < 480 && newPosition > -480) {
        house.position.x = newPosition;
        mouse_x = event.clientX;
    }

}

function onMouseUp(event) {
    house = false;
}

function createModel() {
    var loader = new THREE.STLLoader();
    loader.addEventListener('load', function (event) {

        var geometry = event.content;
        var material = new THREE.MeshPhongMaterial({ ambient: 0xff5533, color: 0xff5533, specular: 0x111111, shininess: 200 });
        var mesh = new THREE.Mesh(geometry, material);
        mesh.scale.set(0.05, 0.05, 0.05);
        mesh.position.y = 5.85;
        mesh.position.z = 1;
        mesh.position.x = 1;
        mesh.rotation.y = -Math.PI / 2;
        mesh.castShadow = true;
        mesh.receiveShadow = true;

        group.add(mesh);

    });
    loader.load('model/model.stl');
}
function createTable() {
    var geometry = new THREE.BoxGeometry(7, 0.2, 5);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 3;
    mesh.position.z = 2.5;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 1;
    mesh.position.x = 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 1;
    mesh.position.x = -2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 4;
    mesh.position.x = 2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
    var geometry = new THREE.BoxGeometry(0.2, 3, 0.2);
    var mesh = new THREE.Mesh(geometry, woodMaterial);
    mesh.position.y = 1.5;
    mesh.position.z = 4;
    mesh.position.x = -2;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
}
function createWalls() {
    var material = new THREE.MeshPhongMaterial({  side: THREE.DoubleSide, opacity: 0.3, transparent: true });
    var material2 = new THREE.MeshPhongMaterial({  side: THREE.DoubleSide, opacity: 0.0, transparent: true});
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
        geometry.faces[i].materialIndex = 0;
        geometry.faces[i + 1].materialIndex = 0;
    }

    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z = 10;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Front wall with door
    var geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }

    for (var i = 82; i <= 182; i += 20) {
        geometry.faces[i].materialIndex = 3;
        geometry.faces[i + 1].materialIndex = 3;
        geometry.faces[i + 2].materialIndex = 3;
        geometry.faces[i + 3].materialIndex = 3;
    }

    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z = 5;
    mesh.position.x = 20;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Wall
    var geometry = new THREE.PlaneGeometry(40, 10, 10, 10);
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
//    mesh.position.z = 10;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    // Side wall with two windows
    var geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex = 1;
    }

    for (var i = 42; i <= 132; i += 10) {
        geometry.faces[i].materialIndex = 0;
        geometry.faces[i + 1].materialIndex = 0;
        geometry.faces[i + 2].materialIndex = 0;
        geometry.faces[i + 3].materialIndex = 0;
    }

    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z = 5;
    mesh.position.x = -20;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
}
function createRoof() {
    var geometry = new THREE.PlaneGeometry(40, 8.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
    var mesh = new THREE.Mesh(geometry, roofMaterial);
    mesh.position.z = 2;
    mesh.position.y = 12;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    var geometry = new THREE.PlaneGeometry(40, 8.5, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 4));
    var mesh = new THREE.Mesh(geometry, roofMaterial);
    mesh.position.z = 8;
    mesh.position.y = 12;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    var geometry = new THREE.Geometry();
    v1 = new THREE.Vector3(0, 0, 0);
    v2 = new THREE.Vector3(10, 0, 0);
    v3 = new THREE.Vector3(5, 5, 0);
    geometry.vertices.push(v1);
    geometry.vertices.push(v2);
    geometry.vertices.push(v3);
    geometry.faces.push(new THREE.Face3(0, 1, 2));

    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));

    var triangleMaterial = new THREE.MeshPhongMaterial({
        color: 0xFFFFFF,
        side: THREE.DoubleSide
    });
    var mesh = new THREE.Mesh(geometry, triangleMaterial);
    mesh.position.y = 10;
    mesh.position.z = 0;
    mesh.position.x = 20;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    var mesh = new THREE.Mesh(geometry, triangleMaterial);
    mesh.position.y = 10;
    mesh.position.z = 0;
    mesh.position.x = -20;
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);
}
function createFloor() {
    var geometry = new THREE.PlaneGeometry(40, 10, 15, 15);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, floorMaterial);
    mesh.position.y = 0.2;
    mesh.position.z = 5;
    mesh.receiveShadow = true;

    group.add(mesh);
}
function createGround() {
    var geometry = new THREE.PlaneGeometry(1000, 1000, 10, 14);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 2));
    var mesh = new THREE.Mesh(geometry, grassMaterial);
    mesh.position.y = 0;
    mesh.receiveShadow = true;
    scene.add(mesh);
}
function createPicture() {
    var geometry = new THREE.PlaneGeometry(3, 4);
    var mesh = new THREE.Mesh(geometry, pictureMaterial);
    mesh.position.z = 0.1;
    mesh.position.y = 6;
    mesh.position.x = 6;
    group.add(mesh);
}
function createWorld() {
    var geomemtry = new THREE.BoxGeometry(1000, 1000, 1000)
    var mesh = new THREE.Mesh(geomemtry, worldMaterial);
    mesh.position.y = 400;
    scene.add(mesh);
}
function createLights() {
    var sunlight = new THREE.DirectionalLight(0xffffff, 0.6);
    sunlight.position.set(140, 100, 100);
    sunlight.castShadow = true;
    sunlight.shadowDarkness = 0.6;
    sunlight.shadowCameraNear = 100;
    sunlight.shadowCameraFar = 400;
    sunlight.shadowCameraLeft = -100;
    sunlight.shadowCameraRight = 100;
    sunlight.shadowCameraTop = 100;
    sunlight.shadowCameraBottom = -100;
    scene.add(sunlight);

    var sunlight2 = new THREE.DirectionalLight(0xffffff, 0.6);
    sunlight2.position.set(100, 200, -70);
    scene.add(sunlight2);

    var sunlight3 = new THREE.DirectionalLight(0xffffff, 0.6);
    sunlight3.position.set(-100, 200, 70);
    scene.add(sunlight3);

    houseLight = new THREE.SpotLight(0xffffff, 0.5);
    houseLight.position.set(0, 11, 3);
    houseLight.castShadow = true;
    houseLight.shadowDarkness = 0.5;
    houseLight.shadowCameraNear = 3;
    houseLight.shadowCameraFar = 12;
    houseLight.shadowCameraLeft = -3;
    houseLight.shadowCameraRight = 3;
    houseLight.shadowCameraTop = 3;
    houseLight.shadowCameraBottom = -3;
    group.add(houseLight);

    pointLight = new THREE.PointLight(0xffffff, 3, 20);
    pointLight.position = houseLight.position;
    group.add(pointLight);
    var sphere = new THREE.SphereGeometry(0.5, 16, 8);
    lamp = new THREE.Mesh(sphere, new THREE.MeshBasicMaterial({ color: 0xffffff }));
    lamp.position = houseLight.position;
    group.add(lamp);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function onDocumentKeyDown(event) {
    if (event.keyCode == 16) {
        controls.enabled = false;
        document.addEventListener('mousedown', onMouseDown, false);
        document.addEventListener('mouseup', onMouseUp, false);
        document.addEventListener('mousemove', onMouseMove, false);
    }


    if (event.keyCode == 32) {
        if (houseLight.intensity == 0) {
            houseLight.intensity = 0.5;
            pointLight.intensity = 3;
            lamp.visible = true;
        } else {
            houseLight.intensity = 0;
            pointLight.intensity = 0;
            lamp.visible = false;
        }
    }
}
function onDocumentKeyUp(event) {
    if (event.keyCode == 16) {
        controls.enabled = true;
        document.removeEventListener('mousedown', onMouseDown, false);
        document.removeEventListener('mousemove', onMouseMove, false);
        document.removeEventListener('mouseup', onMouseUp, false);
    }
}


function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

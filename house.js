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

var wallTexture=new THREE.ImageUtils.loadTexture('wall.jpg');
wallTexture.wrapS=wallTexture.wrapT=THREE.RepeatWrapping;
wallTexture.repeat.set(2,2);
var wallMaterial=new THREE.MeshBasicMaterial({map:wallTexture,side:THREE.BackSide});

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
    var material = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide,opacity:0.3 });
    var material2 = new THREE.MeshBasicMaterial({ color: 0x0000ff, side: THREE.DoubleSide,opacity:0.0 });
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
        geometry.faces[i].materialIndex=1;
    }
    geometry.faces[44].materialIndex=0;
    geometry.faces[45].materialIndex=0;
    geometry.faces[64].materialIndex=0;
    geometry.faces[65].materialIndex=0;
    geometry.faces[84].materialIndex=0;
    geometry.faces[85].materialIndex=0;
    geometry.faces[104].materialIndex=0;
    geometry.faces[105].materialIndex=0;
    geometry.faces[124].materialIndex=0;
    geometry.faces[125].materialIndex=0;
    geometry.faces[54].materialIndex=0;
    geometry.faces[55].materialIndex=0;
    geometry.faces[74].materialIndex=0;
    geometry.faces[75].materialIndex=0;
    geometry.faces[94].materialIndex=0;
    geometry.faces[95].materialIndex=0;
    geometry.faces[114].materialIndex=0;
    geometry.faces[115].materialIndex=0;
    geometry.faces[134].materialIndex=0;
    geometry.faces[135].materialIndex=0;
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    group.add(mesh);

    // Front wall with door
    var geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex=1;
    }
    geometry.faces[82].materialIndex=3;
    geometry.faces[83].materialIndex=3;
    geometry.faces[102].materialIndex=3;
    geometry.faces[103].materialIndex=3;
    geometry.faces[122].materialIndex=3;
    geometry.faces[123].materialIndex=3;
    geometry.faces[142].materialIndex=3;
    geometry.faces[143].materialIndex=3;
    geometry.faces[162].materialIndex=3;
    geometry.faces[163].materialIndex=3;
    geometry.faces[182].materialIndex=3;
    geometry.faces[183].materialIndex=3;
    geometry.faces[84].materialIndex=3;
    geometry.faces[85].materialIndex=3;
    geometry.faces[104].materialIndex=3;
    geometry.faces[105].materialIndex=3;
    geometry.faces[124].materialIndex=3;
    geometry.faces[125].materialIndex=3;
    geometry.faces[144].materialIndex=3;
    geometry.faces[145].materialIndex=3;
    geometry.faces[164].materialIndex=3;
    geometry.faces[165].materialIndex=3;
    geometry.faces[184].materialIndex=3;
    geometry.faces[185].materialIndex=3;
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z=5;
    mesh.position.x=20;
    group.add(mesh);

    // Wall
    var geometry = new THREE.PlaneGeometry(40, 10, 10, 10);
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex=1;
    }
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z=10;
    group.add(mesh);

    // Side wall with two windows
    var geometry = new THREE.PlaneGeometry(10, 10, 10, 10);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
    var l = geometry.faces.length;
    for (var i = 0; i < l; i++) {
        geometry.faces[i].materialIndex=1;
    }
    geometry.faces[42].materialIndex=0;
    geometry.faces[43].materialIndex=0;
    geometry.faces[62].materialIndex=0;
    geometry.faces[63].materialIndex=0;
    geometry.faces[82].materialIndex=0;
    geometry.faces[83].materialIndex=0;
    geometry.faces[102].materialIndex=0;
    geometry.faces[103].materialIndex=0;
    geometry.faces[122].materialIndex=0;
    geometry.faces[123].materialIndex=0;
    geometry.faces[44].materialIndex=0;
    geometry.faces[45].materialIndex=0;
    geometry.faces[64].materialIndex=0;
    geometry.faces[65].materialIndex=0;
    geometry.faces[84].materialIndex=0;
    geometry.faces[85].materialIndex=0;
    geometry.faces[104].materialIndex=0;
    geometry.faces[105].materialIndex=0;
    geometry.faces[124].materialIndex=0;
    geometry.faces[125].materialIndex=0;

    geometry.faces[56].materialIndex=0;
    geometry.faces[57].materialIndex=0;
    geometry.faces[54].materialIndex=0;
    geometry.faces[55].materialIndex=0;
    geometry.faces[76].materialIndex=0;
    geometry.faces[77].materialIndex=0;
    geometry.faces[74].materialIndex=0;
    geometry.faces[75].materialIndex=0;
    geometry.faces[96].materialIndex=0;
    geometry.faces[97].materialIndex=0;
    geometry.faces[94].materialIndex=0;
    geometry.faces[95].materialIndex=0;
    geometry.faces[116].materialIndex=0;
    geometry.faces[117].materialIndex=0;
    geometry.faces[114].materialIndex=0;
    geometry.faces[115].materialIndex=0;
    geometry.faces[136].materialIndex=0;
    geometry.faces[137].materialIndex=0;
    geometry.faces[134].materialIndex=0;
    geometry.faces[135].materialIndex=0;
    var mesh = new THREE.Mesh(geometry, new THREE.MeshFaceMaterial(materials));
    mesh.position.y = 5;
    mesh.position.z=5;
    mesh.position.x=-20;
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
    if (controls.enabled == false) {

        if (group.position.x < 30 && group.position.x > -30)
            group.position.x += ( targetRotation - group.position.y ) * 0.05;
        else {
            if (group.position.x >= 30)
                group.position.x = 29;
            else
                group.position.x = -29;
        }
    }

    renderer.render(scene, camera);
}

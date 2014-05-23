var container;

var camera, scene, renderer, controls;

var cube, plane;

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerHeight / 2;
var windowHalfY = window.innerWidth / 2;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 100;
    camera.position.z = 100;
    camera.position.x=100;

    controls = new THREE.TrackballControls(camera);

    controls.rotateSpeed = 1.0;
    controls.zoomSpeed = 1.2;
    controls.panSpeed = 0.8;

    controls.noZoom = false;
    controls.noPan = false;

    controls.staticMoving = true;
    controls.dynamicDampingFactor = 0.3;

    controls.keys = [ 65, 83, 68 ];

    controls.addEventListener('change', render);

    scene = new THREE.Scene();


    function frontWall(x) {
        var geometry = new THREE.BoxGeometry(1, 10, 40);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 0;
        cube.position.x = x;
        scene.add(cube);

        var geometry = new THREE.BoxGeometry(1, 10, 40);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 20;
        cube.position.x = x;
        scene.add(cube);

        var geometry = new THREE.BoxGeometry(1, 10, 12);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 10;
        cube.position.z = 14;
        cube.position.x = x;
        scene.add(cube);

        var geometry = new THREE.BoxGeometry(1, 10, 12);
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 10;
        cube.position.z = -14;
        cube.position.x = x;
        scene.add(cube);
    }

    function wall() {
        var geometry = new THREE.BoxGeometry(1, 30, 50);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 10;
        cube.position.x = 25;
        cube.position.z = -20;
        scene.add(cube);
    }

    function wallWithDoor() {
        var geometry = new THREE.BoxGeometry(1, 10, 50);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 20;
        cube.position.x = 25;
        cube.position.z = 20;
        scene.add(cube);

        var geometry = new THREE.BoxGeometry(1, 20, 30);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 5;
        cube.position.x = 15;
        cube.position.z = 20;
        scene.add(cube);

        var geometry = new THREE.BoxGeometry(1, 20, 10);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = 5;
        cube.position.x = 45;
        cube.position.z = 20;
        scene.add(cube);
    }

    function floor(){
        var geometry = new THREE.BoxGeometry(1, 40, 50);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));
        for (var i = 0; i < geometry.faces.length; i += 2) {
            var hex = Math.random() * 0xffffff;
            geometry.faces[ i ].color.setHex(hex);
            geometry.faces[ i + 1 ].color.setHex(hex);
        }
        var material = new THREE.MeshBasicMaterial({vertexColors: THREE.FaceColors, overdraw: 0.5});
        cube = new THREE.Mesh(geometry, material);
        cube.position.y = -5;
        cube.position.x = 25;
        cube.position.z = 0;
        scene.add(cube);
    }

    function roof(){
        var geometry = new THREE.BoxGeometry(1,35,50);
        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 2));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 4));
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } );
        cube = new THREE.Mesh(geometry,material);
        cube.position.x=25;
        cube.position.y=36;
        cube.position.z=12;
        scene.add(cube);

        var geometry = new THREE.BoxGeometry(50,35,1);
//        geometry.applyMatrix(new THREE.Matrix4().makeRotationY(-Math.PI / 4));
        geometry.applyMatrix(new THREE.Matrix4().makeRotationX(Math.PI / 4));
//        geometry.applyMatrix(new THREE.Matrix4().makeRotationZ(-Math.PI / 2));
        var material = new THREE.MeshBasicMaterial( { color: 0xffffff, overdraw: 0.5 } );
        cube = new THREE.Mesh(geometry,material);
        cube.position.x=25;
        cube.position.y=36;
        cube.position.z=-12;
        scene.add(cube);
    }

    frontWall(0);
    frontWall(50);
    wall();
    wallWithDoor();
    floor();
    roof();

    renderer = new THREE.CanvasRenderer();
    renderer.setClearColor(0xf0f0f0);
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);
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

function animate() {
    requestAnimationFrame(animate);

    controls.update();
    render();
}

function render() {
//    cube.rotation.y += (targetRotation - cube.rotation.y) * 0.05;

    renderer.render(scene, camera);
}

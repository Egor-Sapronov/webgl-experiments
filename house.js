var container;

var camera, scene, renderer, controls;

var brickTexture = new THREE.ImageUtils.loadTexture('bricks.jpg');
brickTexture.wrapS = brickTexture.wrapT = THREE.RepeatWrapping;
brickTexture.repeat.set(10, 10);
var brickMaterial = new THREE.MeshBasicMaterial({map: brickTexture, side: THREE.DoubleSide});

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
    camera.position.set(0, 150, 400);
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
    floor.position.y = -0.5;
    floor.rotation.x = Math.PI / 2;
    scene.add(floor);

    createWallWithWindows(0);
    createWallWithWindows(100);
    createWallWithWithDoor(0);
    createWall(200);
}

function createWallWithWindows(z) {
    var vetricesArray = [
        [
            new THREE.Vector3(40, 40, z),
            new THREE.Vector3(0, 40, z),
            new THREE.Vector3(0, 100, z),
            new THREE.Vector3(40, 100, z)
        ],
        [
            new THREE.Vector3(60, 60, z),
            new THREE.Vector4(40, 60, z),
            new THREE.Vector3(40, 100, z),
            new THREE.Vector3(60, 100, z)
        ],
        [
            new THREE.Vector3(60, 40, z),
            new THREE.Vector3(60, 100, z),
            new THREE.Vector3(100, 100, z),
            new THREE.Vector3(100, 40, z)
        ],
        [
            new THREE.Vector3(0, 0, z),
            new THREE.Vector3(0, 40, z),
            new THREE.Vector3(100, 40, z),
            new THREE.Vector3(100, 0, z)
        ],
        [
            new THREE.Vector3(140, 40, z),
            new THREE.Vector3(100, 40, z),
            new THREE.Vector3(100, 100, z),
            new THREE.Vector3(140, 100, z)
        ],
        [
            new THREE.Vector3(160, 60, z),
            new THREE.Vector4(140, 60, z),
            new THREE.Vector3(140, 100, z),
            new THREE.Vector3(160, 100, z)
        ],
        [
            new THREE.Vector3(160, 40, z),
            new THREE.Vector3(160, 100, z),
            new THREE.Vector3(200, 100, z),
            new THREE.Vector3(200, 40, z)
        ],
        [
            new THREE.Vector3(100, 0, z),
            new THREE.Vector3(100, 40, z),
            new THREE.Vector3(200, 40, z),
            new THREE.Vector3(200, 0, z)
        ]
    ];

    addToScene(vetricesArray);
}

function createWallWithWithDoor(x) {
    var vetricesArray = [
        [
            new THREE.Vector3(x, 0, 0),
            new THREE.Vector3(x, 100, 0),
            new THREE.Vector3(x, 100, 20),
            new THREE.Vector3(x, 0, 20)
        ],
        [
            new THREE.Vector3(x, 40, 20),
            new THREE.Vector3(x, 100, 20),
            new THREE.Vector3(x, 100, 50),
            new THREE.Vector3(x, 40, 50)
        ],
        [
            new THREE.Vector3(x, 0, 50),
            new THREE.Vector3(x, 100, 50),
            new THREE.Vector3(x, 100, 100),
            new THREE.Vector3(x, 0, 100)
        ]
    ];

    addToScene(vetricesArray);
}

function createWall(x) {
    var vetricesArray = [
        [
            new THREE.Vector3(x, 0, 0),
            new THREE.Vector3(x, 100, 0),
            new THREE.Vector3(x, 100, 100),
            new THREE.Vector3(x, 0, 100)
        ]
    ];

    addToScene(vetricesArray);
}

function addToScene(vetricesArray) {
    vetricesArray.forEach(function (item) {
        var geometry = createPlane(item);
        var mesh = new THREE.Mesh(geometry, brickMaterial);
        scene.add(mesh);
    });
}

function createPlane(vetrices) {
    var geometry = new THREE.Geometry();
    vetrices.forEach(function (item) {
        geometry.vertices.push(item);
    });
    for (var x = 0; x < vetrices.length-2; x++) {
        geometry.faces.push(new THREE.Face3(0, x + 1, x + 2));
    }
    geometry.computeBoundingSphere();
    return geometry;
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    render();
}

function render() {
    renderer.render(scene, camera);
}

var camera, scene, renderer, container, car;

var width = 1000, height = 600;

var move = moveRight, way = 'right', lastWay;

function moveRight() {
    car.position.x += 1;
}

function moveLeft() {
    car.position.x -= 1;
}

function moveStop() {
    car.position.x = car.position.x;
}

init();
animate();

function init() {
    scene = new THREE.Scene();

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 500);
    camera.position.set(0, 50, 200);
    camera.lookAt(scene.position);

    car = new THREE.Object3D();
    scene.add(car);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);

    // Ground
    var geometry = new THREE.PlaneGeometry(1000, 200);
    var material = new THREE.MeshBasicMaterial({color: 0x000000});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -220;
    scene.add(mesh);

    // House
    var geometry = new THREE.PlaneGeometry(400, 200);
    var material = new THREE.MeshBasicMaterial({color: 0x030040});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -150;
    mesh.position.y = -30;
    scene.add(mesh);
    var geometry = new THREE.PlaneGeometry(100, 160);
    var material = new THREE.MeshBasicMaterial({color: 0x837040});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -200;
    mesh.position.y = -30;
    mesh.position.z = 2;
    scene.add(mesh);
    var geometry = new THREE.PlaneGeometry(100, 160);
    var material = new THREE.MeshBasicMaterial({color: 0x837040});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.x = -80;
    mesh.position.y = -30;
    mesh.position.z = 2;
    scene.add(mesh);

    createCar();

    document.addEventListener('keydown', onDocumentKeyDown, false);
}

function createCar() {
    // Body
    var geometry = new THREE.PlaneGeometry(200, 60);
    var material = new THREE.MeshBasicMaterial({color: 0x822942});
    var mesh = new THREE.Mesh(geometry, material);
    mesh.position.y = -30;
    mesh.position.z = 4;
    car.add(mesh);

    // Wheel
    var geometry = new THREE.CircleGeometry(30, 20);
    var material = new THREE.MeshBasicMaterial({color: 0x007112});
    var leftWheel = new THREE.Mesh(geometry, material);
    leftWheel.position.x = -60;
    leftWheel.position.y = -90;
    leftWheel.position.z = 5;
    car.add(leftWheel);

    var rightWheel = new THREE.Mesh(geometry, material);
    rightWheel.position.x = 60;
    rightWheel.position.y = -90;
    rightWheel.position.z = 5;
    car.add(rightWheel);
}

function onDocumentKeyDown(event) {
    if (event.keyCode == 16) // Shift
    {
        if (way == 'stop') {
            if (lastWay == 'right') {
                move = moveRight;
                way = 'right';
            } else if (lastWay == 'left') {
                move = moveLeft;
                way = 'left';
            }

        }
        else {
            move = moveStop;
            lastWay = way;
            way = 'stop';
        }
    }
    if (event.keyCode == 32) // Space
    {
        if (way == 'left') {
            move = moveRight;
            way = 'right';
        } else if (way == 'right') {
            move = moveLeft;
            way = 'left';
        }
    }
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    if (car.position.x == 400) {
        move = moveLeft;
        way = 'left';
    }

    if (car.position.x == -400) {
        move = moveRight;
        way = 'right';
    }

    move();
    renderer.render(scene, camera);
}
var camera, scene, renderer, container, group;

var width = 1000, height = 600;

var color = 0x0000FF;
var head, bottom;
init();
animate();

function init() {
    scene = new THREE.Scene();

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.OrthographicCamera(width / -2, width / 2, height / 2, height / -2, 0.1, 500);
    camera.position.set(0, 50, 200);
    camera.lookAt(scene.position);

    group = new THREE.Object3D();
    scene.add(group);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(width, height);
    renderer.setClearColor(0xffffff);
    container.appendChild(renderer.domElement);

    paint();
}

function paint() {
    var vertices = [];

    var angle = 0.0;
    var points = 100;
    var radius = 20;

    // Head
    for (var i = 0; i < points; i++) {
        angle = 2 * Math.PI * i / points;
        var x = Math.cos(angle) * radius + 40;
        var y = Math.sin(angle) * radius + 60;
        if (x >= 20 && x <= 40 && y >= 60 && y <= 80)
            vertices.push(new THREE.Vector3(x, y));
    }
    for (var i = 0; i < points; i++) {
        angle = 2 * Math.PI * i / points;
        var x = Math.cos(angle) * radius + 60;
        var y = Math.sin(angle) * radius + 60;
        if (x >= 60 && x <= 80 && y >= 60 && y <= 80)
            vertices.push(new THREE.Vector3(x, y));
    }


    var holes = [];
    var triangles;
    var geometry = new THREE.Geometry();
    var material = new THREE.MeshBasicMaterial({color: color, side: THREE.DoubleSide, wireframe: false});
    geometry.vertices = vertices;

    triangles = THREE.Shape.Utils.triangulateShape(vertices, holes);
    for (var i = 0; i < triangles.length; i++) {

        geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));

    }
    head = new THREE.Mesh(geometry, material);
    head.scale.x = 3;
    head.scale.y = 3;
    group.add(head);

    vertices = [
        new THREE.Vector3(60, 60, 0),
        new THREE.Vector3(60, 0, 0),
        new THREE.Vector3(40, 0, 0),
        new THREE.Vector3(40, 60, 0)
    ];

    var holes = [];
    var triangles;
    var geometry = new THREE.Geometry();
    geometry.vertices = vertices;
    triangles = THREE.Shape.Utils.triangulateShape(vertices, holes)
    for (var i = 0; i < triangles.length; i++) {

        geometry.faces.push(new THREE.Face3(triangles[i][0], triangles[i][1], triangles[i][2]));

    }
    bottom = new THREE.Mesh(geometry, material);
    bottom.scale.x = 3;
    bottom.scale.y = 3;
    group.add(bottom);

    group.position.x = -140;
    group.position.y = -100;
}

function animate() {
    requestAnimationFrame(animate);

    render();
}

function render() {
    renderer.render(scene, camera);
}

function onRedCick() {
    head.material.color.setHex(0xFF0000);
}

function onBlueClick() {
    head.material.color.setHex(0x0000ff);
}

function onWireFrameClick() {
    if (head.material.wireframe == false)
        head.material.wireframe = true;
    else
        head.material.wireframe = false;
}
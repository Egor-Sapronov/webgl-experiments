var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 1, 1000);
camera.position.y = 150;
camera.position.z = 500;

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor( 0xf0f0f0 );
document.body.appendChild(renderer.domElement);

var geometry = new THREE.CubeGeometry(200, 200, 200);
for ( var i = 0; i < geometry.faces.length; i += 2 ) {

    var hex = Math.random() * 0xffffff;
    geometry.faces[ i ].color.setHex( hex );
    geometry.faces[ i + 1 ].color.setHex( hex );

}

var material = new THREE.MeshBasicMaterial( { vertexColors: THREE.FaceColors, overdraw: 0.5 } );

var cube = new THREE.Mesh(geometry, material);
scene.add(cube);


var render = function () {
    requestAnimationFrame(render);

    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

    renderer.render(scene, camera);
};

render();

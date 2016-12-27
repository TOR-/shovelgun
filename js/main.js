var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube = new THREE.Mesh( new THREE.BoxGeometry( 15, 15, 15 ), new THREE.MeshLambertMaterial( { color: 0xaaa0a0 } ));
scene.add( cube );

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.x = 100;
pointLight.position.y = -100;
pointLight.position.z = 130;
scene.add(pointLight);

camera.position.y = -50;
camera.rotation.x = Math.PI / 2;

var character = new Shoveller(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));

var ground = new THREE.Mesh(new THREE.PlaneGeometry(70, 50, 32, 32), new THREE.MeshLambertMaterial( { color: 0xaa00aa, side: THREE.DoubleSide} ));
ground.rotation.x = Math.PI / 2;
scene.add(ground);

function render() {
    
    requestAnimationFrame( render );

    character.calculatePosition();
    cube.position.x = character.position.x;
    cube.position.y = character.position.y;
    camera.position.z = cube.position.z = character.position.z;
    cube.rotation.x = cube.rotation.y = cube.rotation.z += 0.05;
    
    renderer.render( scene, camera );
}
render();

function keyDown(event){
    var n = event.keyCode;
    var increment = 0.1;
    if(n == 32){
	character.velocity.y -= 10 *increment;
    }
    else if ( n == 38 )//UpArrow
    {
	character.velocity.z += increment;
    }
    else if ( n == 40 )//DownArrow
    {
	character.velocity.z -= increment;
    }
    else if ( n == 37 )//LeftArrow
    {
	character.velocity.x += increment;
    }
    else if ( n == 39 )//RightArrow
    {
	character.velocity.x -= increment;
    }
    else
    {
	console.log("Dunno");
    }
}

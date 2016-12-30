var scene = new THREE.Scene();
scene.background = new THREE.Color( 0xddeedd );
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
camera.lookAt({x:0,y:0,z:0});

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var cube = new THREE.Mesh( new THREE.BoxGeometry( 5, 10, 5 ), new THREE.MeshLambertMaterial( { color: 0xaaa0a0 } ));
scene.add( cube );

var pointLight = new THREE.PointLight(0xffffff);
pointLight.position.x = 100;
pointLight.position.y = -100;
pointLight.position.z = 130;
scene.add(pointLight);

scene.add( new THREE.AmbientLight( 0x404040 ) );

camera.position.y = -50;
camera.rotation.x = Math.PI / 2;

var character = new Shoveller(new THREE.Vector3(0, 0, 0), new THREE.Vector3(0, 0, 0));
character.position.set(0,-2.5,0);
var FLOOR = 0;
var ground = new THREE.Mesh(new THREE.PlaneGeometry(70, 50, 32, 32), new THREE.MeshLambertMaterial( { color: 0xaa00aa, side: THREE.DoubleSide} ));
ground.position.set( 0, FLOOR, 0 );
ground.rotation.x = -Math.PI/2;
//scene.add(ground);

//function init() {
var map = new Map("maps/original.map");
map.load();
    //map.load("maps/original.map");
//}

function render() {
    
    requestAnimationFrame( render );

    character.calculatePosition();
    cube.position.x = character.position.x;
    cube.position.y = character.position.y;
    cube.position.z = character.position.z;
    //cube.rotation.y += 0.02;
    
    renderer.render( scene, camera );
}
//init();
render();

function keyDown(event){
    var n = event.keyCode;
    var increment = 0.1;
    if(n == 32){
	character.position.set(0,0,0);
	character.velocity.x = character.velocity.z = 0;
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
	character.velocity.x -= increment;
    }
    else if ( n == 39 )//RightArrow
    {
	character.velocity.x += increment;
    }
    else if ( n == 82 )//r
    {
	location.reload(true);
    }
    else
    {
	console.log("Dunno");
    }
}

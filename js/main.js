var Game = {};

Game.init = function () {
    console.log("init");
    
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xddeedd );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.lookAt({x:0,y:0,z:0});
    this.camera.position.set(0,-50,0);
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    document.body.onkeyup = Input.keyUp;
    document.body.onkeydown = Input.keyDown;
    this.cube = new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 2 ), new THREE.MeshLambertMaterial( { color: 0xabad00 } ));
    //this.cube.position.set(5,-5,5);
    this.scene.add(this.cube);
    this.pointLight = new THREE.PointLight(0xffffff);
    this.pointLight.position.set( 100, -100, 130)
    this.scene.add( this.pointLight);

    this.scene.add( new THREE.AmbientLight( 0x404040 ) );

//    this.camera.position.y = -50;
    this.camera.rotation.x = Math.PI / 2;

    this.character = new Shoveller(new THREE.Vector3(10, -5, 5), new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 2 ), new THREE.MeshLambertMaterial( { color: 0xfff000 } )));
   
    this.map = new Map("maps/hugs.map");
    this.map.load();
};

Game.update = function () {
    this.character.boundingBoxUpdate();
    this.character.calculatePosition();
}

var step = function (elapsed) {
    requestAnimationFrame( step );
    
    Game.update();
    
    Game.camera.position.x = Game.character.position.x;
    Game.camera.position.z = Game.character.position.z;
    
    Game.renderer.render( Game.scene, Game.camera );
};//.bind(Game);

Game.run = function () {
    this.init();
    step();
};
Game.run();


//init();
//render();

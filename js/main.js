var Game = {};

Game.init = function () {
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0xddeedd );
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
    this.camera.lookAt({x:0,y:0,z:0});
    this.camera.position.set(0,70,0);
    
    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );
    document.body.onkeyup = Input.keyUp;
    document.body.onkeydown = Input.keyDown;
//    this.cube = new THREE.Mesh( new THREE.BoxGeometry( 2, 10, 2 ), new THREE.MeshLambertMaterial( { color: 0xabad00 } ));
    //this.cube.position.set(5,-5,5);
//    this.scene.add(this.cube);
    this.pointLight = new THREE.PointLight(0xffffff);
    this.pointLight.position.set( 50, 20, 50)
    this.scene.add( this.pointLight);

    this.scene.add( new THREE.AmbientLight( 0x404040 ) );

//    this.camera.position.y = -50;
    this.camera.rotation.x = Math.PI / 2;

    this.character = new Shoveller( new THREE.Vector3(7, 5, 7), new THREE.Mesh( new THREE.BoxGeometry( 2, 2, 2 ), new THREE.MeshLambertMaterial( { color: 0xfff000 } )));
   
    this.map = new Map("maps/original.map");
    this.map.load();
};

Game.update = function () {
    this.character.calculatePosition();
    this.character.boundingBox.setFromObject(this.character.object);
    
    if ( Game.character.boundingBox.intersectsBox( Game.map.bBox[ Math.floor( (Game.character.object.position.z)/ 5) * (Game.map.width + 1) + Math.floor( (Game.character.object.position.x - 1)/ 5)] ))
    {
	this.character.colliding = true;
	this.character.collidingLeft = true;
    }
    else if( Game.character.boundingBox.intersectsBox( Game.map.bBox[ Math.floor( (Game.character.object.position.z - 1 )/ 5) * (Game.map.width + 1) + Math.floor( (Game.character.object.position.x)/ 5)])
    )
    {
	//	this.character.object.material.color = new THREE.Color(0xff0000);
	this.character.colliding = true;
	this.character.collidingDown = true;
    }
    else if (Game.character.boundingBox.intersectsBox( Game.map.bBox[ Math.floor( (Game.character.object.position.z)/ 5) * (Game.map.width + 1) + Math.floor( (Game.character.object.position.x + 1 )/ 5)]))
    {
	this.character.colliding = true;
	this.character.collidingRight = true;
    }
    else if (Game.character.boundingBox.intersectsBox( Game.map.bBox[ Math.floor( (Game.character.object.position.z + 1 )/ 5) * (Game.map.width+ 1) + Math.floor( (Game.character.object.position.x)/ 5)]))
    {
	this.character.colliding = true;
	this.character.collidingUp = true;
    }
    else
    {
//	this.character.object.material.color = new THREE.Color(0xff00ff);
	this.character.colliding = false;
	this.character.collidingUp = false;
	this.character.collidingDown = false;
	this.character.collidingLeft = false;
	this.character.collidingRight = false;
    }

    
    if(this.character.colliding)
    {
	if ( this.character.collidingRight ) 
	{
	    this.character.object.position.x -= this.character.velocity.x;
	    this.character.velocity.x = 0;	
	}
	else if ( this.character.collidingLeft )
	{
	    this.character.object.position.x -= -this.character.maxVelocity;
	    this.character.velocity.x = 0;	
	}
	else if ( this.character.collidingUp ) 
	{
	    this.character.object.position.z -= this.character.velocity.z;
	    this.character.velocity.z = 0;
	}
	else if ( this.character.collidingDown ) 
	{
	    this.character.object.position.z += -this.character.velocity.z;
	    this.character.velocity.z = 0;
	}
	else 
	{
	    this.character.object.position.x -= this.character.velocity.x;
	    this.character.object.position.z -= this.character.velocity.z;
	}
    }
}

Game.step = function (elapsed) {
    
    
    Game.update();
    
    this.camera.lookAt(Game.character.object.position);
    //Game.camera.position.x = Game.character.object.position.x;
    //Game.camera.position.z = Game.character.object.position.z;
    
    requestAnimationFrame( this.step );
    Game.renderer.render( Game.scene, Game.camera );
}.bind(Game);

Game.run = function () {
    this.init();
    this.step();
};
Game.run();


//init();
//render();

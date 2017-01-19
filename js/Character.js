var Shoveller = function (s, object) {
    this.velocity = new THREE.Vector3(0,0,0);
    this.maxVelocity = 0.3;
    this.object = object;
    this.object.position.set(s.x,s.y,s.z);
    this.colliding;

    Object.defineProperty(
	Shoveller,
	"colliding", 
	{ 
	    set: function (colliding) { 
		this.colliding = colliding; 
		console.log(this.colliding);
	    }
	}
    );
    
    this.calculatePosition = function () {
	this.object.position.x += this.velocity.x;
	//this.position.y += this.velocity.y;
	this.object.position.z += this.velocity.z;
    };
    console.log("adding this.object");
    Game.scene.add(this.object);
    //    this.object.position.set(7,-5,5);
    console.log( this.object.position );
    
    this.boundingBox = new THREE.Box3(new THREE.Vector3(), new THREE.Vector3());
    this.boundingBox.setFromObject(this.object)
    //this.boundingBox = new THREE.BoxHelper(this.object, 0x000fff);
    //this.boundingBox.update(this.object);
    
//    console.log( this.boundingBox );
    
//    Game.scene.add(this.boundingBox);
    return this;
};

Shoveller.prototype.jump = function() {
    console.log("jump");
};

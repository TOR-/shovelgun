var Shoveller = function (s, object) {
    this.velocity = new THREE.Vector3(0,0,0);
    this.position = s;
    this.calculatePosition = function () {
	this.object.position.x += this.velocity.x;
	//this.position.y += this.velocity.y;
	this.object.position.z += this.velocity.z;
	//this.object.position += this.velocity;
	//this.object.position = this.position;
	console.log("this.position = " + this.position + ",\tthis.object.position.x = " + this.object.position.x);
    };
    
    this.object = object;
    if(typeof this.position != "undefined")
	this.object.position = this.position;
    else
	object.position.set(7,-5,5);
    Game.scene.add(this.object);
//    object.position.set(7,-5,5);
    console.log( this.object.position );
    
    this.boundingBox = new THREE.BoxHelper(this.object, 0x000fff);
    this.boundingBox.update(this.object);
    
    console.log( this.boundingBox );
    
    Game.scene.add(this.boundingBox);
    return this;
};

Shoveller.prototype.jump = function() {
    console.log("jump");
};
Shoveller.prototype.boundingBoxUpdate = function () {
    //this.boundingBox.update();
};
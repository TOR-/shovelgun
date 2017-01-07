function Block(x,y,z, size, color) {
    this.size = size;
    this.color = color;
    this.Mesh = new THREE.Mesh( new THREE.BoxGeometry( this.size, this.size, this.size ), new THREE.MeshLambertMaterial( { color: this.color } ));
    this.Mesh.position.set(size * x, size * y, size * z);
    return this.Mesh;
};

Block.position = function () {
    this.x;
    this.y;
    this.z;
};


Block.position.set = function (i, j, k) {
    this.x = i*this.size;
    this.y = j*this.size;
    this.z = k*this.size;
};
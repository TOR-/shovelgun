var gravity = 0.01;

var Shoveller = function (v, s) {
  this.velocity = v;
  this.position = s;
  this.calculatePosition = function () {
    this.position.x += this.velocity.x;
    //this.velocity.y += gravity;
    this.position.y += this.velocity.y;
    this.position.z += this.velocity.z;
  };
};

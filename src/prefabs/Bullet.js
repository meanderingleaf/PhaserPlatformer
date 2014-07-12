var Bullet = function(game, x, y, frame) {  
  Phaser.Sprite.call(this, game, x, y, 'bullet', frame);

  // initialize your prefab here
  this

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);  
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {

};
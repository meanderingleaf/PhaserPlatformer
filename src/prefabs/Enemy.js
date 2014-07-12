var Enemy = function(game, x, y, frame) {  
  Phaser.Sprite.call(this, game, x, y, 'enemy', frame);

  // initialize your prefab here
  this.curState =  {};
  this.speed = 30;

  this.game.physics.arcade.enableBody(this);
  this.body.drag.x = 80;
  this.body.bounce.setTo(1, 0);

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('idle', [0]);
  this.animations.add('skate', [0,1]);
  this.animations.add('jump', [2]);

  this.animations.play('skate', 2, true);

};

Enemy.prototype = Object.create(Phaser.Sprite.prototype);  
Enemy.prototype.constructor = Player;

Enemy.prototype.update = function() {

  var diffX = this.x - this.curState.player.x;
  var diffY = this.x - this.curState.player.y;


  if(Math.abs(diffX) < 100 && Math.abs(diffX) > 20) {
    if(diffX > 0) {
        // write your prefab's specific update code here
       this.body.velocity.x = -this.speed;
       this.scale.x = -1;
    } else {
        // write your prefab's specific update code here
       this.body.velocity.x = this.speed;
       this.scale.x = 1;
    }
  }


};
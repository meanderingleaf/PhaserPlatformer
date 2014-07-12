var Player = function(game, x, y, frame) {  
  Phaser.Sprite.call(this, game, x, y, 'player', frame);


  // initialize your prefab here
  this.bulletGroup;

  this.game.physics.arcade.enableBody(this);
  this.body.drag.x= 90;
  this.speed = 100;
  this.isJumping = false;

  this.anchor.setTo(0.5, 0.5);

  this.animations.add('idle', [0]);
  this.animations.add('skate', [0,1]);
  this.animations.add('jump', [2]);

  this.animations.play('skate', 2, true);

  //boutons
  this.cursors = this.game.input.keyboard.createCursorKeys();

  var fireButton = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
  fireButton.onDown.add(this.fire, this);

  this.cursors.up.onDown.add(this.jump, this);

};

Player.prototype = Object.create(Phaser.Sprite.prototype);  
Player.prototype.constructor = Player;

Player.prototype.jump = function() {
  if(!this.isJumping) {
    this.isJumping = true;
    this.body.velocity.y = -200;
    this.animations.play('jump');
  }
};

Player.prototype.fire = function() {
  var bullet = this.bulletGroup.create(this.x, this.y, 'bullet');
  this.game.physics.arcade.enableBody(bullet);
  bullet.body.velocity.x = 150 * this.scale.x;
  bullet.scale.x = this.scale.x;
  bullet.body.allowGravity = false;
};

Player.prototype.update = function() {

  if(this.body.onFloor()) {
    console.log("DOWNE");
    this.isJumping = false;
    this.animations.play('skate', 2, true);
  }

  // write your prefab's specific update code here
  if(this.cursors.left.isDown) {
      this.scale.x = -1;
      this.body.velocity.x = -this.speed;

  }

  if(this.cursors.right.isDown) {
      this.scale.x = 1;
      this.body.velocity.x = this.speed;
  }

};
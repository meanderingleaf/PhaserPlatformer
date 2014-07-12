var Bullet = function(game, x, y, frame) {  
  Phaser.Sprite.call(this, game, x, y, 'bullet', frame);

  // initialize your prefab here
  this

};

Bullet.prototype = Object.create(Phaser.Sprite.prototype);  
Bullet.prototype.constructor = Bullet;

Bullet.prototype.update = function() {

};;var Enemy = function(game, x, y, frame) {  
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


};;var Player = function(game, x, y, frame) {  
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

};;Platformer = {
    /* Here we've just got some global level vars that persist regardless of State swaps */
    score: 0
};

Platformer.Boot = function (game) {
};

Platformer.Boot.prototype = {

    preload: function () {

        this.load.image('preloaderBar', 'assets/preload.png');

    },

    create: function () {

        this.input.maxPointers = 1;
        this.state.start('Preloader');

    },
    gameResized: function (width, height) {
    
    }

};;Platformer.Game = function(game) {
	//state vars
	this.player;

	this.map;
	this.layer;
	this.cursors;
	this.coins;
	this.score = 0;
	this.txtScore;
	this.enemies;
	this.bullets;
	this.bg;

	//sfx
	this.getSound;
	this.hurtSound;
}

Platformer.Game.prototype = {

	//do out setup stuff here
	create: function() {

		//start physics
		this.game.physics.startSystem(Phaser.Physics.ARCADE);
		this.game.physics.arcade.gravity.y = 250;

		this.bg = this.add.tileSprite(-30,-30, 859, 500, 'bg');

	    //tilemap
	    this.map = this.game.add.tilemap('level1');
	    this.map.addTilesetImage('tiles');
	    this.map.setCollisionByExclusion([ 0, 1, 11 ]);
	    this.layer = this.map.createLayer('Tile Layer 1');
	    this.layer.resizeWorld();

	    //next out coins
	    this.coins = this.add.group();
    	this.coins.enableBody = true;
    	this.map.createFromObjects('Objection', 12, 'collectible', 0, true, false, this.coins);
    	this.coins.setAll('body.allowGravity', false);

    	//then our enemies
    	this.enemies = this.add.group();
    	this.map.createFromObjects('Objection', 13, 'enemy', 0, true, false, this.enemies, Enemy);
    	this.enemies.setAll('curState', this);

    	//make our bullets layer
    	this.bullets = this.add.group();

    	//player
	    this.player = new Player(this.game, 100, 100);
	    this.game.add.existing(this.player);
	    this.player.bulletGroup = this.bullets;

	    //score
	    var style = { font: "30px Arial", fill: "#ff0049"};
	   	this.txtScore = this.game.add.text(this.game.width - 45, 10, this.score.toString(), style);
	   	this.txtScore.fixedToCamera = true;

	   	//sound effects
	   	this.hurtSound = this.add.audio('hitSound');
	   	this.getSound = this.add.audio('pickupSound');

	   	//watch that player
	    this.game.camera.follow(this.player);
	},

	update: function() {
		this.physics.arcade.collide(this.player, this.layer);
		this.physics.arcade.collide(this.enemies, this.layer);
		this.physics.arcade.collide(this.enemies, this.enemies);

		this.physics.arcade.overlap(this.player, this.coins, this.collectCoin, null, this);
		this.physics.arcade.collide(this.player, this.enemies, this.hurtPlayer, null, this);
		this.physics.arcade.overlap(this.bullets, this.enemies, this.killEnemy, null, this);
		this.physics.arcade.collide(this.bullets, this.layer, this.killBullet, null, this);

		this.bg.x = this.game.camera.x * .3;
	},

	collectCoin: function(player, coin) {

    	coin.kill();
    	this.score ++;
    	this.txtScore.setText(this.score.toString());
    	this.getSound.play();

	},

	hurtPlayer: function(player, enemy) {
		player.body.velocity.x = 90 * enemy.scale.x;
		player.body.velocity.y = -90;
		this.hurtSound.play();
	},

	killEnemy: function(bullet, enemy) {
		bullet.kill();
		enemy.kill();
	},

	killBullet: function(bullet, aLayer) {
		bullet.kill();
	}

};Platformer.Preloader = function (game) {

	this.background = null;
	this.preloadBar = null;

	this.ready = false;

};

Platformer.Preloader.prototype = {

	preload: function () {

		this.preloadBar = this.add.sprite(0, 100, 'preloaderBar');

		this.load.setPreloadSprite(this.preloadBar);

		this.load.image('collectible', 'assets/collectible.png');
		this.load.image('bullet', 'assets/bullet.png');
		this.load.image('bg', 'assets/bg.jpg');
		this.load.spritesheet('player', 'assets/player.png', 24, 34); //width and height of sprite
		this.load.spritesheet('enemy', 'assets/enemy.png', 24, 34);

		//tiledmap
		this.load.tilemap('level1', 'assets/level1.json', null, Phaser.Tilemap.TILED_JSON);
    	this.load.image('tiles', 'assets/tiles.png');

    	//audio
    	//Technically there is no 'one audio format to rule them all'
    	this.load.audio('pickupSound', ['assets/pickup.wav' ]);
    	this.load.audio('hitSound', ['assets/hit.wav' ]);

	},

	create: function () {

		this.preloadBar.cropEnabled = false;
		this.state.start('Game');

	},

	update: function () {

	}

};
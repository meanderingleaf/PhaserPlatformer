Platformer.Game = function(game) {
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

}
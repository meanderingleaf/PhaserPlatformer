Platformer.Preloader = function (game) {

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
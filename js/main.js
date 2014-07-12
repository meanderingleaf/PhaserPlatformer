(function () {

    var game = new Phaser.Game(400, 300, Phaser.CANVAS, 'game');

    game.state.add('Boot', Platformer.Boot);
    game.state.add('Preloader', Platformer.Preloader);
    game.state.add('Game', Platformer.Game);

    game.state.start('Boot');

})();
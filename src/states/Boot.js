Platformer = {
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

};
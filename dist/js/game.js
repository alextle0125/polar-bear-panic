(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);throw new Error("Cannot find module '"+o+"'")}var f=n[o]={exports:{}};t[o][0].call(f.exports,function(e){var n=t[o][1][e];return s(n?n:e)},f,f.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

//global variables
window.onload = function () {
  var game = new Phaser.Game(800, 600, Phaser.AUTO, 'polar-bear-panic');

  // Game States
  game.state.add('boot', require('./states/boot'));
  game.state.add('gameover', require('./states/gameover'));
  game.state.add('menu', require('./states/menu'));
  game.state.add('play', require('./states/play'));
  game.state.add('preload', require('./states/preload'));
  

  game.state.start('boot');
};
},{"./states/boot":3,"./states/gameover":4,"./states/menu":5,"./states/play":6,"./states/preload":7}],2:[function(require,module,exports){
'use strict';

var Bear = function(game, x, y, frame) {
  Phaser.Sprite.call(this, game, x, y, 'bear', frame);

  // initialize your prefab here

  this.game.physics.ninja.enableBody(this);

  // this.body.bounce = 0;
  // this.body.gravity = 0;
  // this.body.collideWorldBounds = true;

};

Bear.prototype = Object.create(Phaser.Sprite.prototype);
Bear.prototype.constructor = Bear;

  // RIGHT MOVEMENT
Bear.prototype.runRight = function(){
  // this.body.drag.x = ;
  this.body.velocity(700);
};
  // LEFT MOVEMENT
Bear.prototype.runLeft = function(){
  // this.body.drag.x = 0;
  // this.body.velocity(-400);
  this.body.moveLeft(50);
};
// SLOW WHEN NOT PRESSED
Bear.prototype.decelerate = function(){
  // this.body.drag.x = 300;
};
  //JUMPING
Bear.prototype.jump = function(){
    // this.body.elocity = -400

};

Bear.prototype.update = function() {

  // write your prefab's specific update code here

};

module.exports = Bear;

},{}],3:[function(require,module,exports){

'use strict';

function Boot() {
}

Boot.prototype = {
  preload: function() {
    this.load.image('preloader', 'assets/preloader.gif');
  },
  create: function() {
    this.game.input.maxPointers = 1;
    this.game.state.start('preload');
  }
};

module.exports = Boot;

},{}],4:[function(require,module,exports){

'use strict';
function GameOver() {}

GameOver.prototype = {
  preload: function () {

  },
  create: function () {
    var style = { font: '65px Arial', fill: '#ffffff', align: 'center'};
    this.titleText = this.game.add.text(this.game.world.centerX,100, 'Game Over!', style);
    this.titleText.anchor.setTo(0.5, 0.5);

    this.congratsText = this.game.add.text(this.game.world.centerX, 200, 'You Win!', { font: '32px Arial', fill: '#ffffff', align: 'center'});
    this.congratsText.anchor.setTo(0.5, 0.5);

    this.instructionText = this.game.add.text(this.game.world.centerX, 300, 'Click To Play Again', { font: '16px Arial', fill: '#ffffff', align: 'center'});
    this.instructionText.anchor.setTo(0.5, 0.5);
  },
  update: function () {
    if(this.game.input.activePointer.justPressed()) {
      this.game.state.start('play');
    }
  }
};
module.exports = GameOver;

},{}],5:[function(require,module,exports){
 /* Full tutorial: http://codevinsky.ghost.io/phaser-2-0-tutorial-flappy-bear-part-1/ */
  'use strict';
  function Menu() {}

  Menu.prototype = {
    preload: function() {

    },
    create: function() {
      // add the background sprite
      this.background = this.game.add.sprite(0,0,'background');

      // add the ground sprite as a tile
      // and start scrolling in the negative x direction
      this.ground = this.game.add.tileSprite(0,400, 335,112,'ground');
      this.ground.autoScroll(-200,0);

      /** STEP 1 **/
      // create a group to put the title assets in
      // so they can be manipulated as a whole
      this.titleGroup = this.game.add.group()

      /** STEP 2 **/
      // create the title sprite
      // and add it to the group
      this.title = this.add.sprite(0,0,'title');
      this.titleGroup.add(this.title);

      /** STEP 3 **/
      // create the bear sprite
      // and add it to the title group
      this.bear = this.add.sprite(200,5,'bear');
      this.titleGroup.add(this.bear);

      /** STEP 4 **/
      // add an animation to the bear
      // and begin the animation
      this.bear.animations.add('flap');
      this.bear.animations.play('flap', 12, true);

      /** STEP 5 **/
      // Set the originating location of the group
      this.titleGroup.x = 30;
      this.titleGroup.y = 100;

      /** STEP 6 **/
      //  create an oscillating animation tween for the group
      this.game.add.tween(this.titleGroup).to({y:115}, 350, Phaser.Easing.Linear.NONE, true, 0, 1000, true);

      // add our start button with a callback
      this.startButton = this.game.add.button(this.game.width/2, 300, 'startButton', this.startClick, this);
      this.startButton.anchor.setTo(0.5,0.5);
    },
    startClick: function() {
      // start button click handler
      // start the 'play' state
      this.game.state.start('play');
    }
  };

  module.exports = Menu;

},{}],6:[function(require,module,exports){

  'use strict';

  var Bear = require('../prefabs/bear');
  // var Ground = require('../prefabs/ground');
  var game = new Phaser.Game();
  var bear;
  var cursors;
  function Play() {}
  Play.prototype = {


    create: function() {

      // game.physics.ninja.enable.AABB(this.bear);

      cursors = game.input.keyboard.createCursorKeys();



      this.game.physics.startSystem(Phaser.Physics.NINJA);
      this.game.physics.ninja.gravity = 0;

      // SETTING BOUNDS
      this.game.world.setBounds(0, 0, 4000, 600);

      // this.game.physics.ninja.gravity.x = -200;
      this.background = this.game.add.sprite(0,0,'background');

      this.bear = new Bear(this.game, 100, this.game.height/2);

      // CREATING AND ADDING A NEW GROUND
      // this.ground = new Ground(this.game, 0, 600, 4000, 100);

      // this.game.add.existing(this.ground);

      //ADDS YOUR BEAR
      this.game.add.existing(this.bear);

      // CAMERA FOLLOWS YOUR BEAR
      this.game.camera.follow(this.bear);

      // SETS CONTROLS
      this.game.input.keyboard.addKeyCapture([
        Phaser.Keyboard.RIGHT,
        Phaser.Keyboard.LEFT,
        Phaser.Keyboard.UP
        ]);

      // WHAT CONTROLLS DO
      // RUN RIGHT
      var runRight = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
      runRight.onDown.add(this.bear.runRight, this.bear);
      // runRight.onUp.add(this.bear.decelerate, this.bear)
      // RUN LEFT
      var runLeft = this.input.keyboard.addKey(Phaser.Keyboard.LEFT);
      runLeft.onDown.add(this.bear.runLeft, this.bear);
      // runLeft.onUp.add(this.bear.decelerate, this.bear);
      //JUMP
      var jump = this.input.keyboard.addKey(Phaser.Keyboard.UP);
      jump.onDown.add(this.bear.jump, this.bear);

      this.input.onDown.add(this.bear.jump, this.bear);

     },

    update: function() {
      // this.game.physics.ninja.collide(this.bear, this.ground);
    },
    clickListener: function() {
      this.game.state.start('gameover');
    }
  };

  module.exports = Play;

},{"../prefabs/bear":2}],7:[function(require,module,exports){

'use strict';
function Preload() {
  this.asset = null;
  this.ready = false;
}

Preload.prototype = {
  preload: function() {

    this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
    this.asset = this.add.sprite(this.width/2, this.height/2, 'preloader');
    this.asset.anchor.setTo(0.5, 0.5);
    this.load.setPreloadSprite(this.asset);

    this.load.image('background', 'assets/wintertiles.jpg');
    this.load.image('ground', 'assets/ground.png');
    this.load.image('title', 'assets/title.png');
    this.load.image('startButton', 'assets/start-button.png');


    // this.load.spritesheet('bird', 'assets/bird.png', 34, 24, 3);
    this.load.spritesheet('bear', 'assets/bear.png', 32, 48);
  },
  create: function() {
    this.asset.cropEnabled = false;
  },
  update: function() {
    if(!!this.ready) {
      this.game.state.start('play');
    }
  },
  onLoadComplete: function() {
    this.ready = true;
  }
};

module.exports = Preload;

},{}]},{},[1])
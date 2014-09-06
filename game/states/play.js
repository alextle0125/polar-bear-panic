
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

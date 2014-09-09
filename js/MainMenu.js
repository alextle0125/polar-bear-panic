MainMenu = function(game) {};
MainMenu.prototype = {
	create: function() {
		this.add.sprite(80, 100, 'screenMainmenu');
<<<<<<< HEAD
		this.startButton = this.add.button(215, 230, 'singlePlayer', this.startGame, this, 1, 0, 2);
=======
		this.startButton = this.add.button(230, 230, 'singlePlayer', this.startGame, this, 1, 0, 2);
>>>>>>> 4e2aaecbeb504f78fc1537de8fd1d678f82ee60e
		this.multiPlayer = this.add.button(230, 300, 'multiPlayer', this.startMultiplayer, this, 1, 0, 2);
		this.instructions = this.add.button(230, 370, 'instructions', this.startInstructions, this, 1, 0, 2);
	},

	startGame: function() {
		this.game.state.start('Game');
	},

	startMultiplayer: function() {
		this.game.state.start('Multiplayer');
	},

	startInstructions: function() {
		this.game.state.start('Instructions');
	},

};
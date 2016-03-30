//Game class contains the variable gameOver to
//call when the game is finished, the variable
//hit to make a sound when the player is hit,
//and the variable score for make a sound when 
//the player reach the water.
var Game = function() {
    this.gameOver = false;
    this.hit = new Audio('audio/hit.wav');
    this.score =new Audio('audio/score.wav');

};

//class Enemies our player must avoid
var Enemy = function() {


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    //Call the method Enemy.prototype.restart
    this.restart();
    this.sprite = 'images/enemy-bug.png';
};

//This method contains the variables and generates 
//random positions for y.
Enemy.prototype.restart = function() {
    //Variables applied to each of our instances of 
    //Enemy   
    var row = Math.floor((Math.random() * 3 ) +1);
    this.x = 0;
    this.y = 60 + 83 * (row-1);
    //this variablde speed generates the random velocity.
    this.speed = Math.floor((Math.random() * 200 ) + 100);
    this.radius = 30;
};

// This method updates each enemy's position
// Parameter dt is a time delta between animation frames
Enemy.prototype.update = function(dt) {
   
    this.x += (this.speed * dt);
    //returns the bug when it disappears from the screen
    if (this.x > 600) {
        this.restart();
    }
};

// Draw the enemy on the screen.
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
var Player = function() {
    //variables start position
    this.x = 200;
    this.y = 405;
    //variable start score
    this.score = 0;
    //variable to help to build checkcollition method
    this.radius = 35;
    //variable to start lives
    this.lives = 5;
    this.sprite = 'images/char-boy.png';
};

//Method to update player
Player.prototype.update = function(dt) {
};

//Method to restart player into start position
Player.prototype.restart = function() {
    this.x = 200;
    this.y = 405;
};

//Method to detect if the player is touch by the bugs
Player.prototype.checkCollisions = function(enemy) {
    var dx = this.x - enemy.x;
    var dy = this.y - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius + enemy.radius) {
        game.hit.play();
        this.restart();
        this.lives--;
        if (this.lives === 0) {
            game.gameOver = true;
        }
        return true;
    }
    return false;
};

// Draw the Player on the screen.
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);        
};

//Add movement to player
Player.prototype.handleInput = function(direction) {
    var tile_width = 101;
    var tile_height =83;
    if (direction === 'left') {
        if (this.x > 0)
            this.x -= tile_width;
    }
    if (direction === 'right') {
        if (this.x < 3*tile_width)
            this.x += tile_width;
    }
    if (direction === 'up') {
        if (this.y > 0) {
            this.y -= tile_height;            
            if (this.y < 0) {
                game.score.play();
                this.score += 600;
                this.restart();
            }
        }
    }
    if (direction === 'down') {
        if (this.y < 405)
            this.y += tile_height;
    }
    if (direction === 'spacebar') {
        window.location.reload();
    }    
};

// create Player
// create Enemies
// create Game
var allEnemies =[]
    for (i=0; i<4; i++) 
    allEnemies.push( new Enemy());
var player =  new Player();
var game = new Game();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        32: 'spacebar',
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down',

    };

    player.handleInput(allowedKeys[e.keyCode]);
});

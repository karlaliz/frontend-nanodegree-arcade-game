
var Game = function() {
    this.gameOver = false;
    this.gameWin = false;
    this.hit = new Audio('audio/hit.wav');

};

// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this u5s
    // a helper we've provided to easily load images
    this.restart();
    this.sprite = 'images/enemy-bug.png';
};

Enemy.prototype.restart = function() {
    var row = Math.floor((Math.random() * 3 ) +1);
    this.x = 0;
    this.y = 60 + 83 * (row-1);
    this.speed = Math.floor((Math.random() * 200 ) + 100);
    this.radius = 30;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += (this.speed * dt);
    if (this.x > 600) {
        this.restart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function() {
    this.x = 200;
    this.y = 405;
    this.radius = 35;
    this.lives =5;
    this.sprite = 'images/char-boy.png';
};


Player.prototype.update = function() {

};

Player.prototype.checkCollisions = function(enemy) {
    var dx = this.x - enemy.x;
    var dy = this.y - enemy.y;
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < this.radius + enemy.radius) {
        game.hit.play();
        this.x = 200;
        this.y = 405;
        this.lives--;
        if (this.lives === 0) {
            game.gameOver = true;
        };
    };
};

Player.prototype.render = function() {
    document.getElementById('numberlives').innerHTML = this.lives;
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(direction) {

    if (direction === 'left') {
        if (this.x > 0)
            this.x -= 101;
    }
    if (direction === 'right') {
        if (this.x < 303)
            this.x += 101;
    }
    if (direction === 'up') {
        if (this.y > 0)
            this.y -= 83;
    }
    if (direction === 'down') {
        if (this.y < 405)
            this.y += 83;
    }
    
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [ new Enemy(), new Enemy(), new Enemy(), new Enemy() ];
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

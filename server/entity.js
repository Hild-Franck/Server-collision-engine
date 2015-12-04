/**
 * Created by Knaufux on 12/2/2015.
 */

var random = require('./lib/random');
var collision = require('./lib/collision.js');


module.exports = function(){
    var root = this;

    this.x = random.randomIntRange(0, 300);
    this.y = random.randomIntRange(0, 300);
    this.radius = random.randomIntRange(1, 25);
    this.speed = random.randomIntRange(1, 5);
    this.dir = random.randomIntRange(0,3);
    this.colliding = false;
    this.updtTime = (new Date()).getTime();
    this.counterNwDir = 0;

    this.changeDir = function(){
        var newDir = random.randomIntRange(0,2);
        this.dir = newDir < this.dir ? newDir : newDir + 1;
    };

    this.update = function() {
        root.x = collision.mapCollision('x', root.x, root.speed, root.dir, {width: 300, height: 300});
        root.y = collision.mapCollision('y', root.y, root.speed, root.dir, {width: 300, height: 300});
        if(collision.mapCollisionCheck(root.x, root.y, root.speed, root.dir, {width: 300, height: 300}) ||
            (new Date()).getTime() - root.counterNwDir >= 1000) {
            root.changeDir();
            root.counterNwDir = (new Date()).getTime();
        }
        root.colliding = collision.rndCollisionCheck(root.x, root.y, root.radius);
        if(root.colliding){

        }
    };
};
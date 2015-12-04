/**
 * Created by Knaufux on 12/2/2015.
 */

var random = require('./lib/random');
var collision = require('./lib/collision.js');

const DIRECTION = [
    [0,1],
    [-1,0],
    [1,0],
    [0,-1]
];

module.exports = function(){
    var root = this;

    this.x = random.randomIntRange(0, 300);
    this.y = random.randomIntRange(0, 300);
    this.radius = random.randomIntRange(1, 50);
    this.speed = random.randomIntRange(1, 10);
    this.dir = random.randomIntRange(0,3);
    this.updtTime = (new Date()).getTime();
    this.counterNwDir = 0;

    this.changeDir = function(){
        this.dir = random.randomIntRange(0,3);
    };

    this.update = function(){
        if(collision.mapCollision(root.x, root.y, root.speed, ))
    };
};
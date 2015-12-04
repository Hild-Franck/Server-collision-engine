/**
 * Created by Knaufux on 9/2/2015.
 */

module.exports.randomRange = function(min, max){
    return Math.random() * (max - min) + min;
};

module.exports.randomIntRange = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};
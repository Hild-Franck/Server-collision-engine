/**
 * Created by Knaufux on 12/3/2015.
 */

const DIRECTION = [
    [0,1],
    [-1,0],
    [1,0],
    [0,-1]
];

exports.mapCollision = function(coordinate, position, pixels, dir, map){
    var updtPos;
    if(coordinate == 'x'){
        updtPos = position + pixels * DIRECTION[dir][0];
        if(updtPos <= 0)
            return 0;
        else if(updtPos >= map.width)
            return map.width;
        else
            return updtPos;
    }
    else if(coordinate == 'y'){
        updtPos = position + pixels * DIRECTION[dir][1];
        if(updtPos <= 0)
            return 0;
        else if(updtPos >= map.height)
            return map.height;
        else
            return updtPos;
    }
    else
        throw new Error(coordinate + ' is not a coordinate');
};

exports.mapCollisionCheck = function(x, y, pixels,dir, map){
    return (x + pixels * DIRECTION[dir][0] > map.width||
    x + pixels * DIRECTION[dir][0] < 0 ||
    y + pixels * DIRECTION[dir][1] > map.height ||
    y + pixels * DIRECTION[dir][1] < 0);
};
/**
 * Created by Knaufux on 12/3/2015.
 */

exports.mapCollision = function(x, y, pixels, map){
    return (x + pixels > map.width||
            x - pixels < 0 ||
            y + pixels > map.height ||
            y - pixels < 0);
};
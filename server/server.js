/**
 * Created by Hild Franck on 12/3/2015.
 */


var io = require('socket.io')();
var Database = require('./database.js');
var Entity = require('./entity.js');
var QuadTree = require('./lib/quadTree.js');
entities = new Database(['Test']);
var bound = {
    x: 0,
    y: 0,
    width: 300,
    height: 300
};
var tree = new QuadTree(bound, false, 4, 3);
var timeStart = 0;


var entDB;

entities.loadData(function(){
    entDB = entities.database.getCollection('Test');
    io.on('connection', function(){
        tree.insert(entities.addData(Entity, 'Test'));
    });
    setInterval(function(){
        timeStart = (new Date()).getTime();
        var getData = entDB.find();

        for(var entity of getData){
            entity.update();
        }
        tree.clear();
        tree.insert(getData);
        for(entity of getData){
            var items = tree.retrieve(entity);
            for(var item of items){
                if(entity == item || (entity.colliding && item.colliding)) {
                    continue;
                }
                entity.collide(item);
            }
        }

        io.emit('data', getData);
        console.log((new Date()).getTime() - timeStart);
    }, 16)
});

io.listen(3000);
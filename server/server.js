/**
 * Created by Knaufux on 12/3/2015.
 */


var io = require('socket.io')();
var Database = require('./database.js');
var Entity = require('./entity.js');
entities = new Database(['Test']);

var entDB;

entities.loadData(function(){
    entDB = entities.database.getCollection('Test');
    io.on('connection', function(socket){
        entities.addData(Entity, 'Test');
        setInterval(function() {
            var player = entDB.findOne().data()[0];
            console.log(entDB.find());
            player.update();
            socket.emit('news', {
                message:{
                    x: player.x,
                    y: player.y,
                    dir: player.dir
                }
            });
        }, 100);
    });
});
io.listen(3000);
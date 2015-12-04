/**
 * Created by Knaufux on 12/3/2015.
 */


var io = require('socket.io')();
var Database = require('./database.js');
var Entity = require('./entity.js');
entities = new Database(['Test']);

entities.loadData(function(){
    io.on('connection', function(socket){
        var i = 0;
        entities.addData(Entity, 'Test');
        setInterval(function() {
            socket.emit('news', {
                message: i++
            });
        }, 1000);
    });
});setTimeout(function(){
    console.log(entities.database.collections[0].data);
}, 5000);
io.listen(3000);
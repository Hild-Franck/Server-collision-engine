/**
 * Created by Knarfux on 03/12/2015.
 */

module.exports = function(_id){
    var root = this;
    this.id = _id;
    var socket = require('socket.io-client')('http://127.0.0.1:3000', {forceNew: true});
    socket.on('connect', function(){
        socket.on('news', function(data){
            console.log(data.message);
            console.log('ID: ' + root.id);
        });
    });
};

/**
 * Created by Knaufux on 12/2/2015.
 */

var assert = require('assert');
var http = require('http');
var server = http.createServer();
var io = require('socket.io').listen(server);

var Database = require('./database');
var entities = new Database(['Test']);
var Entity = require('./entity');

server.listen(8082);

describe('Database:', function(){
    describe('#Initialisation ', function(){
        it('should be an instance of Database', function(){
            assert.equal(true, entities instanceof Database);
        });
        it('should not throw an error', function(){
            entities.loadData(function(){
                assert.doesNotThrow(function(){entities.database.listCollections();});
            });
            assert.doesNotThrow(function(){entities.loadData(function(){});});
        });
        it('should return false if the collection doesn\'t exist', function(){
            assert.equal(false, entities.checkCollection('poulet'));
        });
        it('should return false if one of the collection is wrong', function(){
            assert.equal(true, entities.checksCollections(entities.collections));
        });
        it('should return the collections gave to constructor', function(){
            assert.deepEqual(['Test'], entities.getCollectionsName());
        });
    });
    describe('#Populate', function(){
        it('should return the count of item in the collection (3)', function(){
            assert.equal(3, entities.populate(Entity, 3, 'Test').maxId);
        });
    });
});


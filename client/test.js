/**
 * Created by Knaufux on 12/3/2015.
 */

var assert = require('assert');
var sinon = require('sinon');
var socket = require('socket.io-client')('http://localhost:8082');

describe('Socket:', function(){
    describe('Connection', function(){
        it('should be none null if the socket is included', function(){
            assert.notEqual(null, socket);
        });
        it('should connect', function(done){
            var spy = sinon.spy();
            socket.on('connect', spy);
            setTimeout(function(){
                assert.equal(true, spy.called);
                done();
            },50);
        });
    });
});

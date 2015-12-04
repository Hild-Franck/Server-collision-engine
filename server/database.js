/**
 * Created by Knarfux on 02/12/2015.
 */

var loki = require('lokijs');

module.exports = function(_collections){
    var root = this;
    this.collections = _collections;
    this.database = new loki('test.json');

    this.checkCollection = function(name){
        return !(root.database.getCollection(name) === null);
    };
    this.checksCollections = function(collections){
        var check = true;
        for(value of collections){
            if(!root.checkCollection(value))
                check = false;
        }
        return check;
    };
    this.createCollection = function(name){
        root.database.addCollection(name);
    };
    this.createCollections = function(collections){
        console.log('poulet: ' + collections);
        for(value of collections){
            root.createCollection(value);
        }
    };
    this.getCollectionsName = function(){
        var collectName = [];
        for(value of root.database.listCollections()){
            collectName.push(value.name);
        }
        return collectName;
    };


    this.loadData = function(callback){
        root.database.loadDatabase({}, function(){
            if(!root.checksCollections(root.collections))
                root.createCollections(root.collections);
            callback();
        });
    };

    this.addData = function(constructor, collection){
        return root.database.getCollection(collection).insert(new constructor());
    };

    this.populate = function(constructor, number, collection){
        for(var i = 0; i < number; i++){
            root.addData(constructor, collection);
        }
        return root.database.getCollection(collection);
    }
};
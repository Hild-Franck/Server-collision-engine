/**
 * Created by Knaufux on 12/3/2015.
 */

var testOne = require('./lib/clientObj.js');

for (var i = 0; i < 250; i++) {
    new testOne(i);
}
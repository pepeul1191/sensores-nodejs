var EJDB = require('ejdb');
var jb = EJDB.open('db/quinua', EJDB.DEFAULT_OPEN_MODE);

exports.conn = jb;
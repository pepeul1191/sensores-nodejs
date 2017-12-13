var EJDB = require('ejdb');
var jb = EJDB.open('db/zoo', EJDB.DEFAULT_OPEN_MODE | EJDB.JBOTRUNC);

exports.conn = jb;
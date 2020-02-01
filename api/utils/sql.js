'use strict';

var connection;

let mysql = require('mysql2');
let sqlConfig = require('../../config/db.json');

module.exports = function () {
   if (typeof connection === 'undefined') {
      connection = mysql.createPool(sqlConfig);
   }
   return connection;
};
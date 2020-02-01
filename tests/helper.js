'use strict';

// ensure that 'sinon' and 'should' library methods
// will be available to all tests
require('should');
const sinon = require('sinon');

before(function() {
   // supertest version of express server
   global.request = require('supertest')(require('../server'));
});

after(function () {
   // need to terminate sql connection 
   // otherwise the process stays up after running all tests
   const sql = require('../api/utils/sql')();
   sql.end();
});
'use strict';

let PORT = process.env.PORT || 3001;
let server = require('../server');

var app = server.listen(PORT, function () {
   console.log('server listening on port ' + PORT);
});
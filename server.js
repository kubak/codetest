'use strict';

let express = require('express');
let morgan = require('morgan');
var bodyParser = require('body-parser');

let PORT = 3000;

let app = express();

let sessionOptions = { cookie: {} };
app.use(morgan('dev'));     // Logs all requests to the console

app.use(bodyParser.urlencoded({ extended : true, limit : '1mb' })); // POST data parsing
app.use(bodyParser.json({ limit : '1mb' })); // JSON in POST request body parsing


app.use(function (req, res, next) {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', req.headers.origin || '*');
  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,authorization');
  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);
  // Pass to next layer of middleware
  next();
});

// set routes
// Mount the API
app.use('/api/v1', require('./api'));

// no templating for now so just serve index.html on /
app.get('/', function (req, res) { res.sendFile(__dirname + '/public/templates/index.html'); });

// serve static files
app.use(express.static(__dirname + '/public'));

app.all('/*', function(req, res) {
    res.status(404).json({
        status: 404,
        message: 'No endpoint exists at ' + req.originalUrl
    });
});

// start app
app.listen(PORT);
console.log('server listening on port ' + PORT);

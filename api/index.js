'use strict';

var path = require('path');
var express = require('express');
var controllers = require(path.join(__dirname, 'controllers'));
var api = express.Router();

// issue endpoints
api.get('/issue/', controllers.issue.list);
api.get('/issue/:id', controllers.issue.get);
api.put('/issue/:id', controllers.issue.update);
api.patch('/issue/:id', controllers.issue.update);
api.delete('/issue/:id', controllers.issue.remove);
api.post('/issue/', controllers.issue.create);

module.exports = api;

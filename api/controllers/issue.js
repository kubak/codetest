'use strict';

let IssueModel = require('../models/issue');
let model = new IssueModel();

/**
 * @api {get} /issue/:id Get Issue List
 * @apiName List
 * @apiGroup Issue
 * @apiVersion 1.0.0
 *
 * @apiSuccess {Object[]} issue retrieved Issue object
 * @apiSuccess {Number} issue.issueID retrieved Issue id
 * @apiSuccess {String} issue.issueName retrieved Issue name
 * @apiSuccess {String} issue.issueDescription retrieved Issue description
 * @apiSuccess {String} issue.issueState retrieved Issue state
 * @apiSuccess {String} issue.issueModifiedDate retrieved Issue last modified date ISO8601 format
 * 
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     [{
 *       "issueID" : 1,
 *       "issueName" : "test ",
 *       "issueDescription" : "test testest",
 *       "issueState" : "open",
 *       "issueModifiedDate":"2017-10-23T11:51:16.000Z"
 *     }, {
 *       "issueID" : 2,
 *       "issueName" : "test test"
 *       "issueDescription" : "test test test",
 *       "issueState" : "pending",
 *       "issueModifiedDate":"2017-10-23T09:23:59.000Z"
 *     }]
 *
 * @apiError (500 Internal Server Error) Error there was an error when trying to generate response.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "sql error"
 *     }
 */
exports.list = function (req, res) {
   model.list(function (err, data) {
      if (err) {
         res.status(500).json({ message : err + '' });
         return;
      }
      res.status(200).json(data);
   });
};

/**
 * @api {get} /issue/:id Get Issue
 * @apiName Get
 * @apiGroup Issue
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Issue id
 *
 * @apiSuccess {Number} issueID retrieved Issue id
 * @apiSuccess {String} issueName retrieved Issue name
 * @apiSuccess {String} issueDescription retrieved Issue description
 * @apiSuccess {String} issueState retrieved Issue state
 * @apiSuccess {String} issueModifiedDate retrieved Issue last modified date ISO8601 format
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "issueID" : 1,
 *       "issueName" : "test ",
 *       "issueDescription" : "test testest",
 *       "issueState" : "open",
 *       "issueModifiedDate":"2017-10-23T11:51:16.000Z"
 *     }
 * 
 * @apiError (500 Internal Server Error) Error there was an error when trying to generate response.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "sql error"
 *     }
 */
exports.get = function(req, res) {
   
   // @todo validate input data
   let issueID = req.params.id;

   model.get(issueID, function(err, data) {
      if (err) {
         res.status(500).json({ message : err + '' });
      }
      res.status(200).json(data);
   });

};

/**
 * @api {patch} /issue/:id Update Issue
 * @apiName Update
 * @apiGroup Issue
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} issueID Issue id
 * @apiParam {String} issueName Issue name
 * @apiParam {String} issueDescription Issue description
 * @apiParam {String} issueState Issue state
 *
 * @apiSuccess {Number} issueID retrieved updated Issue id
 * @apiSuccess {String} issueName retrieved updated Issue name
 * @apiSuccess {String} issueDescription retrieved updated Issue description
 * @apiSuccess {String} issueState retrieved updated Issue state
 * @apiSuccess {String} issueModifiedDate retrieved updated Issue last modified date ISO8601 format
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "issueID" : 1,
 *       "issueName" : "test ",
 *       "issueDescription" : "test testest",
 *       "issueState" : "open",
 *       "issueModifiedDate":"2017-10-23T11:51:16.000Z"
 *     }
 * 
 * @apiError (500 Internal Server Error) Error there was an error when trying to generate response.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "sql error"
 *     }
 */
exports.update = function(req, res) {

   // @todo validate input data
   let issue = {
      issueID : req.body.issueID,
      issueName : req.body.issueName,
      issueDescription : req.body.issueDescription,
      issueState : req.body.issueState 
   };

   model.update(issue, function(err, data) {
      if (err) {
         res.status(500).json({ message: err + '' });
      }
      res.status(200).json(data);
   });
   
};


/**
 * @api {delete} /issue/:id Delete Issue
 * @apiName Delete
 * @apiGroup Issue
 * @apiVersion 1.0.0
 *
 * @apiParam {Number} id Issue id
 *
 * @apiSuccess {String} message string indicating successful deletion
 *
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "message" : "Issue successfully deleted"
 *     }

 * @apiError (500 Internal Server Error) Error there was an error when trying to generate response.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "sql error"
 *     }
 */
exports.remove = function(req, res) {

   // @todo validate
   
   
   model.remove(req.params.id, function(err) {
      if (err) {
         res.status(500).json({ message: err + '' });
      }
      let message = 'Issue successfully deleted';
      res.status(200).json({ message: message });
   });

};


/**
 * @api {post} /issue Create Issue
 * @apiName Create
 * @apiGroup Issue
 * @apiVersion 1.0.0
 *
 * @apiParam {String} issueName Issue name
 * @apiParam {String} issueDescription Issue description
 *
 * @apiSuccess {Number} issueID retrieved created Issue id
 * @apiSuccess {String} issueName retrieved created Issue name
 * @apiSuccess {String} issueDescription retrieved created Issue description
 * @apiSuccess {String} issueState retrieved created Issue state
 * @apiSuccess {String} issueModifiedDate retrieved created Issue last modified date ISO8601 format
 * 
 * @apiSuccessExample Success-Response:
 *     HTTP/1.1 200 OK
 *     {
 *       "issueID" : 1,
 *       "issueName" : "test ",
 *       "issueDescription" : "test testest",
 *       "issueState" : "open",
 *       "issueModifiedDate":"2017-10-23T11:51:16.000Z"
 *     }
 
 * 
 * @apiError (500 Internal Server Error) Error there was an error when trying to generate response.
 *
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 500 Internal Server Error
 *     {
 *       "message": "sql error"
 *     }
 */
exports.create = function(req, res) {

   // @todo validate input data
   let issue = {
      issueName : req.body.issueName,
      issueDescription : req.body.issueDescription
   };
   
   model.create(issue, function(err, data) {
      if (err) {
         res.status(500).json({ message: err + '' });
      }
      res.status(200).json(data);
   });

};

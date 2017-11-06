'use strict';

let request = require('supertest');

let url = 'http://localhost:3000/api/v1/';
let issueID = 1;

describe('Issue Controller', function () {

   describe('Success', function () {
   
      it('should create a new issue', function (done) {
         
         let req = request(url).post('issue');
         
         let issue = {
            issueName : 'test test',
            issueDescription : 'testing test test'
         };
      
         req.cookies = global.cookies;
      
         req.send(issue).end(function(err, res) {
            res.status.should.be.equal(200);
            res.body.should.have.property('issueID');
            issueID = res.body.issueID;
            done();
         });
      });
   
      it('should return a single issue by ID', function (done) {
         let req = request(url).get('issue/' + issueID);
         
         req.cookies = global.cookies;
         
         req.end(function(err, res) {
            res.status.should.be.equal(200);
            res.body.should.be.instanceof(Object);
            done();
         });
      });
   
      it('should update a specific issue\'s attributes', function (done) {
         let req = request(url).patch('issue/' + issueID);
         let updates = { 
            'issueID' : issueID,
            'issueName' : 'testing', 
            'issueDescription':'testing',
            'issueState':'closed'
         };
         
         req.cookies = global.cookies;
         
         req.send(updates).end(function(err, res) {
            res.status.should.be.equal(200);
            res.body.should.be.instanceof(Object);
            done();
         });
      });
   
      it('should delete an issue', function (done) {
         let req = request(url).del('issue/' + issueID);
         req.cookies = global.cookies;
      
         req.end(function(err, res) {
            res.status.should.be.equal(200);
            res.body.should.have.property('message');
            done();
         });
      });
      
      it('should get a list of issues', function (done) {
         let req = request(url).get('issue');
         req.cookies = global.cookies;
      
         req.end(function(err, res) {
            res.status.should.be.equal(200);
            res.body.should.be.instanceOf(Array);
            done();
         });
      });
      
   });

});


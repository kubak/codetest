'use strict';


let should = require('should');
let mockery = require('mockery');

let mockMysql = require('../mysqlMock');

let Model, model;


describe('Issue Model', function () {
   let issueID = 2;
   
   describe('Success', function () {
      before(function () {
         Model = require('../../api/models/issue');
         model = new Model();
      });
   
      it('should create a new issue', function (done) {
         let testName = 'test issue name';
         let testDescription = 'test issue description';
         model.create({
            issueName : testName,
            issueDescription : testDescription,
         }, function (err, data) {
            should(data).be.instanceOf(Object);
            should(data.issueID).be.instanceOf(Number);
            issueID = data.issueID;
            done();
         });
      });
   
      it('should update existing issue', function (done) {
         let testName = 'new test issue Name';
         let testDescription = 'new test issue Description';
         model.update({
            issueID : issueID,
            issueName : testName,
            issueDescription : testDescription,
            issueState : 'open'
         }, function (err, data) {
            should(data).be.instanceOf(Object);
            should(data.issueID).be.instanceOf(Number);
            should(data.issueName).be.equal(testName);
            should(data.issueDescription).be.equal(testDescription);
            done();
         });
      });
   
      it('should return a single issue by ID', function(done) {
         model.get(issueID, function (err, data) {
            should(data).be.instanceOf(Object);
            should(data.issueID).be.equal(issueID);
            should(data.issueName).be.instanceOf(String);
            done();
         });
      });
   
      it('should get a list of issues', function (done) {
         model.list(function (err, data) {
            should(data).be.instanceOf(Array);
            done();
         });
      });
   
      it('should delete a single issue by ID', function (done) {
         model.remove(issueID, function (err, data) {
            should(data).be.instanceOf(Object);
            done();
         });
      });
   });
   
   describe('Failure', function () {
      before(function (done) {
         mockery.registerMock('mysql2', mockMysql);
         
         mockery.enable({ 
            useCleanCache: true,
            warnOnReplace: false,
            warnOnUnregistered: false
         });
         Model = require('../../api/models/issue');
         model = new Model();
         done();
      });
   
      after(function (done) {
         mockery.disable();
         Model = require('../../api/models/issue');
         model = new Model();
         done();
      });
      
      it('should handle sql error when getting a list of issues', function (done) {
         model.list(function (err, data) {
            should(err).be.instanceOf(String);
            done();
         });
      });
      
      it('should handle sql error when getting a single issue by issueID', function (done) {
         model.get(issueID, function (err, data) {
            should(err).be.instanceOf(String);
            done();
         });
      });
      
      it('should handle sql error when creating an issue', function (done) {
         model.create({
            issueName : 'testing', 
            issueDescription : 'testing'
         }, function (err, data) {
            should(err).be.instanceOf(String);
            done();
         })
      });
      
      it('should handle sql error when updating existing issue', function (done) {
         model.update({
            issueID : 1,
            issueName : 'testing',
            issueDescription : 'testing'
         }, function (err, data) {
            should(err).be.instanceOf(String);
            done();
         });
      });
      
      it('should handle sql error when deleting an existing issue', function (done) {
         model.remove(1, function (err, data) {
            should(err).be.instanceOf(String);
            done();
         });
      });
   });
   

});



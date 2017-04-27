const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();
const app = server.app;
const storage = server.storage;
//const describe = require('chai');
const expect = require('chai').expect;
const passport = require('passport');
const {BasicStrategy} = require('passport-http');

chai.use(chaiHttp);

//const describe = mocha.describe
//const it = mocha.it
const assert = require('chai').assert

describe('scores page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/scores')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.be.a('array');
        res.body.should.have.length.of.at.least(1);
        done();
    });
  });
});

describe('GET endpoint for existing users', function() {
  it('should log existing users in', function(done) {
    chai.request(app)
      .get('/existing')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('PATCH endpoint', function() {
  it('should update score if submitted score is higher', function(done) {
    chai.request(app)
      .patch('/users/:score')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('PATCH endpoint', function() {
  it('should update currentScore when "save" is clicked', function(done) {
    chai.request(app)
      .patch('/currentScore/:score')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('PATCH endpoint', function() {
  it('should reset currentScore to 0 on gameOver function', function(done) {
    chai.request(app)
      .patch('/eraseCurrentScore')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('GET endpoint', function() {
  it('should load previously saved score', function(done) {
    chai.request(app)
      .get('/loadScore')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('GET endpoint', function() {
  it('should create new user', function(done) {
    chai.request(app)
      .post('/users')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('GET endpoint', function() {
  it('should log user in', function(done) {
    chai.request(app)
      .get('/users')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

describe('GET endpoint', function() {
  it('should log user out', function(done) {
    chai.request(app)
      .get('/logout')
      .end(function(err, res) {
        res.body.should.be.a('object');
        done();
        })
    });
  });

module.exports = app
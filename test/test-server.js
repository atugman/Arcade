var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../server.js');

var should = chai.should();
var app = server.app;
var storage = server.storage;

chai.use(chaiHttp);

describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.html;
        done();
    });
  });
});


/*
describe('arcade', function() {

  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  describe('GET endpoint', function() {

    it('should return high scores', function() {
      let res;
      return chai.request(app)
        .get('/arcade')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
        })
    });
});
});
*/
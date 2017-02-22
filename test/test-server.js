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



describe('arcade', function() {

  before(function() {
    return runServer();
  });
/*
  beforeEach(function() {
    return seedBlogPostData();
  });

  afterEach(function() {
    // tear down database so we ensure no state from this test
    // effects any coming after.
    return tearDownDb();
  });
*/
  after(function() {
    return closeServer();
  });


  describe('GET endpoint', function() {

    it('should return high scores in descending order', function() {
      let res;
      return chai.request(app)
        .get('/highScores')
        .then(_res => {
          res = _res;
          res.should.have.status(200);
          //res.body.should.be.a.number();
        })
    });
});
});

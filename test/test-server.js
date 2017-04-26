const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const should = chai.should();
const app = server.app;
const storage = server.storage;
//const describe = require('chai');
const expect = require('chai').expect;

chai.use(chaiHttp);

//const describe = mocha.describe
//const it = mocha.it
const assert = require('chai').assert

  describe('#indexOf()', function() {
    it('should return -1 when not present', function() {
      assert.equal([1,2,3].indexOf(4), -1)
    })
  })

describe('scores page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/scores')
      .end(function(err, res) {
        res.should.have.status(200);
        res.should.be.json;
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

/*const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../server.js');

const expect = require('chai').expect;

const should = chai.should();
const app = server.app;
const storage = server.storage;

const mocha = require('mocha')
const describe = mocha.describe
const it = mocha.it
const assert = require('chai').assert

//const {app, runServer, closeServer} = require('../server');

chai.use(chaiHttp);

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve();
    })
    .on('error', err => {
      reject(err);
    });
  });
}

function runServer() {
  const port = process.env.PORT || 8080;
  return new Promise((resolve, reject) => {
    server = app.listen(port, () => {
      console.log(`Your app is listening on port ${port}`);
      resolve(server);
    }).on('error', err => {
      reject(err)
    });
  });
}

function closeServer() {
  return new Promise((resolve, reject) => {
    console.log('Closing server');
    server.close(err => {
      if (err) {
        reject(err);
        // so we don't also call `resolve()`
        return;
      }
      resolve();
    });
  });
}

if (require.main === module) {
  runServer().catch(err => console.error(err));
};


describe('Server', function() {
    before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });
  it('should list scores on GET', function() {
    return chai.request(app)
      .get('/scores')
      .then(function(res) {
        res.should.have.status(200);
        res.should.be.json;
        //res.body.should.be.a('array');
        //res.body.length.should.be.at.least(1);
        // each item should be an object with key/value pairs
        // for `id`, `name` and `checked`.
        //const expectedKeys = ['id', 'name', 'checked'];
        //res.body.forEach(function(item) {
          //item.should.be.a('object');
          //item.should.include.keys(expectedKeys);
        //});
      });
  });
});




describe('index page', function() {
  it('exists', function(done) {
    chai.request(app)
      .get('/')
      .end(function(err, res) {
        res.should.have.status(200);
        done();
    });
  });
});
*/

module.exports = app
const chai = require('chai');
const chaiHttp = require('chai-http');

const mongoose = require('mongoose');

// this makes the should syntax available throughout
// this module
const should = chai.should();

const {DATABASE_URL} = require('../config');
const {USER} = require('../../models');
const {closeServer, runServer, app} = require('../server');
const {TEST_DATABASE_URL} = require('../config');

chai.use(chaiHttp);

  describe('GET endpoint', function() {

    it('should return all scores', function() {
      let res;
      return chai.request(app)
        .get('/scores')
        .then(_res => {
          res = _res;
          //res.should.have.status(200);
          res.body.should.have.length.of.at.least(1);

          //return BlogPost.count();
        })
        //.then(count => {
        //  res.body.should.have.length.of(count);
        //});
    });
  });
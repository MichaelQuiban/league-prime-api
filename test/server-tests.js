var chai = require('chai');
var chaiHttp = require('chai-http');
const {app, runServer, closeServer} = require('../server');

var should = chai.should();

chai.use(chaiHttp);

describe('Server', function() {
  before(function() {
    return runServer();
  });

  after(function() {
    return closeServer();
  });

  it('should return 200', function(done) {
    chai.request(app)
      .get('/server')
      .then(function(res) {
        res.should.have.status(200);
      });
      done();
    });

  describe ('')

 });
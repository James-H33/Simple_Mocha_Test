const mongoose = require('mongoose');
const Movie = require('../models/movieModel');

const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../app');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Get /movies', function() {
    it('should return status code 200', function(done) {
        chai.request(server)
            .get('/movies')
            .end(function(err, results) {
                expect(err).to.be.null;
                expect(results).to.have.status(200);
                done();
            });
    });
});

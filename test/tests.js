const mongoose  = require('mongoose');
const Movie     = require('../models/movieModel');

const chai      = require('chai');
const chaiHttp  = require('chai-http');
const server    = require('../app'); // app.js
const expect    = chai.expect;

// Tell Chai to
chai.use(chaiHttp);



// Checks Get Route for Successful status
describe('GET /', function() {
    it('should return status code 200', function(done) {
        chai.request(server) // Point to server to make request
            .get('/') // make GET request
            .end(function(err, results) {
                expect(err).to.be.null; // There should be no err || null
                expect(results).to.have.status(200); // Request should be succesful
                done(); // done function makes sure that expectation code is executed
            });
    });
});



// Gets all books and return to user
describe('GET /moives', function() {
    it('should return all movies to the user', function(done) {
        chai.request(server)
            .get('/movies')
            .end(function(err, results) {
                    expect(err).to.be.null;
                    expect(results).to.have.status(200);
                    expect(results.body).to.be.a('array');
                    expect(results.body.length).to.equal(6);
                done();
            });
    });
});



// Post books
describe('POST /movies', function() {
    it('should not post a book without a year', function(done) {
        let myMovie = {
            title: 'The Martian',
            rating: 5
        }

        chai.request(server)
            .post('/movies')
            .send(myMovie)
            .end(function(err, results) {
                    expect(err).to.be.null;
                    expect(results.body).to.be.a('object');
                    expect(results).to.have.status(200);
                    expect(results.body).to.have.property('err');
                    expect(results.body.err.errors).to.have.property('year');
                    expect(results.body.err.errors.year).to.have.property('kind').equal('required');
                done();
            });
    });
});



// Get movie by id
describe('GET /movies/:id', function() {
    it('should get one movie by id', function(done) {
        chai.request(server)
            .get('/movies/57bc490d3d3feb1b1af6bd26')
            .end(function(err, results) {
                    expect(err).to.be.null;
                    expect(results).to.have.status(200);
                    expect(results.body).to.have.property('title');
                    expect(results.body.title).equal('Forrest Gump');
                done();
            });
    });
});



// PUT movie title
describe('PUT /movies/:id', function() {
    it('should change the title of a movie by id', function(done) {
        let newTitle = {
            title: 'The Dark Knight'
        }

        chai.request(server)
            .put('/movies/57bc52a51a97e8621a016506')
            .send(newTitle)
            .end(function(err, results) {
                    expect(err).to.be.null;
                    expect(results).to.have.status(200);
                    expect(results.body.results.title).equal('The Dark Knight');
                done();
            });
    });
});


// DELETE Movie // Creates and Saves movie then deletes that movie by id
describe('DELETE Movie', function() {
    it('should change the delete movie with id', function(done) {
        let myMovie = new Movie ({
            title: 'The Thing',
            year: 1980,
            rating: 4
        });

        myMovie.save(function(err, movie) {
            chai.request(server)
                .delete('/movies/' + movie.id)
                .end(function(err, results) {
                        expect(err).to.be.null;
                        expect(results).to.have.status(200);
                        expect(results.body).to.have.property('message');
                        expect(results.body.message).equal('Movie was deleted.');
                    done();
                });
        });
    });
});

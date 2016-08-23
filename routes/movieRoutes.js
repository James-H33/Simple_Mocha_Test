const express  = require('express');
const router   = express.Router();

// Import Models
const Movie = require('../models/movieModel');


// Get all movies
router.get('/movies', function(req, res, next) {
    Movie.find({}, function(err, results) {
        if(err) {
            console.log(err);
            return res.send(err);
        }
        console.log(results);
        res.json(results);
        // res.render('movies/movies', { movies: results });
    });
});



// Post a new movie
router.post('/movies', function(req, res, next) {

    let newMovie = new Movie ({
        title: req.body.title,
        year: req.body.year,
        rating: req.body.rating
    });

    newMovie.save(function(err, results) {
        if (err) {
            console.log('This is the error ' + err);
            return res.send({ err, message: 'Movie is missing input field' });
        }
        res.json({ message: 'Movie was saved.' });
        // res.redirect('/movies');
    });
});



// Get Movies by id
router.get('/movies/:id', function(req, res, next) {
    let movieId = req.params.id;
    Movie.findById(movieId, function(err, results) {
        if(err) {
            console.log(err);
            return res.send(err);
        }
        res.json(results)
    });
});



// Edit movie by id
router.put('/movies/:id', function(req, res, next) {
    let movieId = req.params.id;
    Movie.findById(movieId, function(err, results) {
        if(err) {
            return res.send(err);
        }
        Object.assign(results, req.body).save(function(err, results) {
            if(err) {
                return res.send(err);
            }
            res.json({ message: 'Movie was updated!', results });
        });
    });
});



// Delete movie by id
router.delete('/movies/:id', function(req, res, next) {
    Movie.findByIdAndRemove(req.params.id, function(err, results) {
        if(err) {
            console.log(err);
            return res.send(err);
        }
        res.json({ message: 'Movie was deleted.' });
    });
});



module.exports = router;

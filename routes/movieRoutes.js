const express = require('express');
const router = express.Router();

// Import Models
const Movie = require('../models/movieModel');

router.get('/movies', function(req, res, next) {
    res.render('movies/movies');
});

module.exports = router;

const mongoose = require('mongoose');
const Movie = require('../models/movieModel');

mongoose.connect('mongodb://localhost/simple_mocha');

const movies = [
    new Movie ({
        title: 'Interstellar',
        year: 2014,
        rating: 5
    }),
    new Movie ({
        title: 'Ex Machina',
        year: 2015,
        rating: 5
    }),
    new Movie ({
        title: 'Star Trek: Into Darknesss',
        year: 2013,
        rating: 5
    })
]

var done = 0;
for (var i = 0; i < movies.length; i++) {
    movies[i].save(function() {
        done++;
        if(done === movies.length) {
            exit();
        }
    });
}

function exit() {
    mongoose.disconnect();
}

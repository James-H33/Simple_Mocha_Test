const express       = require('express');
const mongoose      = require('mongoose');
const logger        = require('morgan');
const bodyParser    = require('body-parser');

// Routes
const movieRoutes = require('./routes/movieRoutes');

// Declare App
const app = express();

// Ports
const port    = process.env.PORT || 3030;
const portIP  = process.env.IP;

// connect to mongodb
mongoose.connect('mongodb://localhost/simple_mocha');

// Express Settings
app.set('view engine', 'ejs');
app.use(logger('dev'));
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// Home Route
app.get('/', function(req, res, next) {
    res.render('index');
});

// Use Routes
app.use('/', movieRoutes);

app.listen(port, portIP, function() {
    console.log('Server has started...');
});

// MUST EXPORT APP FOR TESTING
module.exports = app;

const express = require('express');

const app = express();

// Built in middleware
app.use(express.json());

// App routes
app.use('/api/v1/two_strokes', require('./controllers/two-strokes'));
app.use('/api/v1/flight_controllers', require('./controllers/flight-controllers'));
app.use('/api/v1/dragons', require('./controllers/dragons'));
app.use('/api/v1/hamburgers', require('./controllers/hamburgers'));
app.use('/api/v1/colors', require('./controllers/colors'));

// Error handling & 404 middleware for when
// a request doesn't match any app routes
app.use(require('./middleware/not-found'));
app.use(require('./middleware/error'));

module.exports = app;

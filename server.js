// SETUP
// =====================================================================================
// require modules
var express = require('express');
var bodyParser = require('body-parser');
var path = require('path');
var apiRoutes = require('./routing/apiRoutes');
var htmlRoutes = require('./routing/htmlRoutes');

// create middleware
var app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// specify port
var PORT = process.env.PORT || 3000;

// ROUTING
// =====================================================================================


// LISTENING
// =====================================================================================
// create port listener
app.listen(PORT, (err, res) => {
    console.log(`Listening on http://localhost:${PORT}`);
});
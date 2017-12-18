// SETUP
// =====================================================================================
var express = require('express');
var path = require('path');
var friends = require('../data/friends');
var router = express.Router();

// ROUTING
// =====================================================================================
router.get('/friends', (req, res) => {
    res.json(friends);
});

router.post('/friends', (req, res) => {
    res.json(req.body);
});

// EXPORT
// =====================================================================================
module.exports = router;
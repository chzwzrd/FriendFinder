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
    var newFriend = req.body;

    // convert user's scores from string to number
    newFriend.scores = newFriend.scores.map(Number);

    compareScores(newFriend);

    friends.push(newFriend);

    res.json(newFriend);
});

// FUNCTIONS
// =====================================================================================
// compare user's scores with each existing friend & find total difference in scores for each
function compareScores(user) {
    var friendResults = [];
    for (var i = 0; i < friends.length; i++) {
        var totalDifference = 0;
        for (var j = 0; j < user.scores.length; j++) {
            totalDifference += Math.abs(user.scores[j] - friends[i].scores[j]);
        }
        friendResults.push([friends[i].name, friends[i].photo, totalDifference]);
    }
    console.log(friendResults);
}

// EXPORT
// =====================================================================================
module.exports = router;
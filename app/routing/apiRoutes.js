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

    // console insight
    console.log('\n========== USER ==========');
    console.log(newFriend);

    // find which friend most compatible (smallest total difference in scores)
    var friendMatch = compareScores(newFriend);

    // push newFriend to friends list only after comparing scores
    // because don't want to compare the user with his/her data when looping through friends array
    friends.push(newFriend);

    // send back info (name, photo, totalDifference) of most compatible friend
    res.json(friendMatch);
});

// FUNCTIONS
// =====================================================================================
// compare user's scores with each existing friend & find total difference in scores for each
function compareScores(user) {

    var friendInfo = {
        friendProfiles: [],
        friendResults: []
    }

    for (var i = 0; i < friends.length; i++) {
        var totalDifference = 0;
        for (var j = 0; j < user.scores.length; j++) {
            totalDifference += Math.abs(user.scores[j] - friends[i].scores[j]);
        }
        friendInfo.friendProfiles.push([friends[i].name, friends[i].photo, totalDifference]);
        friendInfo.friendResults.push(totalDifference);
    }

    console.log('========== FRIEND PROFILES ==========');
    console.log(friendInfo.friendProfiles);
    console.log('========== FRIEND RESULTS ==========\n');
    console.log(friendInfo.friendResults);
    console.log();

    var friendMatchIndex = findMinIndex(friendInfo.friendResults);
    return friendInfo.friendProfiles[friendMatchIndex];

}

// https://stackoverflow.com/questions/11301438/return-index-of-greatest-value-in-an-array
function findMinIndex(arr) {
    var min = arr[0];
    var minIndex = 0;

    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < min) {
            min = arr[i];
            minIndex = i;
        }
    }
    return minIndex;
}

// EXPORT
// =====================================================================================
module.exports = router;
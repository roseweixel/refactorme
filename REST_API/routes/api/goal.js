var mongoose = require('mongoose');
var Goal = require('../../models/goal');
var User = require('../../models/user');

module.exports.addGoal = function(req, res) {
    var goal = new Goal(req.body.goal);
    User.findByIdAndUpdate(goal.user,
      { $push: { goals: goal }},
      { safe: true, upsert: true },
      function(err) {
        if (err) {
            res.send(err);
        }
      });
    goal.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({goal: goal});
    });
};

module.exports.getAllGoals = function(req, res) {
    Goal.find(function(err, goals) {
        if (err) {
            res.send(err);
        }
        res.json({goals: goals});
    })
};

module.exports.getSingleGoal = function(req, res, id) {
    Goal.findById(id, function(err, goal) {
        if (err) {
            res.send(err);
        }
        res.json({goal: goal})
    });
};

module.exports.updateGoal = function(req, res, id) {
    // updates only the fields that are sent through in the form data
    Goal.findByIdAndUpdate(id, {$set: req.body.goal}, function(err, goal) {
        if (err) {
            res.send(err);
        }
        // the previous version of the goal is being returned, though the goal is being updated
        res.json({goal: goal});
    });
};

module.exports.deleteGoal = function(req, res, id) {
    Goal.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send(err);
        }
        res.sendStatus(200);
    });
};

// extra route I created for deleting all the goals at once
module.exports.deleteGoals = function(req, res) {
    Goal.find(function(err, goals) {
        goals.forEach(function(goal) {
            Goal.findByIdAndRemove(goal.id, function(err) {
                if (err) {
                    res.send(err);
                }
            });
        });
        res.sendStatus(200);
    });
};

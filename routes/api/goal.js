var mongoose = require('mongoose');
var Goal = require('../../models/goal');

module.exports.addGoal = function(req, res) {
    var goal = new Goal(req.body.post);
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

module.exports.getSingleGoal = function(req, res, id) {};

module.exports.updateGoal = function(req, res, id) {};

module.exports.deleteGoal = function(req, res, id) {};

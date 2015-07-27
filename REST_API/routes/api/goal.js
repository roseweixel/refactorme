var mongoose = require('mongoose');
var Goal = require('../../models/goal');
var User = require('../../models/user');

module.exports.addGoal = function(req, res) {
    var goal = new Goal(req.body.goal);
    User.findByIdAndUpdate(goal.user,
      { $push: { goals: goal }},
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
    Goal.findByIdAndUpdate(id, {$set: req.body.goal}, {new: true}, function(err, goal) {
        if (err) {
            res.send(err);
        }
        // the previous version of the goal is being returned, though the goal is being updated
        console.log(goal);
        res.json({goal: goal});
    });
};

module.exports.deleteGoal = function(req, res, id) {
    Goal.findById(id, function (err, goal) {
        deleteYouselfFromUser(goal);
    });

    function deleteYouselfFromUser(goal) {
        User.findOneAndUpdate({_id: goal.user}, {$pull: {goals: goal.id}}).exec();
    };

    Goal.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send(err);
        }
        res.status(200).send({ success: true });
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
        res.status(200).send({ success: true });
    });
};

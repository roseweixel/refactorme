var express = require('express');
var router = express.Router();

var goals = require('./api/goal');

// Goals routes 
router.route('/goals')
    .post(function(req, res) { goals.addGoal(req, res) })
    .get(function(req, res) { goals.getAllGoals(req, res) })
    .delete(function(req, res) { goals.deleteGoals(req, res) });

// Single goal routes
router.route('/goals/:goal_id')
    .get(function(req, res) { goals.getSingleGoal(req, res, req.params.goal_id) })
    .put(function(req, res) { goals.updateGoal(req, res, req.params.goal_id) })
    .delete(function(req, res) { goals.deleteGoal(req, res, req.params.goal_id) });

module.exports = router;

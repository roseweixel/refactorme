var express = require('express');
var router = express.Router();

var goals = require('./api/goal');

// Posts routes 
router.route('/goals')
    .post(function(req, res) { goals.addGoal(req, res) })
    .get(function(req, res) { goals.getAllGoals(req, res) });

// Single post routes
router.route('/posts/:post_id')
    .get(function(req, res) { goals.getSingleGoal(req, res, req.params.post_id) })
    .put(function(req, res) { goals.updateGoal(req, res, req.params.post_id) })
    .delete(function(req, res) { goals.deleteGoal(req, res, req.params.post_id) });

module.exports = router;

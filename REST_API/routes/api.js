var express = require('express');
var router = express.Router();

var goals = require('./api/goal');
var users = require('./api/user');

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

/* Users routes */
router.route('/users')  
    .post(function(req,res) { users.addUser(req,res) })
    .get(function(req,res) { users.getAllUsers(req,res) });

/* Single user routes */
router.route('/users/:user_id')  
    .get(function(req, res) { users.getSingleUser(req, res, req.params.user_id) })
    .put(function(req, res) { users.updateUser(req, res, req.params.user_id) })
    .delete(function(req, res) { users.deleteUser(req, res, req.params.user_id) });


module.exports = router;

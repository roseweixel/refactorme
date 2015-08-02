var mongoose = require('mongoose');
var User = require('../../models/user');

module.exports.addUser = function(req, res) {
    var user = new User(req.body.user);
    user.save(function(err) {
        if (err) {
            res.send(err);
        }
        res.json({user: user});
    });
};

module.exports.getAllUsers = function(req, res) {
    User.find(function(err, users) {
        if (err) {
            res.send(err);
        }
        res.json({users: users});
    })
};

module.exports.getSingleUser = function(req, res, id) {
    User.findById(id, function(err, user) {
        if (err) {
            res.send(err);
        }
        res.json({user: user})
    });
};

module.exports.findOrCreateByTwitterID = function(req, res) {

    var twitterID = req.query.twitterID;

    User.findOne({twitterID: twitterID}, function (err, user){
        if (!user) {
            var user = new User(req.query);
            user.joinDate = new Date;
            user.save(function(err) {
                if (err) {
                    res.send(err);
                }
                console.log({user: user});
                res.redirect('http://localhost:4200/users/' + user.id);
            });
        } else {
            User.findByIdAndUpdate(user.id, {$set: req.query}, {new: true}, function(err, user) {
                if (err) {
                    res.send(err);
                }
                res.redirect('http://localhost:4200/users/' + user.id);
            });
        }
    });
};


module.exports.updateUser = function(req, res, id) {
    // updates only the fields that are sent through in the form data
    User.findByIdAndUpdate(id, {$set: req.body.user}, function(err, user) {
        if (err) {
            res.send(err);
        }
        // the previous version of the user is being returned, though the user is being updated
        res.json({user: user});
    });
};

module.exports.deleteUser = function(req, res, id) {
    User.findByIdAndRemove(id, function(err) {
        if (err) {
            res.send(err);
        }
        res.sendStatus(200);
    });
};

// extra route I created for deleting all the users at once
module.exports.deleteUsers = function(req, res) {
    User.find(function(err, users) {
        users.forEach(function(user) {
            User.findByIdAndRemove(user.id, function(err) {
                if (err) {
                    res.send(err);
                }
            });
        });
        res.sendStatus(200);
    });
};

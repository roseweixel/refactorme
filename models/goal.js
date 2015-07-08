var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: String,
    date: Date, 
    creator: String,
    description: String
});

module.exports = mongoose.model('Goal', GoalSchema);

var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: String, 
    creator: String,
    description: String
});
// {"goal":{"name":"Learn Node!","creator":"Rose","date":"07/07/2015","description":"This is going to be awesome!"}}

module.exports = mongoose.model('Goal', GoalSchema);


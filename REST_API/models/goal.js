var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: String, 
    startDate: Date,
    endDate: Date,
    creator: String,
    description: String
});
// {"goal":{"name":"Learn Node!","creator":"Rose","description":"This is going to be awesome!"}}

module.exports = mongoose.model('Goal', GoalSchema);


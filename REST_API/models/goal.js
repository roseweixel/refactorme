var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
var Schema = mongoose.Schema;

var GoalSchema = new Schema({
    name: String, 
    startDate: Date,
    endDate: Date,
    user: { type: mongoose.Schema.ObjectId, ref: 'User' },
    description: String
});
// {"goal":{"name":"Learn Node!","user":"55a1d1117dada8478f1e593a","description":"This is going to be awesome!","startDate":"07/07/2015","endDate":null}}

module.exports = mongoose.model('Goal', GoalSchema);


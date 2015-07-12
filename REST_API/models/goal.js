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
// {"goal":{"name":"Learn Node!","creator":"Rose","description":"This is going to be awesome!","startDate":"07/07/2015","endDate":null}}
// {"goal":{"name":"Learn Node!","user":"55a1bea73c2b1fa985f97d2e","description":"This is going to be awesome!","startDate":"07/07/2015","endDate":null}}

module.exports = mongoose.model('Goal', GoalSchema);


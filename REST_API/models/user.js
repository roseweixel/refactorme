var mongoose = require('mongoose');
var id = mongoose.Types.ObjectId();
var Schema = mongoose.Schema;

var UserSchema = new Schema({
    name: String,
    joinDate: Date,
    goals: [{ type: mongoose.Schema.ObjectId, ref: 'Goal' }]
});

module.exports = mongoose.model('User', UserSchema);

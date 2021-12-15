const mongoose = require('./connection');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
	name: { type: String, require: true },
	score: { type: Number, require: true },
});

module.exports = mongoose.model('User', UserSchema);

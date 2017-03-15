const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArcadeSchema = new Schema({
	name: String,
	score: Number
});

module.exports = mongoose.model('Arcade', ArcadeSchema);

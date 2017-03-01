const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ArcadeSchema = new Schema({
	userName: String,
	//password: String,
	score: Number,
	publishedAt: Number,
});

module.exports = mongoose.model('arcade', ArcadeSchema);

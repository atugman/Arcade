const express = require('express');
const app = express();
//const mongoose = require('mongoose');
//const User = require('./models/user')
//mongoose.connect('mongodb://localhost:27017/arcade')

app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
exports.app = app;

app.get('../public/app.js', (req, res) => {
  res.json(arcade.get());
});
/*
app.post('/user', function(req, res) {
	// ajax
	const user = new User()
	user.username = req.body.username  //req.body.text
	user.password = req.body.password
	user.
	user.location = 'NC'

	user.save(function(err, user){
		if (err) {
			res.send(err)
		} else {
			res.json(user);
		};
	});
});
*/
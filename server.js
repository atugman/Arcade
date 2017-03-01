const express = require('express');
const app = express();
//const morgan = require('morgan');

const mongoose = require('mongoose');
const User = require('./models/user')
mongoose.connect('mongodb://localhost:27017/arcade')

//app.use(morgan('common'));
//app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
exports.app = app;

var MOCK_HIGH_SCORES = {
    "highScores": [
        {
            "id": "1111111",
            "score": 900,
            "userID": "aaaaaa",
            "userName": "John Doe",
            "publishedAt": 1470016976609
        },
        {
            "id": "2222222",
            "score": 800,
            "userID": "bbbbbbb",
            "userName": "Jane Doe",
            "publishedAt": 1470012976609
        },
        {
            "id": "333333",
            "score": 733,
            "userID": "cccc",
            "userName": "Jim Doe",
            "publishedAt": 1470011976609
        },
        {
            "id": "4444444",
            "score": 933,
            "userID": "ddddd",
            "userName": "Jackie Doe",
            "publishedAt": 1470009976609
        }
    ]
}


//GET REQUEST

app.get('/arcade', (req, res) => {
  res.json(arcade.scores);
});

//POST REQUEST

app.post('/arcade/newuser', function(req, res) {
	const requiredFields = ['score', 'userName', 'publishedAt'];
  	for (let i=0; i<requiredFields.length; i++) {
    	const field = requiredFields[i];
    	if (!(field in req.body)) {
      		const message = `Missing \`${field}\` in request body`
      		console.error(message);
      		return res.status(400).send(message);
    }
  }
	arcade //mongoose model
		.create({
			score: req.body.score,
			userName: req.body.userName,
			publishedAt: req.body.publishedAt
		})
		.then(arcade => res.status(201).json(arcade.apiRepr()))
    	.catch(err => {
        	console.error(err);
        	res.status(500).json({error: 'Something went wrong'});
    	});
    	//const newItem = arcade.create(req.body.score, req.body.userName, req.body.publishedAt);
  		//res.status(201).json(item);
});

//PUT REQUEST

app.put('/arcade/:id', (req, res) => {
  if (!(req.params.id && req.body.id && req.params.id === req.body.id)) {
    res.status(400).json({
      error: 'Request path id and request body id values must match'
    });
  }

  const updated = {};
  const updateableFields = ['score', 'userName', 'publishedAt'];
  updateableFields.forEach(field => {
    if (field in req.body) {
      updated[field] = req.body[field];
    }
  });

  arcade
    .findByIdAndUpdate(req.params.id, {$set: updated}, {new: true})
    .exec()
    .then(updatedUser => res.status(201).json(updatedPost.apiRepr()))
    .catch(err => res.status(500).json({message: 'Something went wrong'}));
});

//DELETE REQUEST

app.delete('/arcade/:id', (req, res) => {
  arcade
    .findByIdAndRemove(req.params.id)
    .exec()
    .then(() => {
      res.status(204).json({message: 'success'});
    })
    .catch(err => {
      console.error(err);
      res.status(500).json({error: 'something went terribly wrong'});
    });
});


//add run/close server functions
const express = require('express');
const app = express();
//const morgan = require('morgan');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Arcade = require('./models/arcade')
mongoose.connect('mongodb://atugman:unc123@ds157529.mlab.com:57529/arcade')

var router = express.Router();

//const {PORT, DATABASE_URL} = require('./config');

//app.use(morgan('common'));
//app.use(bodyParser.json());
app.use(express.static('public'));
app.listen(process.env.PORT || 8080);
exports.app = app;

//GET REQUEST
/*
app.get('/arcade', (req, res) => {
  res.json(arcade.score);
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
*/





//notes from ray

//yarn add express mongoose

//create files and stuff

//const express = require('express');
//const app = express();

//app.listen(8080, () => console.log('hey'))

//replace function keyword with =>

//use nodemon

//const mongoose = require('mongoose');

//const arcade = require('.models/arcade')

app.get('/test', (req, res) => {
  arcade.find((err, scores) => {
    if(err)
      res.send(err)
    res.json(scores)
  })
})

app.post('/scores', (req, res) => {
  const arcade = new Arcade()
  arcade.name = "andrew"
  arcade.score = 7 //replace with ajax reference?
  arcade.save((error) => {
    if(error) {
      res.send(error)
    } else {
      res.json({msg: 'scores updated'})
    }
  }
)
});


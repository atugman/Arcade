const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');

const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const Arcade = require('./models/arcade')
const User = require('./models/users')

mongoose.connect('mongodb://atugman:unc123@ds157529.mlab.com:57529/arcade')

const router = express.Router();
const {router: usersRouter} = require('./users');

app.use('/users/', usersRouter);

const {PORT, DATABASE_URL} = require('./config');

//moved to config.js
//exports.DATABASE_URL = process.env.DATABASE_URL ||
//                       global.DATABASE_URL ||
//                      'mongodb://localhost/arcade';
//exports.PORT = process.env.PORT || 8080;

app.use(morgan('common'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

app.use(express.static('public'));

app.listen(process.env.PORT || 8080, function(){
  console.log('Running ok')
});




app.get('/scores', (req, res) => {
  Arcade.find((err, scores) => {
    if(err)
      res.send(err)
    res.json(scores)
  })
})

app.post('/scores', (req, res) => {
  console.log("working...");
  console.log(req.body);
  const arcade = new Arcade()
  arcade.name = req.body.name
  arcade.score = req.body.score
  arcade.save((error) => {
    if(error) {
      res.send(error)
    } else {
      res.send('user created')
      //Arcade.find((err, scores) => {
        //if(err)
          //res.send(err)
        //res.json(scores)
      //})
    }
  }
)
});

/*
app.post('/score', (req, res) => {
  console.log("working...");
  const newEntry = new Arcade()

  newEntry.arcade = 20

  newEntry.save((err, entry) => {
    if(err) {
      res.send(err)
    }

    res.json(entry)
  })
})
*/

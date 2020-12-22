const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const serveStatic = require('serve-static');
const cookieParser = require('cookie-parser');
const {BasicStrategy} = require('passport-http');
const appInsights = require('applicationinsights');
appInsights.setup('e5989c82-d45b-4630-8c79-bac0d6665712').start();

//const jsonParser = require('body-parser').json();
const passport = require('passport');

const mongoose = require('mongoose');

const {User} = require('./models/users')

mongoose.connect('mongodb://atugman:unc123@ds157529.mlab.com:57529/arcade')
//mongoose.connect('mongodb://localhost:27017/andrewtugman-arcade')
mongoose.Promise = global.Promise;

const {PORT, DATABASE_URL} = require('./config');

app.use(bodyParser.urlencoded({ extended: true, }));
app.use(bodyParser.json());
//app.use(jsonParser);
app.use(express.static('public'));

const basicStrategy = new BasicStrategy((username, password, callback) => {
  let user;
  User
    .findOne({username: username})
    .exec()
    .then(_user => {
      user = _user;
      if (!user) {
        return callback(null, false, {message: 'Incorrect username'});
      }
      return user.validatePassword(password);
    })
    .then(isValid => {
      if (!isValid) {
        return callback(null, false, {message: 'Incorrect password'});
      }
      else {
        return callback(null, user)
      }
    })
    .catch(err => console.log('Invalid username or password'))
});

app.use(require('express-session')({
  secret: 'something something',
  resave: false,
  saveUninitialized: false
}));

passport.use(basicStrategy);
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log('ID:', id);
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

function isAuthenticated (req, res, next) {
  if (req.user) {
    next()
  } else {
    res.json({redirect: '/login-page.html', message: 'Please log in'})
  }
}

app.get('/', (req, res) => {
    if(err)
      return res.send(err)
    res.json(res)
})

app.get('/scores', (req, res) => {
  User.find({}, null, {sort: '-score'}, function(err, scores) {
    if(err)
      return res.send(err)
    res.json(scores)
  })
})

app.get('/login',
  passport.authenticate('basic'),
  (req, res) => {
    res.json({user: req.user})
  }
);

app.get('/logout', (req, res) => {
   req.session.destroy((err) => {
      if(err) {
        res.send(err)
      }
      res.json({loggedOut: true});
    });
});

app.patch('/users/:score',
  //passport.authenticate('basic', {session: false}),
  (req, res) => {
    User.findByIdAndUpdate(req.user._id, {score: req.params.score, currentScore: 0}, {new: true},
  (err, updatedItem) => {
    if (err) {
      res.json(err)
    }
    res.json(updatedItem)
  })
});

app.patch('/currentScore/:score',
  //passport.authenticate('basic', {session: false}),
  (req, res) => {
    User.findByIdAndUpdate(req.user._id, {currentScore: req.params.score}, {new: true},
  (err, updatedItem) => {
    if (err) {
      res.json(err)
    }
    res.json(updatedItem)
  })
});

app.patch('/eraseCurrentScore',
  //passport.authenticate('basic', {session: false}),
  (req, res) => {
    User.findByIdAndUpdate(req.user._id, {currentScore: 0}, {new: true},
  (err, updatedItem) => {
    if (err) {
      res.json(err)
    }
    res.json(updatedItem)
  })
});

app.get('/loadScore',
  //passport.authenticate('basic', {session: false}),
  (req, res) => {
    User.findById(req.user._id,
      (err, item) => {
        if (err) {
          res.json(err)
        }
        res.json(item)
        })
    })

app.post('/users', (req, res) => {
  console.log('req ', req);
  if (!req.body) {
    return res.json({message: 'No request body'});
  }

  if (!('username' in req.body)) {
    return res.json({message: 'Missing field: username'});
  }

  let {username, password, confirmPassword, firstName, lastName} = req.body;

  if (typeof username !== 'string') {
    return res.json({message: 'Incorrect field type: username'});
  }

  username = username.trim();

  if (username === '') {
    return res.json({message: 'Incorrect field length: username'});
  }

  if (!(password)) {
    return res.json({message: 'Missing field: password'});
  }

  if (confirmPassword !== password) {
    return res.json({message: 'Passwords do not match'})
  }

  if (typeof password !== 'string') {
    return res.json({message: 'Incorrect field type: password'});
  }

  password = password.trim();

  if (password === '') {
    return res.json({message: 'Incorrect field length: password'});
  }

  // check for existing user
  return User
    .find({username})
    .count()
    .exec()
    .then(count => {
      if (count > 0) {
        return res.json({message: "That username is already taken, why don't you try another?"});
      }
      // if no existing user, hash password
      return User.hashPassword(password)
    })
    .then(hash => {
      return User
        .create({
          username: username,
          password: hash,
          firstName: firstName,
          score: 0
        })
    })
    .then(user => {
      return res.json(user.apiRepr());
    })
    .catch(err => {
      res.json({message: 'Internal server error'})
    });
});

app.get('/userProfile', isAuthenticated, (req, res) => {
  res.json({user: req.user.apiRepr()})
})

app.get('/checkScore', (req, res) => {
  res.json({user: req.user})
})

app.listen(process.env.PORT || 8080, function(){
  console.log('Running ok')
});

module.exports = {app};

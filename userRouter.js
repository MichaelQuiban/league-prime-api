const {BasicStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');
const session = require('express-session');


const {User} = require('/models'); //Based off the User Schema created.

const router = express.Router();

router.use(jsonParser);

const strategy = new BasicStrategy(
  (username, password, cb) => {
    User
      .findOne({username})
      .exec()
      .then(user => {
        if (!user) {
          return cb(null, false, {
            message: 'Incorrect username'
          });
        }
        if (user.password !== password) {
          return cb(null, false, 'Incorrect password');
        }
        return cb(null, user);
      })
      .catch(err => cb(err))
});

passport.use(strategy)

//Creation of an account, Validation included on Username, Fields, and Passwords.
router.post('/signup',(req, res) =>  {
    console.log(req.body)
    if(!req.body){
        return res.status(400).json({message: 'No request body located'}); //http://www.restpatterns.org/HTTP_Status_Codes/400_-_Bad_Request
        let message = "Check both fields and try again..";
    }

    if(!('username' in req.body)) {
        return res.status(422).json({message: 'Missing field: username'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
        let message = "Please enter a username..";
    }

    let {username, password} = req.body;

    if(typeof username !== 'string') {
        return res.status(422).json({message: 'Incorrect Username Field: Please enter a string'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
        let message = "Username must consist of letters, or numbers..";
    }

    username = username.trim();

    if (username === '') {
        return res.status(422).json({message: 'Incorrect Username Field: Enter username'})//www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
        let message = "Username must consist of letters or numbers..";
    }

    if (!(password)) {
        return res.status(422).json({message: 'Missing field: Password'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
         let message = "Please enter a password and try again..";
    }

    if (typeof password !== 'string') {
        return res.status(422).json({message: 'Missing Password field: Please enter string or number'}) //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
        let message = "Password must consist of letters or numbers..";
    }

    password = password.trim();

    if (password === '') {
        return res.status(422).json({message: 'Incorrect field length: Password'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
        let message = "Password must be atleast 4 characters...";
    }

    //Check for existing user
    return User
    .find({username})
    .count()
    .exec()
    .then(count => {
        if (count > 0) {
            return Promise.reject({
                name: 'AuthenticationError',
                message: 'username already taken, try another.'
            });
        }
        // If no existing user, hash password
        return User.hashPassword(password)
    })
    .then(hash => {
        return User
        .create({
            username: username,
            password: hash
        })
    })
    .then(user => {
        return res.status(200).json(user); //http://www.restpatterns.org/HTTP_Status_Codes/201_-_Created
    })
    .catch(err => {
        if (err.name === 'AuthenticationError') {
            return res.status(422).json({message: err.message}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity

        }
        console.log(err);
        res.status(500).json({message: 'Internal Server error'}) //http://www.restpatterns.org/HTTP_Status_Codes/500_-_Internal_Server_Error
        let message = "There is currently a problem with the server..Please try again in 5 minutes."
        $("#response").append()
    });
});

    router.get('/signup', (req, res) => {
        return User
        .find()
        .exec()
        .then(users => res.json(users))
        .catch(err => console.log(err) && res.status(500).json({message: 'Internal Server error'}));
    })

const basicStrategy = new BasicStrategy(function(username, password, callback) {
    let user;
    User
    .findOne({username: username})
    .exec()
    .then(_user => {
        user = _user;
        if (!user) {
            return callback(null, false, {message: 'Incorrect username'});
            let message = "Incorrect Username, please try again"
        }
        return user.validatePassword(password);
    })
    .then(isValid => {
        if(!isValid) {
            return callback(null, false, {message: 'Incorrect password'});
            let message = "Incorrect Password, please try again"
            $("#response").append()
        }
        else {
            return callback(null, user)
        }
    });
});

router.post('/ranking', (req, res) => {
   if(!loggedIn) {
        return res.status(401).send();
   }

   return res.status(200).send("Welcome")
    /* let update = {}
    update.ranking = req.body.ranking;
    update.elo = req.body.elo;
    update.role = req.body.role;
    update.progress = req.body.progress;
    User
    .findOneAndUpdate({username: req.body.username}, update)
    .exec()
    .then(user => res.status(204).end())
    .catch(err => res.status(500).json({message: "Internal Server Error"}));
    */
}) 

router.get('/userRouter')
passport.use(basicStrategy);
router.use(passport.initialize());

module.exports = router;
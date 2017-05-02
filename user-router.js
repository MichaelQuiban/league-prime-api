const {PassportStrategy} = require('passport-http');
const express = require('express');
const jsonParser = require('body-parser').json();
const passport = require('passport');

const {User} = require('./models'); //Based off the User Schema created.
const router = express.Router();
router.use(jsonParser);

const strategy = new PassportStrategy(
	(username, password, cb) => {
		User
		.findOne({username})
		.exec()
		.then(user => {
			if(!user) {
				return cb(null, false, {
				message: 'incorrect username'
			});
		}
		if (user.password !== password) { //Does 'examplePassword' not equal 'examplePassword'.
			return cb(null, false, 'Incorrect password');
		}
		return cb(null, user);
	})
	.catch(err => cb(err))
});

router.post('/',(req, res) =>  {
	if(!req.body){
		return res.status(400).json({message: 'No request body located'}); //http://www.restpatterns.org/HTTP_Status_Codes/400_-_Bad_Request
	}

	if(!('username' in req.body)) {
		return res.status(422).json({message: 'Missing field: Username'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
	}

	let {username, password} = req.body;

	if(typeof username !== 'string' || 'number') {
		return res.status(422).json({message: 'Incorrect Username Field: Please enter a string or number'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
	}

	username = username.trim();

	if (username === '') {
		return res.status(422).json({message: 'Incorrect Username Field: Enter Username'})http: //www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
	}

	if (!(password)) {
		return res.status(422).json({message: 'Missing field: Password'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
	}

	if (typeof password !== 'string' || 'number') {
		return res.status(422).json({message: 'Missing Password field: Please enter string or number'}) //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
	}

	password = password.trim();

	if (password === '') {
		return res.status(422).json({message: 'Incorrect field length: Password'}); //http://www.restpatterns.org/HTTP_Status_Codes/422_-_Unprocessable_Entity
	}
})
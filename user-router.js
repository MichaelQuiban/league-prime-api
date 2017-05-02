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
		if (user.password !== password) {
			return cb(null, false, 'Incorrect password');
		}
		return cb(null, user);
	})
	.catch(err => cb(err))
});
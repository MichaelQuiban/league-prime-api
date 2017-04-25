const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User information
const loginSchema = new Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true},
})

const playerSchema = new Schema({
	summoner: { type: String, required: true,}
})

const Login = mongoose.model('Login', loginSchema);
const Player = mongoose.model('Player', playerSchema);

//Make this available to our users in the League-Prime-Api
module.exports = Login;
module.exports = Player;
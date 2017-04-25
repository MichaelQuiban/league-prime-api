const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//User information
const loginSchema = new Schema({
	username: { type: String, required: true, unique: true},
	password: { type: String, required: true}
})

//Champion Tracking Data
const championSchema = new Schema({
	name: {type: String, required: true, unique: true},
	build: {type: String},
	lane: {type: String, required: true},
	wins: {type: String, required: true},
	loss: {type: String, required: true}
	ranked: {type: Boolean},
	damage: {type: String},
	kills: {type: String},
	deaths: {type: String}
})

//Create a model using the schema data.
const Login = mongoose.model('Login', loginSchema);
const Champion = mongoose.model('Champion', championSchema;

//Make this available to our users in the League-Prime-Api
module.exports = Login;
module.exports = Player;